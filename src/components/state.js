import React, { Component } from "react";
import {
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  LinearProgress,
  Tooltip,
  IconButton,
  Grid,
  TextField,
  Select,
  MenuItem
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { green, orange, yellow, lightGreen } from '@material-ui/core/colors';
import { Clear } from "@material-ui/icons";
import { STATE_OPERATORS, STATE_STATUS } from "../constants/customer-form";

class State extends Component {
  state = {
    valueSearch: '',
    select: -1,
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value })
  }

  handleClear = () => {
    this.setState({ valueSearch: '' })
  }

  render() {
    const { classes } = this.props;
    const { valueSearch, select } = this.state;
    return(
      <div className={classes.state}>
        <Paper>
          <Grid container spacing={3}>
          {/* начало строки поиска */}
          <Grid item xs={12} sm={8}>
            <div className={classes.root}>
              <TextField
                value={valueSearch}
                onChange={this.handleChange}
                label='Поиск по спецоператорам'
                name='valueSearch'
                fullWidth
              />
              <IconButton color="primary" aria-label="Directions" onClick={this.handleClear} className={classes.iconButton} size='small'>
                <Clear />
              </IconButton>
            </div>
          </Grid>
          {/* конец строки поиска */}
          {/* начало выпадающий список */}
          <Grid item xs={12} sm={4}>
            <Select
              value={select}
              onChange={this.handleChange}
              name='select'
              inputProps={{
                name: 'select',
                id: 'select-simple',
              }}
              className={classes.select}
              fullWidth
            >
              <MenuItem value={-1}>
                <em>Все статусы</em>
              </MenuItem>
              <MenuItem value={0}>Проведение переговоров</MenuItem>
              <MenuItem value={1}>Доработка ПО, тестирование обмена</MenuItem>
              <MenuItem value={2}>Тестирование обмена</MenuItem>
              <MenuItem value={3}>Промышленная эксплуатация</MenuItem>
            </Select>
          </Grid>
          {/* конец выпадающий список */}
          </Grid>
          <Grid item xs={20} sm={12}>
            <Table className={classes.table}>
              <TableBody>

              {STATE_OPERATORS.map((item, index) => (
                <StateCell item={item} valueSearch={valueSearch} key={index} classes={classes} select={select}/>
              ))}

              </TableBody>
            </Table>
          </Grid>
        </Paper>
      </div>
    )
  }
}

const StateCell = ({ item, valueSearch, index, classes, select }) => {
  const selectIndex = select === -1 ? item.status : select
  const name = item.name
  const indexf = indexfind({valueSearch, name})
  if (indexf !== -1 && item.status === selectIndex)  {
    return (
      <TableRow key={index}>
        <TableCell component="th" scope="row">{item.name}</TableCell>
        <TableCell component="th" scope="row">{STATE_STATUS[item.status].name}</TableCell>
        <Tooltip title={STATE_STATUS[item.status].progress + '%'} placement="top">
          <TableCell component="th" scope="row" className={classes.progress}>
            <Progress step={item.status} variant="determinate" value={STATE_STATUS[item.status].progress}/>
          </TableCell>
        </Tooltip>
      </TableRow>
    );
  } else
    return null
}

const indexfind = ({ valueSearch, name }) => {
  const index = [
    name.indexOf(valueSearch),
    name.indexOf(valueSearch.toUpperCase()),
    name.indexOf(valueSearch.toLowerCase())
  ]
  return Math.max(...index)

}

const Progress = ({ step, variant, value }) => {
  switch (step) {
    case 0:
      return <ProgressFirst variant={variant} value={value} />;
    case 1:
      return <ProgressSecond variant={variant} value={value} />;
    case 2:
      return <ProgressThird variant={variant} value={value} />;
    case 3:
      return <ProgressFourth variant={variant} value={value} />;
  }
}

const ProgressFirst = withStyles({
  colorPrimary: {
    backgroundColor: orange[100],
  },
  barColorPrimary: {
    backgroundColor: orange[500],
  },
})(LinearProgress);

const ProgressSecond = withStyles({
  colorPrimary: {
    backgroundColor: yellow[100],
  },
  barColorPrimary: {
    backgroundColor: yellow[500],
  },
})(LinearProgress);

const ProgressThird = withStyles({
  colorPrimary: {
    backgroundColor: lightGreen[100],
  },
  barColorPrimary: {
    backgroundColor: lightGreen[500],
  },
})(LinearProgress);

const ProgressFourth = withStyles({
  colorPrimary: {
    backgroundColor: green[100],
  },
  barColorPrimary: {
    backgroundColor: green[500],
  },
})(LinearProgress);

const styles = theme => ({
  state: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  progress: {
    width: '150px'
  },
  root: {
   padding: '2px 4px',
   display: 'flex',
   alignItems: 'center',
   height: '17px',
   position: 'relative'
 },
 select: {
   height: '35px',
 },
 table: {
   minWidth: '900px'
 },
 iconButton: {
   position: 'absolute',
   left: '560px',
   top: '5px'
 }
});

export default withStyles(styles)(State);
