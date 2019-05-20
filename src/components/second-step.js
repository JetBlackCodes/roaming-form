import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { AddButton } from "./buttons";

const currencies = [
  {
    value: "none",
    label: "Выбрать оператора"
  },
  {
    value: "kontur",
    label: "СКБ Контур – 2BM"
  },
  {
    value: "taskom",
    label: "Такском – 2AL"
  },
  {
    value: "synerdocs",
    label: "Synerdocs – 2IG"
  },
  {
    value: "tasknet",
    label: "ТаксНет – 2AK"
  },
  {
    value: "tensor",
    label: "Тензор – 2BE"
  },
  {
    value: "linkservice",
    label: "Линк-Сервис – 2BN"
  },
  {
    value: "niias",
    label: "АО НИИАС – 2JD"
  }
];

class SecondForm extends React.Component {
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Другой оператор
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="ИНН"
              fullWidth
              autoComplete="fname" //?что тут правильно указывать?
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
          <Grid item xs={12}>
            <TextField
              select
              label="Выберете оператора"
              onChange={this.handleChange("currency")}
              SelectProps={{
                native: true,                
              }}
              // helperText="Выберете оператора"
              margin="normal"
              variant="outlined"
              fullWidth
            >
              {currencies.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <AddButton/>
      </React.Fragment>
    );
  }
}

export default SecondForm;
