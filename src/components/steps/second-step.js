import React from "react";
import {
  Typography,
  Divider,
  Button
} from "@material-ui/core";
import {
  DEFAULT_OPERATOR,
  MAX_OPERATORS_COUNT
} from "../../constants/customer-form";
import { makeStyles } from "@material-ui/core/styles";
import OperatorBlock from "../operator-block";

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

  AddNewOperator = () => {
    const { operators } = this.state;
    if (operators.length <= MAX_OPERATORS_COUNT) {
      operators.push({ ...DEFAULT_OPERATOR });
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
    const { values } = this.props
    return (
      <>
        <Typography variant="h6" gutterBottom>
          Введите данные операторов
        </Typography>
        <Divider className={useStyles.divider} mb={1}/>
        <div style={{position: "relative"}}>
          {this.state.operators.map((item, index) => (
            <OperatorBlock
              actions={{ delOperator: this.DelOperator(index) }}
              index={index}
              value={values}
            />
          ))}
        </div>
        <Button
          onClick={this.AddNewOperator}
          variant="contained"
          color="primary"
          className="addButton"
          // className={useStyles.addButton}             
        >
          Добавить оператора
        </Button>
      </>
    );
  }
}

const useStyles = makeStyles(theme => ({
  divider: {
    margin: theme.spacing(1, 0, 2, 0)
  },
  button: {
    margin: theme.spacing.unit
  },
  // addButton: {
  //   position: "absolute",
  //   bottom: "-57px",      
  // }   
}));

export default SecondStep;
