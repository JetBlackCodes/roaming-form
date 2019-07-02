import React from "react";
import { Grid, Divider, IconButton } from "@material-ui/core";
import { OPERATORS } from "../constants/customer-form";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { TextField, Select } from "final-form-material-ui";
import { Field } from "react-final-form";
import formatStringByPattern from "format-string-by-pattern";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import { zIndex } from "material-ui/styles";

const OperatorBlock = props => {
  const useStyles = makeStyles(theme => ({
    divider: {
      margin: theme.spacing(1, 0, 2, 0)
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

  const getNameComponent = () => {
    const { value, uploadReceiverList } = props;
    const innK = `innKontr${props.index}`;
    let nameF = false;
    let disable = true;

    if (value[innK]) {
      nameF = value[innK].length === 12 ? true : false;
      disable = value[innK].length === 10 ? false : true;
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
          style={{minHeight: "70px"}} 
        />
      );
    } else {
      return (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <Field
              required={!uploadReceiverList}
              disabled={uploadReceiverList}
              name={nameField.lastname}
              label="Фамилия"
              fullWidth
              component={TextField}
              style={{minHeight: "70px"}}
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Field
              required={!uploadReceiverList}
              disabled={uploadReceiverList}
              name={nameField.firstname}
              label="Имя"
              fullWidth
              component={TextField}
              style={{minHeight: "70px"}}
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Field
              disabled={uploadReceiverList}
              name={nameField.patronymic}
              label="Отчество"
              fullWidth
              component={TextField}
              style={{minHeight: "70px"}}
              autoComplete="off"
            />
          </Grid>
        </Grid>
      );
    }
  };

  const classes = useStyles(); // глав. комп
  // начало инициализации
  const { value, uploadReceiverList } = props;
  const innK = `innKontr${props.index}`;
  let disable = true; // для КПП
  // подготовка завершена
  if (value[innK] && value[innK].length === 10) disable = false;

  return (
    <Box
      border={0.5}
      borderRadius={16}
      borderColor="grey.300"
      marginTop="8px"
      marginBottom="10px"
      padding="8px"
      style={{ position: "relative"}}
    >      
      <Grid container>
        <div style={{ position: "absolute", right: "-5px", top: "-4px", zIndex: "1"}}>
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
            <Field
              required={!uploadReceiverList}
              disabled={uploadReceiverList}
              name={nameField.inn}
              label="ИНН"
              fullWidth
              component={TextField}
              parse={formatStringByPattern("999999999999")}
              style={{minHeight: "70px"}}
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              required
              name={nameField.kpp}
              label="КПП"
              disabled={disable}
              required={!disable}
              fullWidth
              component={TextField}
              parse={formatStringByPattern("999999999")}
              style={{minHeight: "70px"}}
              autoComplete="off"
            />
          </Grid>
        </Grid>

        {getNameComponent()}

        <Grid item xs={12}>
          <Field
            fullWidth
            required={!uploadReceiverList}
            disabled={uploadReceiverList}
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
    </Box>
  );
};

export default OperatorBlock;
