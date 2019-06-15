import React, { Component, Fragment } from "react";
import {
  withStyles,
  Grid,
  Typography,
  Checkbox,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Popover,
  Paper,
  Fade,
  Chip,
  Avatar
} from "@material-ui/core";
import { Help, Done, AttachFile } from "@material-ui/icons";
import { UploadButton } from "./buttons";
import { TextField } from "final-form-material-ui";

import { Field } from "react-final-form";
import formatStringByPattern from "format-string-by-pattern";
import purple from "@material-ui/core/colors/purple";

import Name from "./name";
class FirstStep extends Component {
  state = {
    anchorEl: null
  };

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const {
      classes,
      handleChangeRadio,
      dataMyOrganisation,
      disableKpp,
      dop_sog,
      upload
    } = this.props;
    return (
      <>
        <Typography variant="h6" gutterBottom>
          Введите данные вашей организации
        </Typography>

        <RadioGroup
          aria-label="position"
          name="radioValue"
          value={dataMyOrganisation.radioValue}
          onChange={handleChangeRadio}
          row
          required
          className={classes.radioGroup}
        >
          <FormControlLabel
            value="UL"
            control={<Radio color="primary" />}
            label="Юридическое лицо"
          />
          <FormControlLabel
            value="IP"
            control={<Radio color="primary" />}
            label="Индивидуальный предприниматель"
          />
        </RadioGroup>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Field
              fullWidth
              required
              name="inn"
              component={TextField}
              type="text"
              parse={formatStringByPattern("999999999999")}
              label="ИНН"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              fullWidth
              disabled={disableKpp}
              required={!disableKpp}
              name="kpp"
              component={TextField}
              type="text"
              parse={formatStringByPattern("999999999")}
              label="КПП"
            />
          </Grid>

          <Name value={dataMyOrganisation.radioValue} />
          <Popper
            open={open}
            anchorEl={anchorEl}
            placement={placement}
            transition
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper className={classes.paperPopper}>
                  <Typography>
                    <b>Астрал отчет:</b> Документооборот - Адресная книга -
                    Данные пользователя - Идентификатор
                    <br />
                    <b>Астрал Онлайн:</b> Личный кабинет - Моя организация - id
                    участника
                    <br />
                    <b>1С-ЭДО:</b> Раздела ЭДО - Профили настроек - Обмен с
                    контрагентами
                  </Typography>
                </Paper>
              </Fade>
            )}
          </Popper>

          <IconButton
            aria-label="Delete"
            className={classes.iconButton}
          >
            onClick={this.handlePopoverOpen}
            <Help fontSize="small" />
          </IconButton>

          <Grid item xs={11}>
            <Field
              fullWidth
              required
              name="id"
              component={TextField}
              type="text"
              label="Идентификатор"
              parse={parse}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              fullWidth
              required
              name="email"
              component={TextField}
              type="email"
              label="E-mail"
            />
          </Grid>
          <Grid item xs={12}>
            <UploadButton upload={upload}/>
          </Grid>
          <Chip
            avatar={<Avatar><AttachFile/></Avatar>}
            label={ dop_sog.name }
            deleteIcon={<Done />}
         />
        </Grid>
      </>
    );
  }
}

const parse = value => {
  const someFormat = formatStringByPattern(
    "XXXXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
  );
  let newValue = someFormat(value.toUpperCase());
  return newValue;
};

const styles = theme => ({
  radioGroup: {
    display: "flex",
    justifyContent: "space-around"
  },
  iconButton: {
    width: 45,
    height: 45,
    marginTop: 20
  },
  paperPopper: {
    padding: 5,
    background: "rgba(255,36,0,0.8)",
    color: "#ffffff"
  }
});

export default withStyles(styles)(FirstStep);
