import React from "react";
import { Grid, Typography, TextField } from "@material-ui/core";
import {UploadButton} from "./buttons";

function FirstStep() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Введите данные вашей организации
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id=""
            label="ИНН"
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="КПП"
            fullWidth
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Название организации"
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Идентификатор"
            fullWidth
            autoComplete="billing address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="e-mail"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <UploadButton />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default FirstStep;
