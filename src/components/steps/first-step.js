import React, { Component } from "react";
import {
  withStyles,
  Grid,
  Typography,
  IconButton,
  Popover,
  Paper,
  InputAdornment
} from "@material-ui/core";
import { Help } from "@material-ui/icons";
import formatStringByPattern from "format-string-by-pattern";
import { NameAndFIO } from "../name-and-fio";

import { StyledTextField } from "../styled-text-field";

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
      values
    } = this.props;

    let disableKpp = true;
    let disable = true;
    if (values && values.inn) {
      disableKpp = values.inn.length === 10 ? false : true;
      if (values.inn.length === 10 || values.inn.length === 12) disable = false;
    }

    return (
      <>
        <Typography variant="h6" gutterBottom>
          Введите данные вашей организации
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              name="inn"
              label="ИНН"
              parse={formatStringByPattern("999999999999")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              name="kpp"
              label="КПП"
              parse={formatStringByPattern("999999999")}
              disabled={disableKpp}
              required={!disableKpp}
            />
          </Grid>

          <Grid item xs={12}>
            <NameAndFIO inn={values.inn} disable={disable}/>
          </Grid>

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
            <StyledTextField
              name="id"
              label="Идентификатор"
              parse={parse}
              disabled={disable}
              required={!disable}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={this.handlePopoverOpen}>
                      <Help fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
                startAdornment: <InputAdornment position="start">2AE</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledTextField name="email" label="E-mail" type="email" disabled={disable} required={!disable} />
          </Grid>
        </Grid>
      </>
    );
  }
}

const parse = value => {
  const someFormat = formatStringByPattern(
    "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  );
  let newValue = someFormat(value);
  return newValue;
};

const styles = theme => ({
  space: {
    display: "flex",
    justifyContent: "space-around"
  },
  paperPopper: {
    padding: 10,
    background: theme.palette.primary.white,
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
