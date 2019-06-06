import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography
} from "@material-ui/core";
import FirstStep from "../components/first-step";
import SecondStep from "../components/second-step";
import Summary from "../components/summary";
import {
  DEFAULT_OPERATOR,
  MY_ORGANISATION_DEFAULT_DATA
} from "../constants/customer-form";

import { validate } from "../utils/validate"
import { Form } from "react-final-form";

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
        <FirstStep dataMyOrganisation={dataMyOrganisation} handleChangeRadio={handleChangeRadio} disableKpp={disableKpp}/>
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
    activeStep: 1,
    operators: [{ ...DEFAULT_OPERATOR }],
    dataMyOrganisation: { ...MY_ORGANISATION_DEFAULT_DATA },
    disableKpp: false,
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
    const {value} = event.target
    let dataMyOrganisation = this.state.dataMyOrganisation
    dataMyOrganisation['radioValue'] = value
    this.setState({
      dataMyOrganisation,
      disableKpp: value === 'UL' ? false : true
    })

  }

  onSubmit = ffJson => { // final form json
    const { activeStep, dataMyOrganisation, operators } = this.state
    let data = activeStep === 0 ? ffJson : dataMyOrganisation;
    data.radioValue = dataMyOrganisation.radioValue
    let dataOperators = activeStep === 1 ? dataSort(ffJson) : operators;
    this.setState({
      dataMyOrganisation: data,
      operators: dataOperators,
      activeStep: activeStep + 1
    })
    
  }


  render() {
    const { classes, updateData } = this.props;
    const { activeStep, operators, dataMyOrganisation, error, disableKpp } = this.state;

    const steps = getSteps();

    return (
      <Form
        onSubmit={this.onSubmit}
        validate={validate(this.state.dataMyOrganisation.radioValue)}
        render={({ handleSubmit, reset, submitting, pristine, values}) => {
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
                        <div className={classes.buttons}>
                          {activeStep !== 0 && (
                            <Button
                              onClick={this.handleBack}
                              className={classes.button}
                            >
                              Назад
                            </Button>
                          )}

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
                        </div>
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
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

Checkout.propTypes = {
  classes: PropTypes.object.isRequired
};

const dataSort = (obj) => {
  let newArr = []

  Object.keys(obj).forEach(function(key) { // пройдемся по объекту
    let value = this[key]; // key - имя артрибута, value - значение артрибута

    let arrIndex = parseInt(key.replace(/\D+/g,"")); // получаем  номер контрагента по списку
    if (!newArr[arrIndex])
      newArr[arrIndex] = {} // если еще не объявлен, объявляем как объект

    let arrKey = key.split("Kontr")[0] // имя артрибута
    newArr[arrIndex][arrKey] = value // заносим данные
  }, obj);

  return newArr // возвращаем переработанный массив
}

export default withStyles(styles)(Checkout);
