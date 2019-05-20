import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

const first = [
  { name: "ИНН", expl: "474082674748" },
  { name: "КПП", expl: "873570753" },
  { name: "Наименование организации", expl: "НПО Телеметрия" }, // наименование может быть в кавычках
  { name: "e-mail", expl: "ms.melnikovairina@gmail.com" },
  { name: "Идентификатор", expl: "7595" }
];

const second = [
  { name: "ИНН", expl: "474028894748" },
  { name: "КПП", expl: "887544456" },
  { name: "Наименование организации", expl: "ОАО Буханкино" },
  { name: "Оператор", expl: "Таском - 2AL" }
];

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

function Summary(props) {
  const { classes } = props;
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
          {second.map(second => (
            <ListItem className={classes.listItem} key={second.name}>
              <ListItemText primary={second.name} secondary={second.desc} />
              <Typography variant="body2">{second.expl}</Typography>
            </ListItem>
          ))}          
        </List>
      </Grid>
    </React.Fragment>
  );
}

// Summary.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default withStyles(styles)(Summary);
