import React, {Component} from "react";
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
import { DEFAULT_OPERATOR, MY_ORGANISATION_DEFAULT_DATA } from "../constants/customer-form"

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

// const steps = [
//   "Данные вашей организации",
//   "Данные операторов",
//   "Проверка введенных данных"
// ];
function getSteps() {
  return ["Данные вашей организации", "Данные операторов", "Проверка введенных данных"]
}


const getStepContent = ({ updateData, step, operators, dataMyOrganisation }) => {
  switch (step) {
    case 0:
      return <FirstStep dataMyOrganisation={dataMyOrganisation} />
    case 1:
      return <SecondStep updateData={updateData} />
    case 2:
      return <Summary operators={operators} />
    default:
      throw new Error("Unknown step")
  }
}

class Checkout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeStep: 0,
      operators: [{ ...DEFAULT_OPERATOR }],
      dataMyOrganisation: [{...MY_ORGANISATION_DEFAULT_DATA}]
      
      // operators: [
      //   {
      //     name: "",
      //     inn: "",
      //     kpp: "",
      //     oper: ""
      //   }
      // ],
     
      // dataMyOrganisation: {
      //   inn: '',
      //   kpp: '',
      //   name: '',
      //   guid: '',
      //   email: '',
      //   dop_sog: ''
      // }
    }
  }

  updateData = value => {
    this.setState({ operators: value })
  }

  handleNext = () => {
    this.handleSubmit(this.form)
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }))
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }))
  }

  handleReset = () => {
    this.setState({
      activeStep: 0
    })
  }

  handleSubmit = (event) => {
    this.setState({
      dataMyOrganisation: {
        inn: event.inn.value,
        kpp: event.kpp.value,
        name: event.name.value,
        guid: this.state.activeStep === 0 ? event.guid.value : '',
        email: this.state.activeStep === 0 ? event.email.value : '',
      }
    })
  }
  
  render() {
    const { classes, updateData } = this.props
    const { activeStep, operators, dataMyOrganisation } = this.state

    const steps = getSteps()

    return (
      <form id="roaming-form" ref={(form) => { this.form = form }} >
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
                    Ваш запрос на установку связи направлен оператору абонента.
                  </Typography>
                  <Typography variant="subtitle1">
                    Срок ответа на заявку от 2 до 6 рабочих дней. По итогу
                    настройки на указанный вами e-mail придет извещение.
                  </Typography>
                </>
              )
              : // не ласт этап
              (
                <>
                  {getStepContent({
                    updateData: updateData,
                    step: activeStep,
                    operators,
                    dataMyOrganisation
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
                </>
              )}

            </>
          </Paper>
        </main>
      </form>
    )
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Checkout)
