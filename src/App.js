import React, {Component} from 'react';
import Checkout from './components/checkout'
import State from './components/state'
import WithOperators from './components/withOperators/index'

import { Paper, Tab, Tabs } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {Person, Business, SignalCellularAlt } from '@material-ui/icons';

const getStepContent = (numPage) => {
  switch (numPage) {
    case 0:
      return (
        <Checkout/>
      );
    case 1:
      return <WithOperators />
    case 2:
      return <State />
    default:
      throw new Error("Unknown step");
  }
};

class App extends Component {

  state = {
    value: 1,
  }

  handleChange = value => event => {
    this.setState({
      value: parseInt(value),
    });
  }

  render(){
    const { value } = this.state;
    const { classes } = this.props;

    return (
      <>
        <Paper square>
          <Tabs
            value={value}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab icon={<Person />} label="Клиентам" value={0} onClick={this.handleChange('0')}/>
            <Tab icon={<Business />} label="Операторам" value={1} onClick={this.handleChange('1')}/>
            <Tab icon={<SignalCellularAlt />} label="Состояние роуминга" value={2} onClick={this.handleChange('2')}/>
          </Tabs>
        </Paper>
        {getStepContent(value)}
      </>
    );
  }
}

const styles = theme => ({
  root: {

  }
});

export default withStyles(styles)(App);
