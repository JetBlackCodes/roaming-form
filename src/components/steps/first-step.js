import React, { Component } from "react";
import {
  withStyles,
  Grid,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Popover,
  Paper,
  Chip,
  Avatar,
  InputAdornment
} from "@material-ui/core";
import { Help, Done, AttachFile } from "@material-ui/icons";
import { UploadButton } from "../upload-button";
import { TextField } from "final-form-material-ui";
import { Field } from "react-final-form";
import formatStringByPattern from "format-string-by-pattern";
import { NameAndFIO } from "../name-and-fio";

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

        <Grid container spacing={1}>
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

          <NameAndFIO value={dataMyOrganisation.radioValue} />

          <Popover
            onClose={this.handlePopoverClose}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "center",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "left"
            }}
          >
            <Paper className={classes.paperPopper}>
              <Typography>
                <b>Астрал отчет:</b> Документооборот - Адресная книга - Данные
                пользователя - Идентификатор
                <br />
                <b>Астрал Онлайн:</b> Личный кабинет - Моя организация - id
                участника
                <br />
                <b>1С-ЭДО:</b> Раздела ЭДО - Профили настроек - Обмен с
                контрагентами
              </Typography>
            </Paper>
          </Popover>

          {/* <IconButton
            aria-label="Delete
            </Paper>
            "
            className={classes.iconButton}
            onClick={this.handlePopoverOpen}
          >
            <Help fontSize="small" />
          </IconButton> */}

          <Grid item xs={12}>
            <Field
              fullWidth
              required
              name="id"
              component={TextField}
              type="text"
              label="Идентификатор"
              parse={parse}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={this.handlePopoverOpen}>
                      <Help fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
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
            <UploadButton upload={upload} />
          </Grid>
          <Chip
            avatar={
              <Avatar>
                <AttachFile />
              </Avatar>
            }
            label={dop_sog.name}
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
  paperPopper: {
    padding: 10,
    background: theme.palette.primary.light,
    color: "#000",
    maxWidth: 800
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
});

export default withStyles(styles)(FirstStep);
