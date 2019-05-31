import React from "react";
import {
  withStyles,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
  IconButton,
  Tooltip
} from "@material-ui/core";
import {Delete, Edit } from '@material-ui/icons';

import { OPERATORS } from "../constants/customer-form"

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
  },
  grid: {
    marginTop: '25px'
  },
  gridButton: {
    marginTop: '-10px',
    textAlign: 'center'
  },
  listName: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  gridOperName: {
    minHeight: '30px',
  },
  gridOperInn: {
    minHeight: '30px'
  }
});

class Summary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      operators: this.props.operators,
      dataMyOrganisation: this.props.dataMyOrganisation
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Проверьте данные вашей организации
        </Typography>
        <List disablePadding>

          <ListItem className={classes.listItem}>
            <ListItemText primary="ИНН"/>
            <Typography variant="body2">{this.state.dataMyOrganisation.inn}</Typography>
          </ListItem>

          <ListItem className={classes.listItem}>
            <ListItemText primary="КПП"/>
            <Typography variant="body2">{this.state.dataMyOrganisation.kpp}</Typography>
          </ListItem>

          <ListItem className={classes.listItem}>
            <ListItemText primary="Наименование организации"/>
            <Typography variant="body2">{this.state.dataMyOrganisation.name}</Typography>
          </ListItem>

          <ListItem className={classes.listItem}>
            <ListItemText primary="e-mail"/>
            <Typography variant="body2">{this.state.dataMyOrganisation.email}</Typography>
          </ListItem>

          <ListItem className={classes.listItem}>
            <ListItemText primary="Идентификатор"/>
            <Typography variant="body2">{this.state.dataMyOrganisation.guid}</Typography>
          </ListItem>

        </List>
        <Grid>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Проверьте данные операторов
          </Typography>
          <List disablePadding className={classes.listName}>
            <ListItemText primary={"ИНН/КПП"} />
            <ListItemText primary={"Оператор"} />
            <ListItemText primary={"Действие"} />
          </List>

          <Grid container spacing={1}>

            {this.state.operators.map(item => (

              <Grid container item xs={12} spacing={3} className={classes.grid}>
                <React.Fragment>
                  <Grid item xs={4}>
                    <Paper className={classes.gridOperName}>{item.inn} {item.kpp === '' ? '' : `(${item.kpp})`}</Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper className={classes.gridOperInn}>
                      {OPERATORS.map(value => (
                        <Typography variant="body2">{item.oper === value.value ? value.label : ''}</Typography>
                      ))}
                    </Paper>
                  </Grid>
                  <Grid item xs={4} className={classes.gridButton}>

                    <React.Fragment>

                      <Tooltip title="Редактировать" placement="top">
                        <IconButton aria-label="Delete" className={classes.margin}>
                          <Edit fontSize="small" alt="alt" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Удалить" placement="top">
                        <IconButton aria-label="Delete" className={classes.margin}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>

                    </React.Fragment>

                  </Grid>
                </React.Fragment>
              </Grid>

            ))}

          </Grid>

        </Grid>
      </React.Fragment>
    );
  }
}

// Summary.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default withStyles(styles)(Summary);
