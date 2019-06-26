import React from "react";
import {
  Typography,
  Divider,
  Button,
  IconButton,
  Modal,
  Fab,
  TextField,
  Snackbar,
  Grid,
  Chip,
  Avatar,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  withStyles
} from "@material-ui/core";
import {
  DEFAULT_OPERATOR,
  MAX_OPERATORS_COUNT
} from "../../constants/customer-form";
import { AttachFile, Equalizer } from "@material-ui/icons";
import OperatorBlock from "../operator-block";
class SecondStep extends React.Component {
  state = {
    operators: this.props.operators,
    open: false,
    modalStyle: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    openSnackbar: false,
    textSnackbar: '',
    openAnalyzReceiverList: false
  };

  handleChange = index => name => e => {
    const operators = this.state.operators;
    operators[index][name] = e.target.value;
    this.setState({
      operators
    });
  };

  handleClose = () => { // modal
    this.setState({ open: false })
  }

  handleOpen = () => { // modal
    this.setState({ open: true })
  }

  AddNewOperator = () => { // Добавление нового пользователя
    const { operators } = this.state;
    if (operators.length <= MAX_OPERATORS_COUNT) {
      operators.push({ ...DEFAULT_OPERATOR });
      this.setState({ operators });
    } else
      this.setState({ openSnackbar: true, textSnackbar: 'Вы можете добавить только 100 операторов' })
  };

  DelOperator = index => () => { // удаление оператора
    let { operators } = this.state;
    if (operators.length > 1) {
      operators.splice(index, 1);
      this.setState({ operators });
    } else
      this.setState({ openSnackbar: true, textSnackbar: 'Вы не можете удалить всех операторов!' })
  };

  handleCloseSnackbar = () => { // закрытие уведомления
    this.setState({ openSnackbar: false });
  }

  closeModalReceiverList = () => {
    this.setState({
      open: false,
      openAnalyzReceiverList: false
    })
    this.props.handleDeleteReceiverList()
  }

  openAnalyzReceiverList = () => {
    const { openAnalyzReceiverList } = this.state
    this.setState({ openAnalyzReceiverList: !openAnalyzReceiverList })
  }

  render() {
    const {
      values,
      classes,
      uploadReceiverfile,
      disableFileUpload,
      objReceiverList,
      chipFileName,
    } = this.props
    const { open,
      modalStyle,
      openSnackbar,
      textSnackbar,
      openAnalyzReceiverList
    } = this.state
    const vertical = 'top'
    const horizontal = 'center'

    return (
      <>
        <Typography variant="h6" gutterBottom>
          Введите данные операторов
        </Typography>
        <Divider className={classes.divider} mb={1}/>
        <div>
          {this.state.operators.map((item, index) => (
            <OperatorBlock
              actions={{ delOperator: this.DelOperator(index) }}
              index={index}
              value={values}
              uploadReceiverList={disableFileUpload}
            />
          ))}
        </div>

        <CheckTypeUploadReceiver
          open={disableFileUpload}
          AddNewOperator={this.AddNewOperator}
          handleDeleteReceiverList={this.closeModalReceiverList}
          chipFileName={chipFileName}
          classes={classes}
          handleOpen={this.handleOpen}
        />

        <IconButton
            className="addButton"
            size="small"
            onClick={this.handleOpen}
          >
            <AttachFile fontSize="small" />
              Загрузить
          </IconButton>

          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={this.handleClose}
          >
            <div style={modalStyle} className={classes.paper}>
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

              <input
                accept=".xls, .xlsx"
                className={classes.input}
                id="contained-button-file"
                type="file"
                onChange={uploadReceiverfile}
                disabled={disableFileUpload}
              />
              <label htmlFor="contained-button-file">
                <Button
                  fullWidth
                  component="span"
                  disabled={disableFileUpload}
                >
                  <AttachFile className={classes.extendedIcon} />
                  Выбрать файл
                </Button>
              </label>

              <InfoReceiverListChip // chip + button
                open={disableFileUpload}
                classes={classes}
                handleDeleteReceiverList={this.closeModalReceiverList}
                chipFileName={chipFileName}
                openAnalyzReceiverList={this.openAnalyzReceiverList}
              />

              <AnalyzReceiverList // table analyz xls + xlsx
                open={openAnalyzReceiverList}
                objReceiverList={objReceiverList}
              />

            </div>
          </Modal>

          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={openSnackbar}
            onClose={this.handleCloseSnackbar}
            autoHideDuration={4000}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{textSnackbar}</span>}
          />

        </>
    );
  }
}

const CheckTypeUploadReceiver = (props) => {
  const { open, AddNewOperator, handleDeleteReceiverList, chipFileName, classes, handleOpen } = props
  if (open) {
    return (
      <Chip
        variant="outlined"
        color="primary"
        onDelete={handleDeleteReceiverList}
        avatar={
          <Avatar>
            <AttachFile />
          </Avatar>
        }
        label={chipFileName}
        className={classes.fileReceiverListMain}
        onClick={handleOpen}
      />
    )
  } else {
    return (
      <Button
        onClick={AddNewOperator}
        variant="contained"
        color="primary"
        className="addButton"
      >
        Добавить оператора
      </Button>
    )
  }
}

const AnalyzReceiverList = (props) => {
  const { open, objReceiverList } = props
  if (open) {
    return (
      <Paper>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Всего контрагентов</TableCell>
              <TableCell align='right'>{objReceiverList.all}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Из них ЮЛ</TableCell>
              <TableCell align='right'>{objReceiverList.ul}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Из них ИП</TableCell>
              <TableCell align='right'>{objReceiverList.ip}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Из них некорректные</TableCell>
              <TableCell align='right'>{objReceiverList.error}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    )
  }
  else
    return null
}

const InfoReceiverListChip = (props) => {
  const { open, classes, handleDeleteReceiverList, chipFileName, openAnalyzReceiverList } = props
  if (open) {
    return (
      <div className={classes.infoReceiverList}>
        <Chip
          variant="outlined"
          color="primary"
          onDelete={handleDeleteReceiverList}
          avatar={
            <Avatar>
              <AttachFile />
            </Avatar>
          }
          label={chipFileName}
          className={classes.fileReceiverList}
        />
        <Button
          variant="contained"
          className={classes.buttonStatusReceiverList}
          onClick={openAnalyzReceiverList}
        >
          Анализ файла
          <Equalizer />
        </Button>
      </div>
    )
  }
  else
    return null
}

const styles = theme => ({
  divider: {
    margin: theme.spacing(1, 0, 2, 0)
  },
  button: {
    margin: theme.spacing.unit
  },
  paper: {
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
    color: '#9b111e'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  input: {
    display: "none"
  },
  infoReceiverList: {
    marginTop: '5px',
    display: 'flex',
    justifyContent: 'space-around'
  },
  fileReceiverListMain: {
    maxWidth: '250px',
    position: 'absolute',
    bottom: '25px',
    left: '140px'
  },
  fileReceiverList: {
    maxWidth: '250px',
  },
  buttonStatusReceiverList: {
    maxHeight: '32px'
  }
});

export default withStyles(styles)(SecondStep);
