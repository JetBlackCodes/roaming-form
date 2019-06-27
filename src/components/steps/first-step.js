import React, { Component } from "react";
import {
  withStyles,
  Grid,
  Typography,
  IconButton,
  Popover,
  Paper,
  Chip,
  Avatar,
  InputAdornment,
  FormControl,
  FormHelperText
} from "@material-ui/core";
import { Help, AttachFile } from "@material-ui/icons";
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
      upload,
      values,
      handleDelete
    } = this.props;

    let disable = true
    if (values && values.inn)
      disable = values.inn.length === 10 ? false : true

    return (
      <>
        <Typography variant="h6" gutterBottom>
          Введите данные вашей организации
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Field
                fullWidth
                required
                name="inn"
                component={TextField}
                type="text"
                parse={formatStringByPattern("999999999999")}
                label="ИНН"
                aria-describedby="inn-helper-text"
              />
              <FormHelperText id="inn-helper-text"></FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Field
                fullWidth
                disabled={disable}
                required={!disable}
                name="kpp"
                component={TextField}
                type="text"
                parse={formatStringByPattern("999999999")}
                label="КПП"
                aria-describedby="kpp-helper-text"
              />
              <FormHelperText id="kpp-helper-text"></FormHelperText>
            </FormControl>
          </Grid>

          <NameAndFIO values={values} classes={classes} />

          <Popover
            onClose={this.handlePopoverClose}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
          >
            <Paper className={classes.paperPopper}>
              <Typography>
                <b>Идентификатор - уникальный номер участника ЭДО</b>
                <hr />
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

          <Grid item xs={12}>
            <FormControl fullWidth>
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
                aria-describedby="guid-helper-text"
              />
            <FormHelperText id="guid-helper-text"></FormHelperText>
            </FormControl>
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
          <Files name={dop_sog.name} classes={classes} handleDelete={handleDelete}/>
        </Grid>
      </>
    );
  }
}


const Files = (props) => {
  const { name, handleDelete, classes } = props
  if (name)
    return (
      <Chip
        avatar={ <Avatar> <AttachFile /> </Avatar> }
        label={name}
        className={classes.chip}
        onDelete={handleDelete}
      />
    )
  else
    return null
}

const parse = value => {
  const someFormat = formatStringByPattern(
    "XXXXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
  );
  let newValue = someFormat(value.toUpperCase());
  return newValue;
};

const styles = theme => ({
  space: {
    display: "flex",
    justifyContent: "space-around",
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
  },
  chip: {
    margin: theme.spacing(1),
  },
});

export default withStyles(styles)(FirstStep);
