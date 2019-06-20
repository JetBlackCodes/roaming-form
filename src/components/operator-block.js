import React from "react";
import { Grid, Divider, IconButton } from "@material-ui/core";
import { OPERATORS } from "../constants/customer-form";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { TextField } from "final-form-material-ui";
import { Field } from "react-final-form";
import formatStringByPattern from "format-string-by-pattern";

const OperatorBlock = (props) => {

  const useStyles = makeStyles(theme => ({
    divider: {
      margin: theme.spacing(1, 0, 2, 0)
    },
    delButton: {
      margin: theme.spacing.unit,
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
    const { value } = props;
    const innK = `innKontr${props.index}`
    let nameF = false

    if (value[innK]) {
      nameF = value[innK].length === 12 ? true : false
    }

    if (nameF === false) {
      return (
        <Field
          required
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
              required
              name={nameField.lastname}
              label="Фамилия"
              fullWidth
              autoComplete="off"
              component={TextField}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Field
              required
              name={nameField.firstname}
              label="Имя"
              fullWidth
              autoComplete="off"
              component={TextField}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Field
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
  const { value } = props;
  const innK = `innKontr${props.index}`
  let disable = true // для КПП
  // подготовка завершена
  if (value[innK] && value[innK].length === 10)
      disable = false

  return (
    <Grid container>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Field
            required
            name={nameField.inn}
            label="ИНН"
            fullWidth
            autoComplete="off"
            component={TextField}
            parse={formatStringByPattern("999999999999")}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Field
            required
            name={nameField.kpp}
            label="КПП"
            disabled={disable}
            required={!disable}
            fullWidth
            autoComplete="off"
            component={TextField}
            parse={formatStringByPattern("999999999")}
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          <IconButton
            className={classes.delButton}
            color="primary"
            onClick={props.actions.delOperator}
            title="Удалить оператора"
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>

      { getNameComponent() }

      <Grid item xs={12} sm={12}>
        <Field
          select
          name={nameField.oper}
          label="Выберете оператора"
          margin="normal"
          variant="outlined"
          fullWidth
          autoComplete="off"
          component={TextField}
        >
          {OPERATORS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
        <Divider className={classes.divider} />
      </Grid>
    </Grid>
  );
}

export default OperatorBlock;
