import React from "react";
import {
  Typography,
  Grid,
  TextField,
  Divider,
  IconButton
} from "@material-ui/core";
import {
  OPERATORS,
  DEFAULT_OPERATOR,
  MAX_OPERATORS_COUNT
} from "../constants/customer-form";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
//import { ReactComponent } from "*.svg";

class SecondStep extends React.Component {
  state = {
    operators: this.props.operators
  };

  handleChange = index => name => e => {
    const operators = this.state.operators;
    operators[index][name] = e.target.value;
    this.setState({
      operators
    });
  };

  

  DelOperator = index => () => {
    let { operators } = this.state;
    if (operators.length > 1) {
      operators.splice(index, 1);
      this.setState({ operators });
    } else alert("Вы не можете удалить всех операторов!");
  };

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Введите данные операторов
        </Typography>
        {/* <Divider className={useStyles.divider} mb={1}/> */}
        <div>
          {this.state.operators.map((item, index) => (
            <OperatorBlock
              onChange={this.handleChange(index)}
              name={item.name}
              inn={item.inn}
              kpp={item.kpp}
              oper={item.oper}
              actions={{ delOperator: this.DelOperator(index) }}
            />
          ))}
        </div>        
      </React.Fragment>
    );
  }
}

const useStyles = makeStyles(theme => ({
  divider: {
    margin: theme.spacing(1, 0, 2, 0)
  }
}));

const OperatorBlock = props => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} sm={11}>
        <TextField
          required
          name="name"
          label="Название организации"
          fullWidth
          onChange={props.onChange}
          autoComplete="off"
        />
      </Grid>
      <Grid item xs={12} sm={1}>
        <IconButton
          className={classes.button}
          color="primary"
          onClick={props.actions.delOperator}
          title="Удалить оператора"
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="inn"
            label="ИНН"
            fullWidth
            onChange={props.onChange("inn")}
            value={props.inn}
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="kpp"
            label="КПП"
            fullWidth
            onChange={props.onChange("kpp")}
            value={props.kpp}
            autoComplete="off"
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextField
          select
          name="oper"
          label="Выберете оператора"
          onChange={props.onChange("oper")}
          value={props.oper}
          margin="normal"
          variant="outlined"
          fullWidth
          autoComplete="off"
        >
          {OPERATORS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <Divider className={classes.divider} />
      </Grid>
    </Grid>
  );
};

export default SecondStep;
