import React, { Component } from "react";
import { TextField } from "final-form-material-ui";
import { Field } from "react-final-form";
import { Grid, FormControl, FormHelperText } from "@material-ui/core";

export const NameAndFIO = props => {
  const { values, classes } = props;
  let named = 0;
  let disable = true;

  if (values && values.inn) {
    named = values.inn.length === 12 ? 1 : 0;
    disable = values.inn.length === 10 ? false : true;
  }

  if (named === 0) {
    return (
      <>
        <Grid item xs={12}>
          <Field
            fullWidth
            required={!disable}
            disabled={disable}
            name="name"
            component={TextField}
            type="text"
            label="Наименование"
            style={{ minHeight: "70px" }}
          />
        </Grid>
      </>
    );
  } else {
    return (
      <>
        <Grid item xs={4}>
          <Field
            fullWidth
            required
            name="lastname"
            component={TextField}
            type="text"
            label="Фамилия"
            style={{ minHeight: "70px" }}
          />
        </Grid>
        <Grid item xs={4}>
          <Field
            fullWidth
            required
            name="firstname"
            component={TextField}
            type="text"
            label="Имя"
            style={{ minHeight: "70px" }}
          />
        </Grid>
        <Grid item xs={4}>
          <Field
            fullWidth
            name="patronymic"
            component={TextField}
            type="text"
            label="Отчетство"
            style={{ minHeight: "70px" }}
          />
        </Grid>
      </>
    );
  }
};
