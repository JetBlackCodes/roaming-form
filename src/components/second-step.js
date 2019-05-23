import React from "react";
import { Typography, Grid, TextField } from "@material-ui/core";
import { AddButton, DelButton } from "./buttons";

import { currencies, DEFAULT_OPERATOR } from "../constants/operators";

const OperatorBlock = props => {
  return (
    <>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="inn"
            label="ИНН"
            fullWidth
            onChange={props.onChange("inn")}
            value={props.inn}
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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="name"
            label="Название организации"
            fullWidth
            onChange={props.onChange}
          />
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
          >
            {currencies.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <div className="deleteButton">
        <DelButton DelOperator={props.actions.delOperator} />
      </div>
    </>
  );
};

class SecondForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      operators: [{ ...DEFAULT_OPERATOR }]
    };
  }

  handleChange = index => name => e => {
    const operators = this.state.operators;
    operators[index][name] = e.target.value;
    this.setState({
      operators
    });
    // const value = e.target.value;
    // console.log(value)
  };

  AddNewOperator = () => {
    if (this.state.operators.length < 101) {
      const newOper = { ...DEFAULT_OPERATOR };
      let operators = this.state.operators;
      operators.push(newOper);
      this.setState({ operators });
    } else alert("Вы можете добавить только 100 операторов");
  };

  DelOperator = index => () => {
    let { operators } = this.state;
    if (operators.length > 1) {
      operators.splice(index, 1);
      this.setState({ operators });
    } else alert("Вы не можете удалить всех операторов!");
  };

  render() {
    // const { operators } = this.state;
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Другой оператор
        </Typography>
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
        <AddButton
          AddNewOperator={this.AddNewOperator}
          // onChange={this.handleChange}
        />
      </React.Fragment>
    );
  }
}

export default SecondForm;
