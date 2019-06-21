import React, { Component } from "react";
import { TextField } from "final-form-material-ui";
import { Field } from "react-final-form";
import { Grid, FormControl, FormHelperText } from "@material-ui/core";

export const NameAndFIO = props => {
  const { values, classes } = props;
  let named = 0
  let disable = true

  if (values && values.inn) {
    named = values.inn.length === 12 ? 1 : 0
    disable = values.inn.length === 10 ? false : true
  }

  if (named === 0) {
    return (
      <>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Field
              fullWidth
              required={!disable}
              disabled={disable}
              name="name"
              component={TextField}
              type="text"
              label="Наименование"
              aria-describedby="name-helper-text"
            />
            <FormHelperText id="name-helper-text"></FormHelperText>
          </FormControl>
        </Grid>
      </>
    )
  } else {
    return (
      <>
        <Grid item xs={4}>
          <FormControl>
            <Field
              fullWidth
              required
              name="lastname"
              component={TextField}
              type="text"
              label="Фамилия"
              aria-describedby="name-helper-text"
            />
            <FormHelperText id="name-helper-text"></FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl>
            <Field
              fullWidth
              required
              name="firstname"
              component={TextField}
              type="text"
              label="Имя"
              aria-describedby="name-helper-text"
            />
            <FormHelperText id="name-helper-text"></FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl>
            <Field
              fullWidth
              name="patronymic"
              component={TextField}
              type="text"
              label="Отчетство"
              aria-describedby="name-helper-text"
            />
            <FormHelperText id="name-helper-text"></FormHelperText>
          </FormControl>
        </Grid>
      </>
    )
  }
};
