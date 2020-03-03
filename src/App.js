import React, { Component } from "react";
import Checkout from "./components/checkout";
import State from "./components/state";
import WithOperators from "./components/withOperators/index";

import { Paper, Tab, Tabs, Typography } from "@material-ui/core";
import { Person, Business, SignalCellularAlt } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";

const getStepContent = numPage => {
  switch (numPage) {
    case 0:
      return <Checkout />;
    case 1:
      return <WithOperators />;
    case 2:
      return <State />;
    default:
      throw new Error("Unknown step");
  }
};

class App extends Component {
  state = {
    value: 0,
    isOpen: true
  };

  handleChange = value => event => {
    this.setState({
      value: parseInt(value)
    });
  };

  handleClose = event => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    const { value } = this.state;

    return (
      <>
        <Paper square>
          <Tabs
            value={value}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              icon={<Person />}
              label="Клиентам"
              value={0}
              onClick={this.handleChange("0")}
            />
            <Tab
              icon={<Business />}
              label="Операторам"
              value={1}
              onClick={this.handleChange("1")}
            />
            <Tab
              icon={<SignalCellularAlt />}
              label="Состояние роуминга"
              value={2}
              onClick={this.handleChange("2")}
            />
          </Tabs>
        </Paper>
        {this.state.isOpen && (
          <Paper
            style={{
              margin: "20px",
              padding: "20px",
              position: "fixed",
              bottom: "0",
              width: "20%",
              zIndex: "1"
            }}
          >
            <IconButton
              aria-label="Delete"
              style={{ position: "absolute", right: "0", top: "0" }}
              onClick={this.handleClose}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <Typography variant="subtitle1" color="primary" >Уважаемые абоненты!</Typography>
            <Typography variant="subtitle2" color="primary">
              Обращаем Ваше внимание, что срок на настройку роуминга между
              операторами АО Калуга Астрал и СКБ Контур временно увеличен в
              связи с техническими работами.
            </Typography>
            <Typography variant="subtitle2" color="primary">
              Приносим извинения за предоставленные неудобства.
            </Typography>
          </Paper>
        )}
        {getStepContent(value)}
      </>
    );
  }
}

export default App;
