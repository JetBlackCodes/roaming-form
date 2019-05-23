import React from "react";
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
import FirstForm from "./first-step";
import SecondForm from "./second-step";
import Summary from "./summary";

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

const steps = [
  "Оператор ЗАО «Калуга Астрал»",
  "Другой оператор",
  "Проверка введенных данных"
];

const getStepContent = ({ updateData, step, operators }) => {
  switch (step) {
    case 0:
      return <FirstForm />;
    case 1:
      return <SecondForm updateData={updateData} />;
    case 2:
      return <Summary operators={operators} />;
    default:
      throw new Error("Unknown step");
  }
};

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,

      operators: [
        {
          name: "",
          inn: "",
          kpp: "",
          oper: ""
        }
      ]
    };
  }

  updateData = value => {
    this.setState({ operators: value });
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
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

  render() {
    const { classes, updateData } = this.props;
    const { activeStep, operators } = this.state;

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Форма приема заявок от клиентов
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h8">Заявка №04029</Typography>
                  <Typography variant="h5" gutterBottom>
                    Ваш запрос на установку связи направлен оператору абонента.
                  </Typography>
                  <Typography variant="subtitle1">
                    Срок ответа на заявку от 2 до 6 рабочих дней. По итогу
                    настройки на указанный вами e-mail придет извещение.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent({
                    updateData: updateData,
                    step: activeStep,
                    operators
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
                      {activeStep === steps.length - 1 ? "Оправить" : "Далее"}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Checkout);
