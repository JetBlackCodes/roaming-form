import React from "react";
import { Typography, Grid, TextField } from "@material-ui/core";
import { AddButton, DelButton } from "./buttons";

const currencies = [
  {
    value: "none",
    label: "-Выбрать оператора-"
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

const OperatorBlock = (props) => {
  return (
    <Grid container spacing={24}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          name="inn"
          label="ИНН"
          fullWidth
          onChange={props.onChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          name="kpp"
          label="КПП"
          fullWidth
          onChange={props.onChange}
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
          // onChange={this.handleChange("currency")}
          SelectProps={{
            native: true
          }}
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
  );
};

class SecondForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      operators: [
        {
          name: "",
          inn: "",
          kpp: "",
          oper: ""
        }
      ]
    };
  }

  handleChange = (name) => e => {       
    this.setState({
      [name]: e.target.value,      
    });
    // const value = e.target.value; 
    // console.log(value)
  };

  AddNewOperator = () => {
    if (this.state.operators.length < 101) {
      const newOper = {
        name: "",
        inn: "",
        kpp: "",
        oper: ""
      };
      let operators = this.state.operators;
      operators.push(newOper);
      this.setState({ operators });
    } else alert("Вы можете добавить только 100 операторов");
  };

  DelOperator = () => {
    if (this.state.operators.length > 1) {
      let operators = this.state.operators;
      operators.pop();
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
          {this.state.operators.map(item => (
            <OperatorBlock
              onChange={this.handleChange}
              name={item.name}
              inn={item.inn}
              kpp={item.kpp}
              oper={item.oper}
            />
          ))}
        </div>
        <AddButton
          AddNewOperator={this.AddNewOperator}
          // onChange={this.handleChange}
        />
        <DelButton DelOperator={this.DelOperator} />
      </React.Fragment>
    );
  }
}

export default SecondForm;
