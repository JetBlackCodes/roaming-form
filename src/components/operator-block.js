import React from "react";
import { Grid, IconButton, Card } from "@material-ui/core";
import { OPERATORS } from "../constants/customer-form";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { Select } from "final-form-material-ui";
import { Field } from "react-final-form";
import formatStringByPattern from "format-string-by-pattern";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";

import { StyledTextField } from "./styled-text-field";
import { NameAndFIO } from "./name-and-fio";

const OperatorBlock = props => {
  const useStyles = makeStyles(theme => ({
    divider: {
      margin: theme.spacing(1, 0, 2, 0)
    },
    select: {
      marginBottom: theme.spacing(2)
    },
    paper: {
      marginTop: "8px",
      marginBottom: "8px",
      maxWidth: "550px",
      padding: "10px",
      position: "relative"
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
    return (
      <NameAndFIO
        inn={props.value[`innKontr${props.index}`]}
        nameOfField={nameField}
        autoComplete="off"
      />
    );
  };

  const classes = useStyles(); // глав. комп
  // начало инициализации
  const { value, uploadReceiverList } = props;

  const innK = `innKontr${props.index}`;
  let disable = true; // для общий
  let disableKpp = true; // для КПП так как еще 1 проверка

  if (value && value[innK]) {
    disableKpp = value[innK].length === 10 ? false : true;
    if (value[innK].length === 10 || value[innK].length === 12) disable = false;
  }
  if (uploadReceiverList) { disable = true; disableKpp = true; }
  // подготовка завершена

  return (
    <Card className={classes.paper}>
      <Grid container autoComplete="off">
        <div className={classes.delOperator}>
          <IconButton
            color="primary"
            onClick={props.actions.delOperator}
            title="Удалить оператора"
            disableRipple
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
        <Grid container className={classes.grid} spacing={1}>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              name={nameField.inn}
              label="ИНН"
              parse={formatStringByPattern("999999999999")}
              required={!uploadReceiverList}
              disabled={uploadReceiverList}
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              name={nameField.kpp}
              label="КПП"
              parse={formatStringByPattern("999999999")}
              disabled={disableKpp}
              required={!disableKpp}
              autoComplete="off"
            />
          </Grid>
        </Grid>

        {getNameComponent()}

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
      </Grid>
    </Card>
  );
};

export default OperatorBlock;
