import React, {Component, Fragment} from 'react'

import { Typography, Grid, Divider, Fab, IconButton, Select } from '@material-ui/core';
import { OPERATORS, DEFAULT_OPERATOR, MAX_OPERATORS_COUNT } from '../constants/customer-form';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

import { TextField } from "final-form-material-ui";

import { Field } from "react-final-form";
import formatStringByPattern from "format-string-by-pattern";

function OperatorBlock(props) {
  const [values, setValues] = React.useState({
      type: false
  });
  const { type } = values;

  const useStyles = makeStyles(theme => ({
    divider: {
      margin: theme.spacing(1, 0, 2, 0),
    },
    button: {
      margin: theme.spacing.unit,
    },
  }));

  const nameField = {
    inn: `innKontr${props.index}`,
    kpp: `kppKontr${props.index}`,
    name: `nameKontr${props.index}`,
    oper: `operatorKontr${props.index}`,
    lastname: `lastnameKontr${props.index}`,
    firstname: `firstnameKontr${props.index}`,
    patronymic: `patronymicKontr${props.index}`,
  }

  const parse = value => {
    const someFormat = formatStringByPattern("999999999999");
    let newValue = someFormat(value);

    setValues({ ...values, type: newValue.length === 12 ? true : false });

    return newValue;
  }

  const getNameComponent = (type) => {
    let index = +type
    switch (index) {
      case 0:
        return (
          <>
            <Grid item xs={12} sm={12}>
              <Field
                required
                name={nameField.name}
                label="Название организации"
                fullWidth
                autoComplete="off"
                component={TextField}
              />
            </Grid>
          </>
        );
      case 1:
        return (
          <>
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
          </>
        );
      default:
        throw new Error("Unknown thread");
    }
  };


  const classes = useStyles();
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
            parse={parse}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Field
            required
            name={nameField.kpp}
            label="КПП"
            disabled={type}
            required={!type}
            fullWidth
            autoComplete="off"
            component={TextField}
            parse={formatStringByPattern("999999999")}
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          <IconButton
            className={classes.button}
            color="primary"
            onClick={props.actions.delOperator}
            title="Удалить оператора"
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>

      {getNameComponent(type)}

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

export default OperatorBlock
