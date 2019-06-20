import React, { Component } from "react";
import { TextField } from "final-form-material-ui";
import { Field } from "react-final-form";
import { Grid } from "@material-ui/core";

export const NameAndFIO = props => {
  const { value } = props;
  if (value === "UL") {
    return (
      <>
        <Grid item xs={12}>
          <Field
            fullWidth
            required
            name="name"
            component={TextField}
            type="text"
            label="Наименование"
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
          />
        </Grid>
        <Grid item xs={4}>
          <Field
            fullWidth
            name="patronymic"
            component={TextField}
            type="text"
            label="Отчетство"
          />
        </Grid>
      </>
    );
  }
};
