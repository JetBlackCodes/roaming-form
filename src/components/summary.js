import React from "react";
import {
  withStyles,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid
} from "@material-ui/core";

const first = [
  { name: "ИНН", expl: "474082674748" },
  { name: "КПП", expl: "873570753" },
  { name: "Наименование организации", expl: "НПО Телеметрия" }, 
  { name: "e-mail", expl: "ms.melnikovairina@gmail.com" },
  { name: "Идентификатор", expl: "7595" }
];

// const second = [
//   { name: "ИНН", expl: "474028894748" },
//   { name: "КПП", expl: "887544456" },
//   { name: "Наименование организации", expl: "ОАО Буханкино" },
//   { name: "Оператор", expl: "Таском - 2AL" }
// ];

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`
  },
  total: {
    fontWeight: "700"
  },
  title: {
    marginTop: theme.spacing.unit * 2
  }
});

class Summary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      operators: this.props.operators
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Оператор ЗАО «Калуга Астрал»
        </Typography>
        <List disablePadding>
          {first.map(first => (
            <ListItem className={classes.listItem} key={first.name}>
              <ListItemText primary={first.name} secondary={first.desc} />
              <Typography variant="body2">{first.expl}</Typography>
            </ListItem>
          ))}
        </List>
        <Grid>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Другие операторы
          </Typography>
          <List disablePadding>
            {this.state.operators.map(item => (
              <ListItem className={classes.listItem}>
                <ListItemText primary={"ИНН"} />
                <Typography variant="body2">{item.inn}</Typography>
                <ListItemText primary={"КПП"} />
                <Typography variant="body2">{item.kpp}</Typography>
                <ListItemText primary={"Название организации"} />
                <Typography variant="body2">{item.name}</Typography>
                <ListItemText primary={"Оператор"} />
                <Typography variant="body2">{item.oper}</Typography>
              </ListItem>
            ))}
            }
            {/* {second.map(second => (
            <ListItem className={classes.listItem} key={second.name}>
              <ListItemText primary={second.name} secondary={second.desc} />
              <Typography variant="body2">{second.expl}</Typography>
            </ListItem>
          ))}           */}
          </List>
        </Grid>
      </React.Fragment>
    );
  }
}

// Summary.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default withStyles(styles)(Summary);
