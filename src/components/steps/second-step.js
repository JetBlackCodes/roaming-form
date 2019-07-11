import React from "react";
import {
  Typography,
  Button,
  Modal,
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
import { UploadButton } from "../upload-button";
import { Field } from "react-final-form";

class SecondStep extends React.Component {
  state = {
    operators: this.props.operators,
    open: false,
    modalStyle: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    },
    openSnackbar: false,
    textSnackbar: "",
    openAnalyzReceiverList: false
  };

  handleChange = index => name => e => {
    const operators = this.state.operators;
    operators[index][name] = e.target.value;
    this.setState({
      operators
    });
  };

  handleClose = () => {
    // modal
    this.setState({ open: false });
  };

  handleOpen = () => {
    // modal
    this.setState({ open: true });
  };

  AddNewOperator = () => {
    // Добавление нового пользователя
    const { operators } = this.state;
    if (operators.length <= MAX_OPERATORS_COUNT) {
      operators.push({ ...DEFAULT_OPERATOR });
      this.setState({ operators });
    } else
      this.setState({
        openSnackbar: true,
        textSnackbar: "Вы можете добавить только 100 операторов"
      });
  };

  DelOperator = index => () => { // удаление оператора
    let operators = [ ...this.state.operators ] // клонируем operators
    const { changeFinalForm, values } = this.props; // мутатор rff + values rff
    let clearObj = objRff(index) // делаем запрос на чистый value с index'ом удаленного
    const newObj = {} // новый allValues rff для замены
    if (operators.length > 1) {
      operators.splice(index, 1); // удаляем из массива обработанных данных
      this.setState({ operators }); // обновляем state operators
      clearObj.map(item => changeFinalForm(item, undefined) ) // очищаем
      let newIndex = 0 // новый index
      Object.keys(values).forEach(key => { // проходим по allValues rff
        const value = this[key]; // value keys rff
        let defIndex = key.split("Kontr") // nameField rff + indexField rff. Example: defIndex['inn', 0]
        if (defIndex[1] > index) { // если больше искомого index
          newIndex = defIndex[1] - 1 // new index
          let newKey = `${defIndex[0]}Kontr${newIndex}` // новое название ключа, для сдвига
          newObj[newKey] = values[key] // задаем новый ключ
        } else if (defIndex[1] < index) // если меньше нужного index - без изменений
          newObj[key] = values[key]
      }, values);
      newIndex++ // Index на 1 выше
      clearObj = objRff(newIndex) // делаем запрос на чистый rff Values нужного index
      clearObj.map(item => newObj[item] = undefined ) // добавляем чтоб удалить лишние
      // в newObj новый массив с нужными ключами и значениями
      Object.keys(newObj).forEach(key => { changeFinalForm(key, newObj[key]) }, newObj) // перезаписываем allValues rff
    } else // иначе ошибка (контрагент остался 1)
      this.setState({ openSnackbar: true, textSnackbar: 'Вы не можете удалить всех контрагентов!' })
  };

  handleCloseSnackbar = () => {
    // закрытие уведомления
    this.setState({ openSnackbar: false });
  };

  closeModalReceiverList = () => {
    this.setState({
      open: false,
      openAnalyzReceiverList: false
    });
    this.props.handleDeleteReceiverList();
  };

  openAnalyzReceiverList = () => {
    const { openAnalyzReceiverList } = this.state;
    this.setState({ openAnalyzReceiverList: !openAnalyzReceiverList });
  };

  preloadReceiverList = (event) => {
    const true_type = [ 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel' ]
    const file = event.target.files[0]
    const { uploadReceiverfile, values, changeFinalForm } = this.props
    if (file) {
      if (file.type === true_type[0] || file.type === true_type[1]) {
        this.setState({ operators: [{ ...DEFAULT_OPERATOR }] })
        this.props.uploadReceiverfile(values, changeFinalForm, file)
      } else {
        this.setState({ openSnackbar: true, textSnackbar: 'Файл должен быть .xls или .xlsx' })
      }
    }
  }

  render() {
    const {
      values,
      classes,
      uploadReceiverfile,
      disableFileUpload,
      objReceiverList,
      chipFileName,
      upload,
      chipDopSog,
      handleDelete,
      changeFinalForm
    } = this.props
    const { open,
      modalStyle,
      openSnackbar,
      textSnackbar,
      openAnalyzReceiverList,
      operators
    } = this.state;
    const vertical = "top";
    const horizontal = "center";

    return (
      <>
        <Typography variant="h6" gutterBottom className={classes.uploadReceiverList}>
          Введите данные операторов
          { !disableFileUpload &&
            <Button
              onClick={this.handleOpen}
            >
              <AttachFile fontSize="small" />
                Загрузить список
            </Button>
          }

        </Typography>
        <div style={{ position: "relative" }}>
        {/* <Divider className={styles.divider} mb={1}/> */}
          {operators.map((item, index) => (
            <OperatorBlock
              actions={{ delOperator: this.DelOperator(index) }}
              index={index}
              value={values}
              uploadReceiverList={disableFileUpload}
            />
          ))}

          <UploadDopSoglash
            operators={operators}
            upload={upload}
            classes={classes}
            chipDopSog={chipDopSog}
            handleDelete={handleDelete}
            values={values}
            uploadReceiverList={disableFileUpload}
          />
        </div>

        <CheckTypeUploadReceiver
          open={disableFileUpload}
          AddNewOperator={this.AddNewOperator}
          handleDeleteReceiverList={this.closeModalReceiverList}
          chipFileName={chipFileName}
          classes={classes}
          handleOpen={this.handleOpen}
        />

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
                id="contained-button-file-receiver-list"
                type="file"
                onChange={this.preloadReceiverList}
                disabled={disableFileUpload}
              />
              <label htmlFor="contained-button-file-receiver-list">
                <Button
                  fullWidth
                  component="span"
                  disabled={disableFileUpload}
                >
                  <AttachFile className={classes.extendedIcon} />
                  Выбрать файл
                </Button>
              </label>
              
          </div>
        </Modal>

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openSnackbar}
          onClose={this.handleCloseSnackbar}
          autoHideDuration={4000}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{textSnackbar}</span>}
        />
      </>
    );
  }
}

const UploadDopSoglash = (props) => {
  const { upload, classes, chipDopSog, handleDelete, operators, values, uploadReceiverList } = props
  let checkNeedDopSog = 0

  Object.keys(values).forEach(function(key) {
    // пройдемся по объекту values rff
    let value = this[key]; // key - имя артрибута, value - значение артрибута

    if (key.indexOf("operatorKontr") !== -1) {
      // просмотреть все "операторы" контрагентов введеных
      if (value === "2BM" || value === "2AL" || value === "2BE")
        // если контур или такском или тензор
        checkNeedDopSog = 1;
    }
  }, values);

  if (uploadReceiverList === true)
    checkNeedDopSog = 1

  if (checkNeedDopSog === 1) {
    return (
      <>
        <Grid item xs={12}>
          <UploadButton upload={upload} />
        </Grid>
        <Files
          name={chipDopSog}
          classes={classes}
          handleDelete={handleDelete}
        />
      </>
    );
  } else return null;
};

const Files = props => {
  const { name, handleDelete, classes } = props;
  if (name)
    return (
      <Chip
        avatar={
          <Avatar>
            {" "}
            <AttachFile />{" "}
          </Avatar>
        }
        label={name}
        className={classes.chip}
        onDelete={handleDelete}
      />
    );
  else return null;
};

const CheckTypeUploadReceiver = props => {
  const {
    open,
    AddNewOperator,
    handleDeleteReceiverList,
    chipFileName,
    classes,
    handleOpen
  } = props;
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
    );
  } else {
    return (
      <Button
        onClick={AddNewOperator}
        variant="contained"
        color="primary"
        style={{ position: "absolute", bottom: "25px" }}
      >
        Добавить оператора
      </Button>
    );
  }
};

const objRff = (index ) => {
  return [`innKontr${index}`,
    `kppKontr${index}`,
    `nameKontr${index}`,
    `lastnameKontr${index}`,
    `firstnameKontr${index}`,
    `patronymicKontr${index}`
  ]
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  error: {
    color: "#9b111e"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  infoReceiverList: {
    marginTop: "5px",
    display: "flex",
    justifyContent: "space-around"
  },
  fileReceiverListMain: {
    maxWidth: '250px',
    position: 'absolute',
    top: '207px',
    right: '20px'
  },
  fileReceiverList: {
    maxWidth: "50px"
  },
  buttonStatusReceiverList: {
    maxHeight: "32px"
  },
  uploadReceiverList: {
    display: 'flex',
    justifyContent: 'space-between',
  }
});

export default withStyles(styles)(SecondStep);
