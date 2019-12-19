import React, { Component } from "react";
import {
  withStyles,
  Snackbar,
  IconButton,
  Slide
} from "@material-ui/core";
import { Close, ErrorOutline } from '@material-ui/icons';
import { Form } from "react-final-form";
import arrayMutators from 'final-form-arrays'
import Auth from './auth'
import FormOperators from './steps/form-operators'
import { validate } from './validate/index'

import { FIRST_STATE_OPERATOR, SECOND_STATE_OPERATOR } from '../../constants/customer-form'

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
    receiverList: '',
    request_id: ''
  };

  handleClose = () => {
    this.setState({ open: false })
  }

  async componentDidMount() {
    const { data, status } = await axios({
      method: 'post',
      url: `https://roaming.edo.keydisk.ru`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
       },
      data: {}
    })
    if (status === 200) {
      if (data.status !== 401) {
        this.formApi.change('sender', [{ ...FIRST_STATE_OPERATOR }]);
        this.formApi.change('receiver', [{ ...SECOND_STATE_OPERATOR }]);
      }
      this.setState({ activeStep: data.status === 401 ? -1 : 0,  disabled: false })
    } else {
      this.setState({ open: true, textSnackbar: `Сервер временно не доступен`, error: true})
    }
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

  authOperator = ffvalue => {
    this.setState({ disabled: true })

    var dataForm = new FormData();
    dataForm.set('login', ffvalue.loginAuth );
    dataForm.set('password', ffvalue.passAuth );

    axios({
      method: 'post',
      url: `https://roaming.edo.keydisk.ru`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
       },
      data: dataForm,
    })
    .then((res) => {
      let text = res.data.status === 0 ? 'Успешная авторизация' : res.data.text
      let error = res.data.status === 0 ? false : true

      if (res.data.status === 0) {
        this.formApi.change('sender', [{ ...FIRST_STATE_OPERATOR }]);
        this.formApi.change('receiver', [{ ...SECOND_STATE_OPERATOR }]);
      }

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
  }

  sendDataRFFOperator = ffvalue => {
    const { senderList, receiverList } = this.state

    var dataForm = new FormData();
    let data = {};

    if (receiverList) dataForm.set('receiver_list', receiverList ); else data.receiver = ffvalue.receiver

    if (senderList) dataForm.set('sender_list', senderList ); else data.sender = ffvalue.sender

    data.request_id = ffvalue.request_id;

    if (!senderList || !receiverList)
      dataForm.set('data', JSON.stringify(data))

    axios({
      method: 'post',
      url: `https://roaming.edo.keydisk.ru`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
       },
      data: dataForm,
    })
    .then(res => {
      const { status, sender, receiver } = res.data

      if (status === 0 || res.data.text === 'Ваша заявка принята в работу') this.setState({ activeStep: 3 })

      else {
        if (res.data.text) {
          this.setState({ open: true, textSnackbar: res.data.text, error: true })
        } else {
          let step = 1
          let checkError = emptyError(sender)
          if (checkError.checkEmpty) { // если ошибок нет на sender
            checkError = emptyError(receiver)
            step = 2
          }

          this.setState({ open: true, textSnackbar: `${step} шаг: ${checkError.textFieldError}`, error: true })
        }
      }
    })
  }

  handleDeleteSenderList = () => {
    this.setState({ senderList: '' })
  }

  onSubmitFinalForm = ffvalue => {
    const { valid } = this.formApi.getState()
    const { activeStep } = this.state

    if (activeStep === -1 && valid) this.authOperator(ffvalue)
    if (activeStep === 2 && valid) this.sendDataRFFOperator(ffvalue)
  }

  render() {
    const { classes } = this.props
    const { open, textSnackbar, error, activeStep, nameKontr, receiverList, senderList } = this.state
    const classesSnackBar = error ? { classes: { root: classes.snackbarError } } : { classes: { root: classes.snackbarSuccess } }

    return (
      <>
        <Form
          onSubmit={this.onSubmitFinalForm}
          mutators={{
            ...arrayMutators
          }}
          validate={validate}
          decorators={[this.bindFormApi]}
          render={({
            handleSubmit,
            values,
            form,
            errors
          }) => {
            const { change } = form

            return (
              <form onSubmit={handleSubmit}>
                {componentWithStep({
                  activeStep,
                  nameKontr,
                  values,
                  change,
                  errors,
                  receiverList,
                  senderList,
                  formApi: this.formApi,
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
                      <ErrorOutline size='small' className={classes.iconMessageSnackbar} />
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
    formApi,
    handleNext,
    errors,
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
        submitFinalForm={formApi}
        handleBack={handleBack}
        handleNext={handleNext}
        handleStep={handleStep}
        loadReceiverFile={loadReceiverFile}
        receiverList={receiverList}
        handleDeleteReceiverList={handleDeleteReceiverList}
        loadSenderFile={loadSenderFile}
        handleDeleteSenderList={handleDeleteSenderList}
        senderList={senderList}
        errorsFinalForm={errors}
      />
    )
}

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const emptyError = values => {
  let checkValue = [...values]
  let objError = { nameFieldError: '', textFieldError: '', checkEmpty: true }

  checkValue.map(key => {
    Object.keys(key).forEach(item => {
      if (item === 'errors') {
        Object.keys(key[item]).forEach(nameField => {
          if (key[item][nameField])
            objError = { nameFieldError: nameField, textFieldError: key[item][nameField], checkEmpty: false }
        })
      }
    })
  })
  return objError
}

const styles = theme => ({
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
  },
  iconMessageSnackbar: {
    marginRight: 10
  }
});

export default withStyles(styles)(WithOperators);
