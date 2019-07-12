import React from "react";
import { Grid } from "@material-ui/core";
import { StyledTextField } from "./styled-text-field";

export const NameAndFIO = props => {
  const { inn, nameOfField, autoComplete } = props;

  if (nameOfField === undefined) {
    var name = "name";
    var lastname = "lastname";
    var firstname = "firstname";
    var patronymic = "patronymic";
  } else ({ name, lastname, firstname, patronymic } = nameOfField);

  if (inn) {
    var isName = inn.length === 10 ? true : false;
    var isFIO = inn.length === 12 ? true : false;
  }

  if (isName) {
    return (
      <StyledTextField
        name={name}
        label="Название организации"
        autoComplete={autoComplete}
      />
    );
  } else if (isFIO) {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <StyledTextField name={lastname} label="Фамилия" autoComplete={autoComplete} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StyledTextField name={firstname} label="Имя" autoComplete={autoComplete} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StyledTextField
            name={patronymic}
            label="Отчество"
            required={false}
            autoComplete={autoComplete}
          />
        </Grid>
      </Grid>
    );
  } else {
    return (
      <StyledTextField
        name="randName"
        label="Название организации"
        disabled={true}
        required={false}
      />
    );
  }
};
