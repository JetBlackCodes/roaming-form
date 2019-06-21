import React from "react";
import {
  withStyles,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Divider
} from "@material-ui/core";
import { OPERATORS } from "../../constants/customer-form";

class Summary extends React.Component {
  state = {
    operators: this.props.operators,
    dataMyOrganisation: this.props.dataMyOrganisation
  };

  render() {
    const { classes } = this.props;
    const { dataMyOrganisation, operators } = this.state;

    let name = ''
    let disable = true
    if (dataMyOrganisation.lastname && dataMyOrganisation.inn.length === 12) {
      name = `ИП ${dataMyOrganisation.lastname}  ${dataMyOrganisation.firstname}`
      if (dataMyOrganisation.patronymic)
        name += ` ${dataMyOrganisation.patronymic}`
    } else {
      name = dataMyOrganisation.name
    }
    disable = dataMyOrganisation.inn.length === 12 ? true : false

    return (
      <React.Fragment>
        <Typography variant="h6">Проверьте данные вашей организации</Typography>

        <List>

          <ListItem className={classes.onlyForName}>
            <ListItemText primary="Наименование организации" />
            <div className={classes.typ}>
              <Typography variant="body2" align="right">
                {name}
              </Typography>
            </div>
          </ListItem>

          <ListItem className={classes.listItem}>
            <ListItemText primary="ИНН" />
            <Typography variant="body2">{dataMyOrganisation.inn}</Typography>
          </ListItem>

          <Kpp disable={disable} kpp={dataMyOrganisation.kpp} classes={classes} kontr={false} />

          <ListItem className={classes.listItem}>
            <ListItemText primary="Идентификатор" />
            <Typography variant="body2">{dataMyOrganisation.id}</Typography>
          </ListItem>

          <ListItem className={classes.listItem}>
            <ListItemText primary="e-mail" />
            <Typography variant="body2">{dataMyOrganisation.email}</Typography>
          </ListItem>

        </List>

        <Typography variant="h6" gutterBottom className={classes.title}>
          Проверьте данные операторов
        </Typography>

        <Grid>
          {operators.map((item, index) => (
            <List key={index}>

              <Kname operators={operators} index={index} classes={classes} />

              <ListItem className={classes.listItem}>
                <ListItemText primary="ИНН" />
                <Typography variant="body2">{item.inn}</Typography>
              </ListItem>

              <Kpp disable={false} kpp={item.kpp} classes={classes} operators={operators} index={index} kontr={true} />

              <ListItem className={classes.listItem}>
                <ListItemText primary="Оператор" />
                <Typography variant="body2">
                  {OPERATORS.map(value => (
                    <Typography variant="body2">
                      {item.operator === value.value ? value.label : ""}
                    </Typography>
                  ))}
                </Typography>
              </ListItem>
              <Divider />
            </List>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}

const Kpp = (props) => { // попробуем сделать universal
  let { disable, kpp, classes, operators, index, kontr } = props;
  if (kontr) // инициализация КПП для операторов
    disable = operators[index].inn.length === 12 ? true : false
  if (disable === false)
    return (
      <ListItem className={classes.listItem}>
        <ListItemText primary="КПП" />
        <Typography variant="body2">{kpp}</Typography>
      </ListItem>
    )
  else
    return null
}

const Kname = (props) => {
  const { operators, index, classes } = props
  let name = ''
  if (operators[index].inn.length === 10)
    name = operators[index].name
  else {
    name = `ИП ${operators[index].lastname}  ${operators[index].firstname} ${operators[index].patronymic}`
  }
  return (
    <ListItem className={classes.onlyForName}>
      <ListItemText primary="Наименование организации" />
      <div className={classes.typ}>
        <Typography variant="body2" align="right">
          {name}
        </Typography>
      </div>
    </ListItem>
  )
}


const styles = theme => ({
  onlyForName: {
    padding: `${theme.spacing.unit}px 0`,
    height: "auto"
  },
  typ: {
    maxWidth: 270
  },
  listItem: {
    padding: `${theme.spacing.unit}px 0`,
    height: 30
  },
  title: {
    marginTop: theme.spacing.unit * 2
  },
  disable: {
    color: '#333'
  }
});

export default withStyles(styles)(Summary);
