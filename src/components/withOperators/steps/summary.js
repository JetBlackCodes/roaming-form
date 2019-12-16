import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Avatar,
  Chip,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Button,
  withStyles,
} from "@material-ui/core";
import { AttachFile, ExpandMore, Warning, Label } from "@material-ui/icons";

class Summary extends Component {

  state = {
    openModalFile: false,
  }

  handleCloseModal = () => {
    this.setState({ openModalFile: false })
  }

  handleOpenModal = () => {
    this.setState({ openModalFile: true })
  }

  handleDelete = () => {
    console.log('1')
  }

  render() {
    const {
      classes,
      values,
      senderList,
      receiverList,
      handleDeleteSenderList,
      handleDeleteReceiverList,
      handleStep
    } = this.props

    let colFiles = 0
    colFiles = senderList ? colFiles + 1 : colFiles
    colFiles = receiverList ? colFiles + 1 : colFiles

    let emptySender = empty(values.sender)
    let emptyReceiver = empty(values.receiver)

    return (
      <>
        <div className={classes.cardRoot}>

          {emptySender && emptyReceiver && !senderList && !receiverList &&
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Warning color='secondary' />
                <Typography>
                  Нет данных для отправки
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Отстутствуют или недостаточно данных для отправки на сервер. Проверьте пожалуйста введенные данные на шагах:
                  <div className={classes.divButtonNotData}>
                    <Button variant="outlined" color="primary" className={classes.buttonNotData} onClick={handleStep(0)}>
                      <Label className={classes.iconButton}/> Данные вашего клиента
                    </Button>
                    <Button variant="outlined" color="primary" className={classes.buttonNotData} onClick={handleStep(1)}>
                      <Label className={classes.iconButton}/> Контрагенты в АО Калуга Астрал
                    </Button>
                  </div>
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          }

          {!senderList &&
            <div className={classes.kontragentExplansion}>

              {!emptySender &&
                <Typography variant="h6" id="modal-title">
                  Данные Ваших клиентов
                </Typography>
              }

              {values.sender.map((item, index) => {
                let obj = {} // объект
                // заполним из Values
                obj.kpp = item.kpp
                obj.inn = obj.kpp ? `${item.inn} / ${item.kpp}` : item.inn
                obj.name = item.name
                if (item.inn && item.inn.length === 12)
                  obj.name = item.patronymic ? `ИП ${item.lastname} ${item.firstname} ${item.patronymic}` :
                    `ИП ${item.lastname} ${item.firstname}`
                obj.id = item.id
                obj.number = item.number
                // проверим на корректность ФИО для ИП
                let checkName = false
                if (obj.name)
                  checkName = obj.name.indexOf(undefined) === -1 ? true : false

                return (
                  <>
                    {checkName &&
                      <ExpansionPanel>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography> {obj.name} </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>

                          <Table>
                            <TableBody>

                              {obj.inn && <TableRow>
                                <TableCell align='left'>ИНН</TableCell>
                                <TableCell align='right'>{obj.inn}</TableCell>
                              </TableRow>}
                              {obj.id && <TableRow>
                                <TableCell align='left'>Идентификатор</TableCell>
                                <TableCell align='right'>{obj.id}</TableCell>
                              </TableRow>}
                              {obj.number && <TableRow>
                                <TableCell align='left'>Номер заявки</TableCell>
                                <TableCell align='right'>{obj.number}</TableCell>
                              </TableRow>}


                            </TableBody>
                          </Table>

                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    }
                  </>
                )

              })}
            </div>
          }

          {(senderList || receiverList) &&
            <div className={classes.kontragentExplansion}>

              <Typography variant="h6" id="modal-title">
                Загруженные файлы
              </Typography>

              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Добавлено файлов: {colFiles}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                  {senderList &&
                    <Chip
                      avatar={
                        <Avatar>
                          <AttachFile />
                        </Avatar>
                      }
                      label={
                        <p className={classes.labelChip}>
                          {senderList.name}
                        </p>
                      }
                      onDelete={handleDeleteSenderList}
                      className={classes.chipFiles}
                      variant='outlined'
                      color='primary'
                    />
                  }
                  {receiverList &&
                    <Chip
                      avatar={
                        <Avatar>
                          <AttachFile />
                        </Avatar>
                      }
                      label={
                        <p className={classes.labelChip}>
                          {receiverList.name}
                        </p>
                      }
                      onDelete={handleDeleteReceiverList}
                      className={classes.chipFiles}
                      variant='outlined'
                      color='primary'
                    />
                  }

                </ExpansionPanelDetails>
              </ExpansionPanel>

            </div>
          }

          {!receiverList && <div className={classes.kontragentExplansion}>

              {!emptyReceiver &&
                <Typography variant="h6" id="modal-title">
                  Данные контрагентов Ваших клиентов
                </Typography>
              }

              {values.receiver.map((item, index) => {
                let obj = {} // объект
                // заполним из Values
                obj.kpp = item.kpp
                obj.inn = obj.kpp ? `${item.inn} / ${item.kpp}` : item.inn
                obj.name = item.name
                if (item.inn && item.inn.length === 12)
                  obj.name = item.patronymic ? `ИП ${item.lastname} ${item.firstname} ${item.patronymic}` :
                    `ИП ${item.lastname} ${item.firstname}`
                obj.id = item.id
                // проверим на корректность ФИО для ИП
                let checkName = false
                if (obj.name)
                  checkName = obj.name.indexOf(undefined) === -1 ? true : false

                return (
                  <>
                    {checkName &&
                      <ExpansionPanel>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography> {obj.name} </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>

                          <Table>
                            <TableBody>

                              {obj.inn && <TableRow>
                                <TableCell align='left'>ИНН</TableCell>
                                <TableCell align='right'>{obj.inn}</TableCell>
                              </TableRow>}
                              {obj.id && <TableRow>
                                <TableCell align='left'>Идентификатор</TableCell>
                                <TableCell align='right'>{obj.id}</TableCell>
                              </TableRow>}


                            </TableBody>
                          </Table>

                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    }
                  </>
                )

              })}
            </div>
          }
        </div>
      </>
    )
  }
}

const empty = values => {
  let checkValue = [...values]
  let checkEmpty = true
  checkValue.map(key => {
    Object.keys(key).forEach(item => {
      if (key[item]) checkEmpty = false
    })
  })
  return checkEmpty
}

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  cell: {
    maxWidth: '50%'
  },
  labelChip: {
    width: 180,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  kontragentExplansion: {
    width: '100%',
    marginTop: 20
  },
  cardRoot: {
    width: 620,
    padding: 10
  },
  chipFiles: {
    marginRight: 10
  },
  iconButton: {
    marginRight: theme.spacing(1)
  },
  divButtonNotData: {
    display: 'flex',
    flexDirection: 'column'
  },
  buttonNotData: {
    maxWidth: 350,
    marginTop: 5,
    marginBottom: 5,
    display: 'flex',
    justifyContent: 'flex-start',
  }
});

export default withStyles(styles)(Summary);
