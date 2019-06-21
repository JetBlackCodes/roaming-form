import React from "react";
import { Grid, Divider, IconButton } from "@material-ui/core";
import { OPERATORS } from "../constants/customer-form";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { TextField, Select } from "final-form-material-ui";
import { Field } from "react-final-form";
import formatStringByPattern from "format-string-by-pattern";
import MenuItem from "@material-ui/core/MenuItem";

function OperatorBlock(props) {
  const [values, setValues] = React.useState({
    type: false
  });
  const { type } = values;

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

  const parse = value => {
    const someFormat = formatStringByPattern("999999999999");
    let newValue = someFormat(value);

    setValues({ ...values, type: newValue.length === 12 ? true : false });

    return newValue;
  };

  const getNameComponent = type => {
    let index = +type;
    switch (index) {
      case 0:
        return (
          <Grid container autoComplete="off">
            <Field
              required
              name={nameField.name}
              label="Название организации"
              fullWidth
              component={TextField}
            />
          </Grid>
        );
      case 1:
        return (
          <Grid container autoComplete="off" spacing={1}>
            <Grid item xs={12} sm={4}>
              <Field
                required
                name={nameField.lastname}
                label="Фамилия"
                fullWidth
                component={TextField}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field
                required
                name={nameField.firstname}
                label="Имя"
                fullWidth
                component={TextField}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field
                name={nameField.patronymic}
                label="Отчество"
                fullWidth
                component={TextField}
              />
            </Grid>
          </Grid>
        );
      default:
        throw new Error("Unknown thread");
    }
  };

  const classes = useStyles();
  return (
    <form container autoComplete="off" >
      <Grid container className={classes.grid} spacing={1}>
        <Grid item xs={12} sm={6}>
          <Field
            required
            name={nameField.inn}
            label="ИНН"
            fullWidth
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
            component={TextField}
            parse={formatStringByPattern("999999999")}
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          <IconButton
            // className={classes.delButton}
            color="primary"
            onClick={props.actions.delOperator}
            title="Удалить оператора"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>

      {getNameComponent(type)}

      <Grid item xs={12}>
        <Field
          fullWidth
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
    </form>
  );
}

export default OperatorBlock;
