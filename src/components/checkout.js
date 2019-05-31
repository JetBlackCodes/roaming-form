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
import FirstStep from "./first-step";
import SecondStep from "./second-step";
import Summary from "./summary";
import {
  DEFAULT_OPERATOR,
  MY_ORGANISATION_DEFAULT_DATA
} from "../constants/customer-form";

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
  error
}) => {
  switch (step) {
    case 0:
      return (
        <FirstStep dataMyOrganisation={dataMyOrganisation} error={error} />
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

    error: {}
  };

  updateData = value => {
    this.setState({ operators: value });
  };

  handleNext = async () => {
    await this.checkData(this.form);

    this.handleSubmit(this.form);
    console.log(this.state);
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

  checkData = async event => {
    if (this.state.activeStep === 0) {
      let error = this.state.error;
      let check = 0;
      if (event.radioValue.value === "UL" && event.inn.value.length !== 10) {
        error["errorInn"] = true;
        check = 1;
      }
      if (
        event.radioValue.value === "UL" &&
        (event.kpp.value.length !== 9 || event.kpp.value.length !== 0)
      ) {
        error["errorKpp"] = true;
        check = 1;
      }
      if (event.name.value === "") {
        error["errorName"] = true;
        check = 1;
      }
      if (event.guid.value === "" || event.guid.value.length !== 35) {
        error["errorGuid"] = true;
        check = 1;
      }

      this.setState({
        error
      });

      return check;
    } else {
      return 0;
    }
  };

  handleSubmit = event => {
    const step = this.state.activeStep;
    let temp_data = {}; // пустой объект
    let temp_arr = []; // пустой массив
    if (step === 0) {
      // 1 этап

      temp_data = {
        // заносим данные
        inn: event.inn.value,
        kpp: event.kpp.value,
        name: event.name.value,
        guid: event.guid.value,
        email: event.email.value
      };
    } else if (step === 1) {
      // данные со 2 этапа

      if (!event.inn.length) {
        // один контрагент
        temp_arr = [
          {
            inn: event.inn.value,
            kpp: event.kpp.value,
            name: event.name.value,
            oper: event.oper.value
          }
        ];
      } else {
        // несколько контрагентов
        event.inn.forEach(function(elem, index) {
          // перебор по полученному массиву
          temp_arr[index] = {
            inn: event.inn[index].value,
            kpp: event.kpp[index].value,
            name: event.name[index].value,
            oper: event.oper[index].value
          };
        });
      }
    } else {
      // проверка данных 3 этапа
      console.log(event);
    }
    //console.log(temp_data)
    this.setState({
      dataMyOrganisation:
        step === 0 ? temp_data : this.state.dataMyOrganisation, // если этап 1 то записать данные с временного объекта иначе оставить данные state
      operators: step === 1 ? temp_arr : this.state.operators
    });
  };

  render() {
    const { classes, updateData } = this.props;
    const { activeStep, operators, dataMyOrganisation, error } = this.state;

    const steps = getSteps();

    return (
      <Form
        onSubmit={this.handleSubmit}
        id="roaming-form"
        ref={form => {
          this.form = form;
        }}
        render={({handleSumbit, form}) => {
          return (
            <form onSumbmit={handleSumbit}>
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
                          error
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
                            onClick={this.handleNext}
                            className={classes.button}
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

export default withStyles(styles)(Checkout);
