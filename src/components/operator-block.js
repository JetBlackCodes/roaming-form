import React from "react";
import { Grid, Divider, IconButton, Card } from "@material-ui/core";
import { OPERATORS } from "../constants/customer-form";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { TextField, Select } from "final-form-material-ui";
import { Field } from "react-final-form";
import formatStringByPattern from "format-string-by-pattern";
import MenuItem from "@material-ui/core/MenuItem";

const OperatorBlock = (props) => {

  const useStyles = makeStyles(theme => ({
    divider: {
      margin: theme.spacing(1, 0, 2, 0)
    },
    delButton: {
      position: "absolute",
      bottom: "32px",
      right: "1px"
    },
    grid: {
      position: "relative"
    },
    select: {
      marginBottom: theme.spacing(2)
    },
    paper: {
      marginTop: '8px',
      marginBottom: '8px',
      maxWidth: '550px',
      padding: '10px',
      position: 'relative'
    },
    delOperator: {
      position: "absolute",
      right: "-5px",
      top: "-4px",
      zIndex: "1"
    }
  }));

  const nameField = {
    inn: `innKontr${props.index}`,
    kpp: `kppKontr${props.index}`,
    name: `nameKontr${props.index}`,
    oper: `operatorKontr${props.index}`,
    lastname: `lastnameKontr${props.index}`,
    firstname: `firstnameKontr${props.index}`,
    patronymic: `patronymicKontr${props.index}`
  };

  const getNameComponent = () => {
    const { value, uploadReceiverList } = props;
    const innK = `innKontr${props.index}`
    let nameF = false // FIO
    let disable = true

    if (value[innK]) {
      let length = value[innK].length
      nameF = length === 12 ? true : false
      if (length === 10 || length === 12)
        disable = uploadReceiverList
      else
        disable = true
    }

    if (nameF === false) {
      return (
        <Field
          required={!disable}
          disabled={disable}
          name={nameField.name}
          label="Название организации"
          fullWidth
          autoComplete="off"
          component={TextField}
        />
      )
    } else {
      return (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <Field
              required={!disable}
              disabled={disable}
              name={nameField.lastname}
              label="Фамилия"
              fullWidth
              autoComplete="off"
              component={TextField}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Field
              required={!disable}
              disabled={disable}
              name={nameField.firstname}
              label="Имя"
              fullWidth
              autoComplete="off"
              component={TextField}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Field
              disabled={disable}
              name={nameField.patronymic}
              label="Отчество"
              fullWidth
              autoComplete="off"
              component={TextField}
            />
          </Grid>
        </Grid>
      )
    }
  };

  const classes = useStyles(); // глав. комп
  // начало инициализации
  const { value, uploadReceiverList } = props;
  const innK = `innKontr${props.index}`
  let disable = true // для общий
  let disableKpp = true // для КПП так как еще 1 проверка

  if (value[innK] && value[innK].length === 10)
      disableKpp = uploadReceiverList === true ? true : false
  disable = uploadReceiverList
  // подготовка завершена
  return (
    <Card className={classes.paper}>
    <Grid container autoComplete="off">
      <div className={classes.delOperator}>
          <IconButton
            // className={classes.delButton}
            color="primary"
            onClick={props.actions.delOperator}
            title="Удалить оператора"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
      </div>
      <Grid container className={classes.grid} spacing={1}>
        <Grid item xs={12} sm={6}>
          <Field
            required={!disable}
            disabled={disable}
            name={nameField.inn}
            label="ИНН"
            fullWidth
            component={TextField}
            parse={formatStringByPattern("999999999999")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            required
            name={nameField.kpp}
            label="КПП"
            disabled={disableKpp}
            required={!disableKpp}
            fullWidth
            component={TextField}
            parse={formatStringByPattern("999999999")}
          />
        </Grid>
      </Grid>

      { getNameComponent() }

      <Grid item xs={12}>
        <Field
          fullWidth
          required={!disable}
          disabled={disable}
          name={nameField.oper}
          label="Выберете оператора"
          component={Select}
          formControlProps={{ fullWidth: true }}
          className={classes.select}
        >
          {OPERATORS.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Field>
      </Grid>
      <Divider className={classes.divider} />
    </Grid>
    </Card>
  );
}

export default OperatorBlock;
