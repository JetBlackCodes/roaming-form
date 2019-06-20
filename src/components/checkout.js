import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Snackbar,
  SnackbarContent,
  IconButton,
  Avatar,
  Chip,
  Grid
} from "@material-ui/core";
import { Error, Close } from "@material-ui/icons";
import FirstStep from "components/steps/first-step";
import SecondStep from "components/steps/second-step";
import Summary from "components/steps/summary";
import CompleteStep from "components/steps/complete-step";
import {
  DEFAULT_OPERATOR,
  MY_ORGANISATION_DEFAULT_DATA
} from "../constants/customer-form";

import { validate } from "../utils/validate";
import { Form } from "react-final-form";

import axios from "axios";

function getSteps() {
  return [
    "Данные вашей организации",
    "Данные контрагентов",
    "Проверка введенных данных"
  ];
}

const getStepContent = ({
  updateData,
  step,
  operators,
  dataMyOrganisation,
  error,
  handleChangeRadio,
  disableKpp,
  upload,
  dop_sog
}) => {
  switch (step) {
    case 0:
      return (
        <FirstStep
          dataMyOrganisation={dataMyOrganisation}
          handleChangeRadio={handleChangeRadio}
          disableKpp={disableKpp}
          dop_sog={dop_sog}
          upload={upload}
        />
      );
    case 1:
      return <SecondStep operators={operators} />;
    case 2:
      return (
        <Summary
          operators={operators}
          dataMyOrganisation={dataMyOrganisation}
        />
      );
    default:
      throw new Error("Unknown step");
  }
};

class Checkout extends Component {
  state = {
    activeStep: 0,    
    operators: [{ ...DEFAULT_OPERATOR }],
    dataMyOrganisation: { ...MY_ORGANISATION_DEFAULT_DATA },
    disableKpp: false,
    dop_sog: {
      name: "Файл не выбран",
      file: ""
    },
    errorText: "",
    open: false
  };

  upload = file => {
    this.setState({
      dop_sog: {
        name: file.target.files[0].name,
        file: file.target.files[0]
      }
    });
  };

  updateData = value => {
    this.setState({ operators: value });
  };

  handleClose = event => {
    this.setState({ open: false });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  handleChangeRadio = event => {
    const { value } = event.target;
    let dataMyOrganisation = this.state.dataMyOrganisation;
    dataMyOrganisation["radioValue"] = value;
    this.setState({
      dataMyOrganisation,
      disableKpp: value === "UL" ? false : true
    });
  };

  onSubmit = ffJson => {
    // final form json
    const { activeStep, dataMyOrganisation, operators, dop_sog } = this.state;
    let dataMy = activeStep === 0 ? ffJson : dataMyOrganisation;
    dataMy.radioValue = dataMyOrganisation.radioValue;
    this.setState({
      dataMyOrganisation: dataMy,
      operators: activeStep === 1 ? dataSort(ffJson) : operators,
      activeStep: activeStep < 2 ? activeStep + 1 : activeStep
    });
    if (activeStep === 2) {
      let data = {
        sender: [dataMyOrganisation],
        receiver: operators
      };

      axios({
        method: "post",
        url: `http://roaming.api.staging.keydisk.ru/abonent`,
        headers: {
          Accept: "application/json",
          "Content-Type":
            "multipart/form-data; boundary=---------------------------5273914420626"
        },
        data: `-----------------------------18467633426500\r\nContent-Disposition: form-data; name="agreement"\r\n\r\n${JSON.stringify(
          dop_sog
        )}
-----------------------------5273914420626\r\nContent-Disposition: form-data; name="data"\r\n\r\n${JSON.stringify(
          data
        )}\r\n-----------------------------5273914420626--`
      }).then(res => {
        // console.log(res);
        if (res.data.status === 0)
          this.setState({ activeStep: activeStep + 1 });
        else this.setState({ errorText: res.data.code, open: true });
      });
    }
  };

  render() {
    const { classes, updateData } = this.props;
    const {
      activeStep,
      operators,
      dataMyOrganisation,
      errorText,
      disableKpp,
      dop_sog,
      open
    } = this.state;

    const steps = getSteps();

    return (
      <Form
        onSubmit={this.onSubmit}
        validate={validate(this.state.dataMyOrganisation.radioValue)}
        render={({ handleSubmit, reset, submitting, pristine, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <main className={classes.layout}>
                <Paper className={classes.paper}>
                  <Typography component="h1" variant="h4" align="center">
                    Заявление на подключение роуминга между контрагентами
                  </Typography>

                  <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map(label => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  <>
                    {activeStep === steps.length ? (
                      <CompleteStep />
                    ) : (
                      <>
                        {getStepContent({
                          updateData: updateData,
                          step: activeStep,
                          operators,
                          dataMyOrganisation,
                          handleChangeRadio: this.handleChangeRadio,
                          disableKpp,
                          upload: this.upload,
                          dop_sog
                        })}

                        <Grid
                          container
                          direction="row"
                          justify="flex-end"
                          alignItems="center"
                        >
                          <Grid item>
                            {activeStep !== 0 && (
                              <Button
                                onClick={this.handleBack}
                                className={classes.button}
                              >
                                Назад
                              </Button>
                            )}
                          </Grid>
                          <Grid item>
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.button}
                              type="submit"
                              disabled={submitting}
                            >
                              {activeStep === steps.length - 1
                                ? "Оправить"
                                : "Далее"}
                            </Button>
                          </Grid>
                        </Grid>

                        <Snackbar
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                          }}
                          open={open}
                          autoHideDuration={6000}
                          onClose={this.handleClose}
                        >
                          <SnackbarContent
                            aria-describedby="client-snackbar"
                            className={classes.snack}
                            message={
                              <span id="client-snackbar">
                                <Chip
                                  avatar={
                                    <Avatar>
                                      <Error />
                                    </Avatar>
                                  }
                                  label={errorText}
                                  className={classes.snack}
                                  color="secondary"
                                />
                              </span>
                            }
                            action={[
                              <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={this.handleClose}
                              >
                                <Close />
                              </IconButton>
                            ]}
                          />
                        </Snackbar>
                      </>
                    )}
                  </>
                </Paper>
              </main>
            </form>
          );
        }}
      />
    );
  }
}

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  },
  snack: {
    background: "#cc3300",
    color: "#fff",
    fontSize: "12pt"
  }
});

Checkout.propTypes = {
  classes: PropTypes.object.isRequired
};

const dataSort = obj => {
  let newArr = [];

  Object.keys(obj).forEach(function(key) {
    // пройдемся по объекту
    let value = this[key]; // key - имя артрибута, value - значение артрибута

    let arrIndex = parseInt(key.replace(/\D+/g, "")); // получаем  номер контрагента по списку

    if (arrIndex >= 0) {
      if (!newArr[arrIndex]) newArr[arrIndex] = {}; // если еще не объявлен, объявляем как объект

      let arrKey = key.split("Kontr")[0]; // имя артрибута
      newArr[arrIndex][arrKey] = value; // заносим данные
    }
  }, obj);

  return newArr; // возвращаем переработанный массив
};

export default withStyles(styles)(Checkout);
