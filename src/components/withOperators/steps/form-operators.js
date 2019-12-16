import React, { Component } from "react";
import {
  withStyles,
  StepLabel,
  Step,
  Stepper,
  Grid,
  Button,
  Paper,
  Typography,
  Modal,
  Chip,
  Avatar,
  StepButton,
} from "@material-ui/core";
import { AttachFile } from "@material-ui/icons";

import Auth from '../auth'
import FirstStep from './first-step'
import SecondStep from './second-step'
import Summary from './summary'

class FormOperators extends Component {

  state = {
    modalStyle: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    openModalFile: false,
    typeModal: undefined,
  }

  openModal = (type) => () => {
    this.setState({ openModalFile: true, typeModal: type })
  }

  handleModalClose = () => {
    this.setState({ openModalFile: false })
  }

  render() {
    const {
      classes,
      activeStep,
      nameKontr,
      values,
      handleBack,
      handleNext,
      submitFinalForm,
      handleStep,
      loadReceiverFile,
      receiverList,
      handleDeleteReceiverList,
      loadSenderFile,
      handleDeleteSenderList,
      senderList,
      errorsFinalForm
    } = this.props;

    const { modalStyle, openModalFile, typeModal } = this.state

    const steps = ['Данные вашего клиента', 'Контрагенты в АО Калуга Астрал', 'Проверка данных']

    let emptyErrors = true

    if (errorsFinalForm && (errorsFinalForm.sender || errorsFinalForm.receiver))
      emptyErrors = false

    return (
      <div className={classes.root}>
        <div className={classes.layout}>
        <Paper className={classes.form}>

          <Typography component="h1" variant="h4" align="center">
            Заявление на подключение роуминга между контрагентами
          </Typography>

          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const labelProps = {};
              const { errors } = this.props.submitFinalForm.getState()

              let errorStep = [ false, false ]
              if ( errors && errors.sender ) errorStep[0] = true
              if ( errors && errors.receiver ) errorStep[1] = true
              if (errorStep[index]) labelProps.error = true;

              return (
                <Step key={label}>
                  <StepLabel
                    {...labelProps}
                  >
                    <StepButton onClick={handleStep(index)}>
                      {label}
                    </StepButton>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <Typography variant="h6" gutterBottom>
            {activeStep === 0 &&
              <div className={classes.title}>
                Введите данные вашего клиента
                {!senderList &&
                  <Button
                    component="span"
                    variant='outlined'
                    color='primary'
                    size='small'
                    onClick={this.openModal('sender')}
                  >
                    загрузить
                  </Button>
                }
                {senderList &&
                  <Chip
                    avatar={
                      <Avatar>
                        <AttachFile />
                      </Avatar>
                    }
                    label={
                      <p className={classes.labelChipStep}>
                        {senderList.name}
                      </p>
                    }
                    onDelete={handleDeleteSenderList}
                    className={classes.chipReceiverStep}
                    onClick={this.openModal('sender')}
                    variant='outlined'
                    color='primary'
                  />
                }
              </div>
            }
            {activeStep === 1 &&
              <div className={classes.title}>
                Введите данные контрагентов в Калуга Астрал
                {!receiverList &&
                  <Button
                    component="span"
                    variant='outlined'
                    color='primary'
                    size='small'
                    onClick={this.openModal('receiver')}
                  >
                    загрузить
                  </Button>
                }
                {receiverList &&
                  <Chip
                    avatar={
                      <Avatar>
                        <AttachFile />
                      </Avatar>
                    }
                    label={
                      <p className={classes.labelChipStep}>
                        {receiverList.name}
                      </p>
                    }
                    onDelete={handleDeleteReceiverList}
                    className={classes.chipReceiverStep}
                    onClick={this.openModal('receiver')}
                    variant='outlined'
                    color='primary'
                  />
                }
              </div>
            }
            {activeStep === 2 &&
              <div className={classes.title}>Проверьте введенные данные</div>
            }
          </Typography>

          <GetStepFormOperators
            activeStep={activeStep}
            nameKontr={nameKontr}
            values={values}
            classes={classes}
            handleBack={handleBack}
            submitFinalForm={submitFinalForm}
            handleNext={handleNext}
            receiverList={receiverList}
            senderList={senderList}
            handleDeleteSenderList={handleDeleteSenderList}
            handleDeleteReceiverList={handleDeleteReceiverList}
            handleStep={handleStep}
          />

          <div className={classes.cardRoot}>
            <Grid item xs={12} sm={12} className={classes.buttonForm}>
              {activeStep < 3 &&
                <Button
                  variant='outlined'
                  color='primary'
                  disabled={activeStep === 0 ? true : false}
                  onClick={handleBack}
                >
                  Назад
                </Button>
              }
              {activeStep === 2 &&
                <Button
                  variant='outlined'
                  color='primary'
                  type='submit'
                  disabled={!emptyErrors}
                >
                  Отправить
                </Button>
              }
              {activeStep < 2 &&
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={handleNext}
                >
                  Далее
                </Button>
              }
            </Grid>
          </div>

        </Paper>       

        <ModalUploadList
          openModal={this.openModal}
          openModalFile={openModalFile}
          handleModalClose={this.handleModalClose}
          classes={classes}
          receiverList={receiverList}
          senderList={senderList}
          modalStyle={modalStyle}
          loadReceiverFile={loadReceiverFile}
          loadSenderFile={loadSenderFile}
          handleDeleteReceiverList={handleDeleteReceiverList}
          handleDeleteSenderList={handleDeleteSenderList}
          typeModal={typeModal}
        />

      </div>
      </div>
    );
  }
}

const ModalUploadList = props => {
  const {
    openModalFile,
    handleModalClose,
    classes,
    receiverList,
    senderList,
    modalStyle,
    loadReceiverFile,
    loadSenderFile,
    handleDeleteReceiverList,
    handleDeleteSenderList,
    typeModal
  } = props

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={openModalFile}
      onClose={handleModalClose}
    >
      <div style={modalStyle} className={classes.paperModal}>
        <Typography variant="h6" id="modal-title">
          Вы можете загрузить список контрагентов
        </Typography>
        <Typography variant="subtitle1" id="simple-modal-description">
          Вы можете загрузить файл в формате .xls и xlsx если он сапостовим с шаблоном
        </Typography>
        <Typography variant="subtitle1" id="simple-modal-description" align='center'>
          <a href="https://astral.ru/roaming/tempalates/abonent-receiver.xlsx">Загрузить шаблон</a>
        </Typography>
        <Typography variant="subtitle1" id="simple-modal-description" className={classes.error}>
          <em>Обращаем Ваше внимание, что загрузка из файла
          удалит все введеные данные контрагентов вручную</em>
        </Typography>

        <ButtonOrChipModal
          classes={classes}
          typeModal={typeModal}
          senderList={senderList}
          receiverList={receiverList}
          loadSenderFile={loadSenderFile}
          loadReceiverFile={loadReceiverFile}
          handleDeleteSenderList={handleDeleteSenderList}
          handleDeleteReceiverList={handleDeleteReceiverList}
        />

      </div>
    </Modal>
  )
}

const ButtonOrChipModal = props => {
  const {
    classes,
    typeModal,
    senderList,
    receiverList,
    loadSenderFile,
    loadReceiverFile,
    handleDeleteSenderList,
    handleDeleteReceiverList
  } = props

  let checkType = {
    id: typeModal === 'sender' ? 'modal-sender-list-operator' : 'modal-receiver-list-operator',
    onChange: typeModal === 'sender' ? loadSenderFile : loadReceiverFile,
    name: typeModal === 'sender' ? senderList.name : receiverList.name,
    onDelete: typeModal === 'sender' ? handleDeleteSenderList : handleDeleteReceiverList,
    file: typeModal === 'sender' ? senderList : receiverList,
  }

  return (
    <>
      {!checkType.file &&
        <>
          <input
            accept=".xls, .xlsx"
            className={classes.input}
            id={checkType.id}
            type="file"
            onChange={checkType.onChange}
          />
          <label htmlFor={checkType.id} >
            <Button
              fullWidth
              component="span"
            >
              <AttachFile className={classes.extendedIcon} />
              Выбрать файл
            </Button>
          </label>
        </>
      }
      {checkType.file &&
        <div className={classes.chipReceiverList}>
          <Chip
            avatar={
              <Avatar>
                <AttachFile />
              </Avatar>
            }
            label={
              <p className={classes.labelChip}>
                {checkType.name}
              </p>
            }
            onDelete={checkType.onDelete}
            className={classes.chipReceiver}
            variant='outlined'
            color='primary'
          />
        </div>
      }
    </>
  )
}

const GetStepFormOperators = props => {
  const {
    activeStep,
    nameKontr,
    values,
    classes,
    handleBack,
    submitFinalForm,
    handleNext,
    receiverList,
    senderList,
    handleDeleteSenderList,
    handleDeleteReceiverList,
    handleStep,
   } = props

  let checkNum = activeStep === 0 ? true : false
  if (checkNum && nameKontr !== 'XXX') // тут нужно вписать в условие Контур + Infotecs
    checkNum = false

  switch (activeStep) {
    case 0:
      return <FirstStep
          nameKontr={nameKontr}
          values={values}
          handleBack={handleBack}
          handleNext={handleNext}
          activeStep={activeStep}
          senderList={senderList}
          submitFinalForm={submitFinalForm}
        />
    case 1:
      return <SecondStep
          values={values}
          handleBack={handleBack}
          handleNext={handleNext}
          receiverList={receiverList}
          submitFinalForm={submitFinalForm}
        />
    case 2:
      return <Summary
        values={values}
        senderList={senderList}
        receiverList={receiverList}
        handleDeleteSenderList={handleDeleteSenderList}
        handleDeleteReceiverList={handleDeleteReceiverList}
        handleStep={handleStep}
      />
    case 3:
      return (
        <div className={classes.divLastStep}>
          <Typography variant="h5" gutterBottom>
            Ваша заявка принята в работу.
          </Typography>
          <Typography variant="subtitle1">
            Срок ответа на заявку от 2 до 6 рабочих дней.
          </Typography>
        </div>
      )
    default:
      return <Auth />

  }
}

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  chip: {
    margin: theme.spacing(1),
  },
  layout: {
    width: "auto",
    position: "relative",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  form: {
    width: 630,
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: "30px",
      marginBottom: "35px",
      padding: theme.spacing.unit * 3
    },
    position: "relative"
  },
  cardRoot: {
    width: 620,
    padding: 10
  },
  buttonForm: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  input: {
    display: "none",
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 620,
    marginLeft: 10
  },
  paperModal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  error: {
    color: '#f00'
  },
  labelChip: {
    width: 180,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  chipReceiver: {
    width: 250
  },
  chipReceiverList: {
    display: 'flex',
    justifyContent: 'center'
  },
  labelChipStep: {
    width: 70,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  chipReceiverStep: {
    width: 140
  },
  divLastStep: {
    flexDirection: 'column',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center'
  }
});

export default withStyles(styles)(FormOperators);
