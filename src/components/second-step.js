import React from 'react';
import { Typography, Grid, TextField, Divider, Fab, IconButton } from '@material-ui/core';
import { OPERATORS, DEFAULT_OPERATOR, MAX_OPERATORS_COUNT } from '../constants/customer-form';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
//import { ReactComponent } from "*.svg";
import OperatorBlock from './listoperators'

class SecondStep extends React.Component {
  state = {
    operators: this.props.operators,
  };

  handleChange = index => name => e => {
    const operators = this.state.operators;
    operators[index][name] = e.target.value;
    this.setState({
      operators,
    });
  };

  AddNewOperator = () => {
    const {operators} = this.state;
    if (operators.length <= MAX_OPERATORS_COUNT) {
      operators.push({ ...DEFAULT_OPERATOR });
      this.setState({ operators });
    } else alert('Вы можете добавить только 100 операторов');
  };

  DelOperator = index => () => {
    let { operators } = this.state;
    if (operators.length > 1) {
      operators.splice(index, 1);
      this.setState({ operators });
    } else alert('Вы не можете удалить всех операторов!');
  };

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Введите данные операторов
        </Typography>
        {/* <Divider className={useStyles.divider} mb={1}/> */}
        <div>
          {
            this.state.operators.map((item, index) => (
            <OperatorBlock
              actions={{ delOperator: this.DelOperator(index) }}
              index={index}
            />
          ))
        }
        </div>
        <Fab color="primary" title="Добавить оператора" onClick={this.AddNewOperator}>
          +
        </Fab>
      </React.Fragment>
    );
  }
}

const useStyles = makeStyles(theme => ({
  divider: {
    margin: theme.spacing(1, 0, 2, 0),
  },
  button: {
    margin: theme.spacing.unit,
  },
}));

export default SecondStep;
