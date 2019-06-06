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
  Grid
} from "@material-ui/core";
import FirstStep from "components/first-step";
import SecondStep from "components/second-step";
import Summary from "components/summary";
import {
  DEFAULT_OPERATOR,
  MY_ORGANISATION_DEFAULT_DATA,
  MAX_OPERATORS_COUNT
} from "constants/customer-form";

import { validate } from "./validate";
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
  disableKpp
}) => {
  switch (step) {
    case 0:
      return (
        <FirstStep
          dataMyOrganisation={dataMyOrganisation}
          handleChangeRadio={handleChangeRadio}
          disableKpp={disableKpp}
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
    error: {}
  };

  updateData = value => {
    this.setState({ operators: value });
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
    let obj = this.state.dataMyOrganisation;
    obj.radioValue = value;
    this.setState({
      dataMyOrganisation: obj,
      disableKpp: value === "UL" ? false : true
    });
  };

  onSubmit = event => {
    if (this.state.activeStep === 0) {
      let dataMyOrganisation = event;
      this.setState(state => ({
        dataMyOrganisation,
        activeStep: state.activeStep + 1
      }));
    } else {
      console.log(this.state);
      this.setState(state => ({
        activeStep: state.activeStep + 1
      }));
    }
  };

  AddNewOperator = () => {
    const { operators } = this.state;
    if (operators.length <= MAX_OPERATORS_COUNT) {
      operators.push({ ...DEFAULT_OPERATOR });
      this.setState({ operators });
    } else alert("Вы можете добавить только 100 операторов");
  };

  sendDataOnServer = event => {
    const { inn, kpp } = this.state.dataMyOrganisation;
    const data = JSON.stringify({ inn: inn, kpp: kpp });
    axios
      .post("/sender", { sender: data })
      .then(response => {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const { classes, updateData } = this.props;
    const {
      activeStep,
      operators,
      dataMyOrganisation,
      error,
      disableKpp
    } = this.state;

    const steps = getSteps();

    return (
      <Form
        onSubmit={this.onSubmit}
        id="roaming-form"
        ref={form => {
          this.form = form;
        }}
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
                    {activeStep === steps.length ? ( // ласт этап
                      <>
                        <Typography variant="h8">Заявка №04029</Typography>
                        <Typography variant="h5" gutterBottom>
                          Ваш запрос на установку связи направлен оператору
                          абонента.
                        </Typography>
                        <Typography variant="subtitle1">
                          Срок ответа на заявку от 2 до 6 рабочих дней. По итогу
                          настройки на указанный вами e-mail придет извещение.
                        </Typography>
                      </>
                    ) : (
                      // не ласт этап
                      <>
                        {getStepContent({
                          updateData: updateData,
                          step: activeStep,
                          operators,
                          dataMyOrganisation,
                          handleChangeRadio: this.handleChangeRadio,
                          disableKpp
                        })}

                        <Grid contaner className={classes.buttons}>
                          <Grid xs={12} sm={12}>
                            {activeStep === 1 && (
                              <Button
                                onClick={this.AddNewOperator}
                                variant="contained"
                                color="primary"
                              >
                                Добавить оператора
                              </Button>
                            )}
                          </Grid>

                          <Grid container className={classes.mainButtons} xs={12} sm={12}>
                            {activeStep !== 0 && (
                              <Button
                                onClick={this.handleBack}
                              >
                                Назад
                              </Button>
                            )}
                          
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                              disabled={submitting}
                            >
                              {activeStep === steps.length - 1
                                ? "Оправить"
                                : "Далее"}
                            </Button>
                          </Grid>
                        </Grid>
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
  buttons: {
    display: "flex",
    align: "center",
    height: 37,
    marginTop: theme.spacing(1)    
  },
  mainButtons:{
    justifyContent: "flex-end"
  },
});

Checkout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Checkout);
