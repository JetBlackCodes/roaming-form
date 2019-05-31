import React, { Component, Fragment } from "react";
import { Grid, Typography, TextField } from "@material-ui/core";
import { UploadButton } from "./buttons";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { Field } from "react-final-form";
import { Checkbox, Select } from "final-form-material-ui";

import {
  composeValidators,
  maxLength,
  require,
  minLength
} from "../utils/validation";

class FirstStep extends Component {
  state = {
    inn: this.props.dataMyOrganisation.inn,
    kpp: this.props.dataMyOrganisation.kpp,
    name: this.props.dataMyOrganisation.name,
    guid: this.props.dataMyOrganisation.guid,
    email: this.props.dataMyOrganisation.email,
    dop_sog: this.props.dataMyOrganisation.dop_sog,

    radioValue: "UL",
    disableKpp: false,

    errorInn: false,
    errorKpp: false,
    errorName: false,
    errorGuid: false,
    errorEmail: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      disableKpp: event.target.value === "UL" ? false : true
    });
  };

  stat = () => {
    console.log(this.props);
    console.log(this.state);
  };

  render() {
    return (
      <>
        <Typography variant="h6" gutterBottom>
          Введите данные вашей организации
        </Typography>

        <RadioGroup
          aria-label="position"
          name="radioValue"
          value={this.state.radioValue}
          onChange={this.handleChange}
          row
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <FormControlLabel
            value="UL"
            control={<Radio color="primary" />}
            label="Юридическое лицо"
          />
          <FormControlLabel
            value="IP"
            control={<Radio color="primary" />}
            label="ИП"
          />
          <FormControlLabel
            value="FL"
            control={<Radio color="primary" />}
            label="Физическое лицо"
          />
        </RadioGroup>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Field
              component={({
                input: { onChange, name, value, onBlur, onFocus },
                meta: { error, touched },
                ...props
              }) => {
                return (
                  <TextField
                    {...props}
                    name={name}
                    error={!!error && touched}
                    helperText={touched && error}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    value={value}
                  />
                );
              }}
              required
              error={this.props.error.errorInn}
              id=""
              label="ИНН"
              fullWidth
              name="inn"
              validate={composeValidators(
                require,
                maxLength(12),
                minLength(10)
              )}
              value={this.state.inn}
              // onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled={this.state.disableKpp === false ? false : true}
              required
              error={this.props.error.errorKpp}
              label="КПП"
              fullWidth
              name="kpp"
              value={this.state.kpp}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              error={this.props.error.errorName}
              label="Название организации"
              fullWidth
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              error={this.props.error.errorGuid}
              label="Идентификатор"
              fullWidth
              name="guid"
              value={this.state.guid}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              error={this.props.error.errorEmail}
              label="e-mail"
              fullWidth
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <UploadButton />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default FirstStep;
