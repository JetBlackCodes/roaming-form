import React, { Component } from "react";
import {
  withStyles,
  Card,
  Button,
  Grid,
  Snackbar,
  IconButton,
  Slide
} from "@material-ui/core";
import { Close, ErrorOutline, Done } from '@material-ui/icons';
import { TextField } from "final-form-material-ui";
import { Form, Field } from "react-final-form";
import { purple } from '@material-ui/core/colors';
import arrayMutators from 'final-form-arrays'

import Auth from './auth'
import FormOperators from './steps/form-operators'
import { validate } from './validate/index'

import axios from "axios";
axios.defaults.withCredentials = true;

class WithOperators extends Component {
  state = {
    open: false,
    transition: 'TransitionUp',
    textSnackbar: '',
    disabled: true,
    error: false,
    activeStep: -1,
    nameKontr: undefined,
    senderList: '',
    receiverList: ''
  };


  onSubmit = rffJSON => {
    const { activeStep, senderList, receiverList } = this.state

    if (activeStep === -1) {
      this.setState({ disabled: true })

      var dataForm = new FormData();
      dataForm.set('login', rffJSON.loginAuth );
      dataForm.set('password', rffJSON.passAuth );

      axios({
        method: 'post',
        url: `http://roaming.api.staging.keydisk.ru/auth`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
         },
        data: dataForm,
      })
      .then((res, errors) => {
        let text = res.data.status === 0 ? 'Успешная авторизация' : res.data.text
        let error = res.data.status === 0 ? false : true

        this.setState({
          disabled: false,
          open: true,
          textSnackbar: text,
          error: error,
          activeStep: error === true ? -1 : 0,
          nameKontr: res.data.status === 0 ? res.data.text : undefined
        })
      })
      .catch(errors => {
        let text = 'Сервер временно не отвечает'
        let error = true

        this.setState({
          disabled: false,
          open: true,
          textSnackbar: text,
          error: error,
        })
      })
    } else if (activeStep === 2) {
      // const errorTemplate = {
      //   inn: 'ИНН',
      //   kpp: 'КПП',
      //   name: 'Название организации',
      //   lastname: 'Имя',
      //   firstname: 'Фамилия',
      //   patronymic: 'Отчество',
      //   id: 'Идентификатор',
      //   number: 'Номер заявки',
      // }
      // let errors = validate(this.formApi.getState().values)
      // let lastError = {id: '', text: '', step: ''}
      // Object.keys(errors).forEach(item => {
      //   errors[item].map((itemIndex, index) => {
      //     Object.keys(errors[item][index]).forEach(key => {
      //       lastError = {id: key, text: itemIndex[key], step: item === 'receiver' ? 2 : 1}
      //     })
      //   })
      // })
      // if (lastError.id)
      //   this.setState({ open: true, textSnackbar: `Допущена ошибка на ${lastError.step} шаге. ${errorTemplate[lastError.id]}: ${lastError.text}`, error: true })
      // console.log(lastError)

      var dataForm = new FormData();
      let check = {s: 0, r: 0}
      let checkNum = 0
      let data = {}

      if (receiverList)
        dataForm.set('receiver_list', receiverList )
      else {
        data.receiver = rffJSON.receiver
        check.r = 1
      }
      if (senderList)
        dataForm.set('sender_list', senderList )
      else {
        data.sender = rffJSON.sender
        check.s = 1
      }

      if (check.s === 0 && check.r === 0)
        checkNum = 1
      else {
        dataForm.set('data', JSON.stringify(data) );
      }

      axios({
        method: 'post',
        url: `http://roaming.api.staging.keydisk.ru/operator`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
         },
        data: checkNum === 1 ? undefined : dataForm,
      })
      .then(res => {
        const errorTemplate = {
           inn: 'ИНН',
           kpp: 'КПП',
           name: 'Название организации',
           lastname: 'Имя',
           firstname: 'Фамилия',
           patronymic: 'Отчество',
           id: 'Идентификатор',
           number: 'Номер заявки',
        }
        let lastError = {id: '', text: '', step: ''}
        Object.keys(res).forEach(item => {
          if ((typeof res[item]) === 'object') {
           res[item].map((itemIndex, index) => {
             Object.keys(res[item][index]).forEach(key => {
               lastError = {id: key, text: itemIndex[key], step: item === 'receiver' ? 2 : 1}
             })
           })
          }
        })
        if (lastError.id)
          this.setState({ open: true, textSnackbar: `Допущена ошибка на ${lastError.step} шаге. ${errorTemplate[lastError.id]}: ${lastError.text}`, error: true })
        // console.log(lastError)
        console.log(res)
      })
    }
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  componentDidMount() {
    axios({
      method: 'post',
      url: `http://roaming.api.staging.keydisk.ru/operator`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
       },
      data: {}
    })
    .then(res => {
      this.formApi.change('sender', [{ inn: '', kpp: '', name: '', id: '', number: '', lastname: '', firstname: '' }]);
      this.formApi.change('receiver', [{ inn: '', kpp: '', name: '', id: '', lastname: '', firstname: '' }]);
      this.setState({
         activeStep: res.data.status === 401 ? -1 : 0,
         disabled: false
      })
    });
  }

  handleBack = () => {
    const { activeStep } = this.state
    this.setState({ activeStep: activeStep - 1 })
  }

  handleNext = () => {
    const { activeStep } = this.state
    this.setState({ activeStep: activeStep + 1 })
  }

  handleStep = (index) => () => {
    this.setState({ activeStep: index })
  }

  bindFormApi = formApi => {
    this.formApi = formApi;
    const unsubscribe = () => {};
    return unsubscribe;
  };

  loadReceiverFile = (event) => {
    const true_type = [ 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel' ]
    const file = event.target.files[0]
    if (file) {
      if (file.type === true_type[0] || file.type === true_type[1]) {
        this.setState({ receiverList: file })
        this.formApi.change('receiver', [{}])
      } else {
        this.setState({ open: true, textSnackbar: 'Файл должен быть .xls или .xlsx', error: true })
      }
    }
  }

  handleDeleteReceiverList = () => {
    this.setState({ receiverList: '' })
  }

  loadSenderFile = (event) => {
    const true_type = [ 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel' ]
    const file = event.target.files[0]
    if (file) {
      if (file.type === true_type[0] || file.type === true_type[1]) {
        this.setState({ senderList: file })
        this.formApi.change('sender', [{}])
      } else {
        this.setState({ open: true, textSnackbar: 'Файл должен быть .xls или .xlsx', error: true })
      }
    }
  }

  handleDeleteSenderList = () => {
    this.setState({ senderList: '' })
  }

  render() {
    const { classes } = this.props
    const { open, transition, textSnackbar, disabled, error, activeStep, nameKontr, receiverList, senderList } = this.state
    const classesSnackBar = error ? { classes: { root: classes.snackbarError } } : { classes: { root: classes.snackbarSuccess } }

    {/* validate={validate} */}
    return (
      <>
        <Form
          onSubmit={this.onSubmit}
          mutators={{
            ...arrayMutators
          }}
          validate={validate}
          decorators={[this.bindFormApi]}
          initialValues={{
            sender: [{}],
            receiver: [{}]
          }}
          render={({
            handleSubmit,
            reset,
            submitting,
            pristine,
            values,
            form,
            errors,
            touched
          }) => {
            const { change, submit } = form

            return (
              <form onSubmit={handleSubmit}>
                {componentWithStep({
                  activeStep,
                  nameKontr,
                  values,
                  change,
                  submit,
                  receiverList,
                  senderList,
                  handleBack: this.handleBack,
                  handleNext: this.handleNext,
                  handleStep: this.handleStep,
                  loadSenderFile: this.loadSenderFile,
                  loadReceiverFile: this.loadReceiverFile,
                  handleDeleteSenderList: this.handleDeleteSenderList,
                  handleDeleteReceiverList: this.handleDeleteReceiverList,
                })}

                <Snackbar
                  open={open}
                  onClose={this.handleClose}
                  TransitionComponent={TransitionUp}
                  ContentProps={{
                    'aria-describedby': 'message-id',
                  }}
                  message={
                    <div className={classes.messageSnackbar}>
                      <ErrorOutline size='small' />
                      {textSnackbar}
                    </div>
                  }
                  ContentProps={classesSnackBar}
                  action={
                    <IconButton
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      className={classes.close}
                      onClick={this.handleClose}
                    >
                      <Close />
                    </IconButton>
                  }
                />
              </form>
            )
          }}
        />
      </>
    )
  }
}

const componentWithStep = props => {
  const {
    activeStep,
    nameKontr,
    values,
    change,
    handleBack,
    submit,
    handleNext,
    push,
    handleStep,
    loadReceiverFile,
    receiverList,
    senderList,
    handleDeleteReceiverList,
    loadSenderFile,
    handleDeleteSenderList
  } = props

  if (activeStep === -1)
    return (
      <Auth
      />
    )
  else
    return (
      <FormOperators
        activeStep={activeStep}
        nameKontr={nameKontr}
        values={values}
        changeFinalForm={change}
        submitFinalForm={submit}
        handleBack={handleBack}
        handleNext={handleNext}
        handleStep={handleStep}
        loadReceiverFile={loadReceiverFile}
        receiverList={receiverList}
        handleDeleteReceiverList={handleDeleteReceiverList}
        loadSenderFile={loadSenderFile}
        handleDeleteSenderList={handleDeleteSenderList}
        senderList={senderList}
      />
    )
}

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const styles = theme => ({
  card: {
    flexDirection: 'column',
    width: '300px',
    padding: '20px'
  },
  button: {
    marginTop: '50px',
    width: '100%'
  },
  snackbarError: {
    background: '#fff',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#f00',
    color: '#f00',
  },
  snackbarSuccess: {
    background: '#fff',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#27a327',
    color: '#27a327',
  },
  messageSnackbar: {
    display: 'flex',
    justifyContent: 'row',
    fontSize: '13pt'
  }
});

export default withStyles(styles)(WithOperators);
