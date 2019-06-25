import React from "react";
import {
  Typography,
  Divider,
  Button,
  IconButton,
  Modal,
  Fab,
  TextField,
  withStyles
} from "@material-ui/core";
import {
  DEFAULT_OPERATOR,
  MAX_OPERATORS_COUNT
} from "../../constants/customer-form";
import { AttachFile } from "@material-ui/icons";
import OperatorBlock from "../operator-block";
import readXlsxFile from 'read-excel-file'

class SecondStep extends React.Component {
  state = {
  operators: this.props.operators,
  open: false,
  modalStyle: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  disableUpload: false
};

uploadfile = (event) => {
  this.setState({ disableUpload: true })
  const { values } = this.props
  let obj = values
  readXlsxFile(event.target.files[0]).then((rows) => {

    rows.map((item, index) => {
      if (index !== 0) {
        obj[`operatorKontr${index - 1}`] = item[3];
        obj[`innKontr${index - 1}`] = item[1];

        if (obj[`innKontr${index - 1}`].length === 10) {
          obj[`nameKontr${index - 1}`] = item[0]
          obj[`kppKontr${index - 1}`] = item[2]
        } else {
          obj[`lastnameKontr${index - 1}`] = item[4]
          obj[`firstnameKontr${index - 1}`] = item[5]
          obj[`patronymicKontr${index - 1}`] = item[6]
        }

      }
    })
    console.log(values)
  })
}

  handleChange = index => name => e => {
    const operators = this.state.operators;
    operators[index][name] = e.target.value;
    this.setState({
      operators
    });
  };

  handleClose = () => {
    this.setState({ open: false })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  AddNewOperator = () => {
    const { operators } = this.state;
    if (operators.length <= MAX_OPERATORS_COUNT) {
      operators.push({ ...DEFAULT_OPERATOR });
      this.setState({ operators });
    } else alert("Вы можете добавить только 100 операторов");
  };

  DelOperator = index => () => {
    let { operators } = this.state;
    if (operators.length > 1) {
      operators.splice(index, 1);
      this.setState({ operators });
    } else alert("Вы не можете удалить всех операторов!");
  };

  render() {
    const { values } = this.props
    const { open, modalStyle, disableUpload } = this.state
    return (
      <>
        <Typography variant="h6" gutterBottom>
          Введите данные операторов
        </Typography>
        <Divider className={useStyles.divider} mb={1}/>
        <div>
          {this.state.operators.map((item, index) => (
            <OperatorBlock
              actions={{ delOperator: this.DelOperator(index) }}
              index={index}
              value={values}
            />
          ))}
        </div>

        <Button
          onClick={this.AddNewOperator}
          variant="contained"
          color="primary"
          className="addButton"
        >
          Добавить оператора
        </Button>
        <IconButton
            className="deleteButton"
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
                onChange={this.uploadfile}
                disabled={disableUpload}
              />
              <label htmlFor="contained-button-file">
                <Button
                  fullWidth
                  component="span"
                  disabled={disableUpload}
                >
                  <AttachFile className={classes.extendedIcon} />
                  Выбрать файл
                </Button>
                <TextField
                  disabled
                  fullWidth
                  label="Файл не выбран"
                  value=""
                />
              </label>
            </div>
          </Modal>

        </>
    );
  }
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
});

export default withStyles(styles)(SecondStep);
