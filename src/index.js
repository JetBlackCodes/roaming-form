import React from "react";
import ReactDOM from "react-dom";
import Checkout from "./components/checkout";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#fff",
      main: purple[800],
      dark: purple[900],
      contrastText: '#fff',
    },
    spacing: 6
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Checkout />
  </MuiThemeProvider>,
  document.getElementById("root")
);
