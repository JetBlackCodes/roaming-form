import React, {Component, Fragment} from "react";
import { Grid, Typography, TextField } from "@material-ui/core";
import {UploadButton} from "./buttons";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class FirstStep extends Component{
  state = {
    inn: this.props.dataMyOrganisation.inn,
    kpp: this.props.dataMyOrganisation.kpp,
    name: this.props.dataMyOrganisation.name,
    guid: this.props.dataMyOrganisation.guid,
    email: this.props.dataMyOrganisation.email,
    dop_sog: this.props.dataMyOrganisation.dop_sog,

    radioValue:'FL',
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  stat = () => {
    console.log(this.props)
    console.log(this.state)
  }

  render() {
    return (
      <>
        <Typography variant="h6" gutterBottom>
          Введите данные вашей организации
        </Typography>

        <RadioGroup
          aria-label="position"
          name="position"
          value={this.state.value}
          onChange={this.handleChange}
          row
        >          
          <FormControlLabel
            value="FL"
            control={<Radio color="primary"/>}
            label="Физическое лицо"
          />
          <FormControlLabel
            value="UL"
            control={<Radio color="primary"/>}
            label="Юридическое лицо"
          />
          <FormControlLabel
            value="IP"
            control={<Radio color="primary"/>}
            label="ИП"
          />
        </RadioGroup>

        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              number
              id=""
              label="ИНН"
              fullWidth
              name="inn"
              value={this.state.inn}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              number
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
    )
  }
}

export default FirstStep;