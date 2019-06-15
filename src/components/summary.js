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
import { OPERATORS } from "../constants/customer-form";

class Summary extends React.Component {
  state = {
    operators: this.props.operators,
    dataMyOrganisation: this.props.dataMyOrganisation
  };  

  render() {
    const { typ, listItem, onlyForName, title } = this.props.classes;
    const { name, inn, kpp, guid, email } = this.state.dataMyOrganisation;
    return (
      <React.Fragment>
        <Typography variant="h6">Проверьте данные вашей организации</Typography>

        <List>
          <ListItem className={onlyForName}>
            <ListItemText primary="Наименование организации" />
            <div className={typ}>
              <Typography variant="body2" align="right">
                {name}
              </Typography>
            </div>
          </ListItem>

          <ListItem className={listItem}>
            <ListItemText primary="ИНН" />
            <Typography variant="body2">{inn}</Typography>
          </ListItem>

          <ListItem className={listItem}>
            <ListItemText primary="КПП" />
            <Typography variant="body2">{kpp}</Typography>
          </ListItem>

          <ListItem className={listItem}>
            <ListItemText primary="Идентификатор" />
            <Typography variant="body2">{guid}</Typography>
          </ListItem>

          <ListItem className={listItem}>
            <ListItemText primary="e-mail" />
            <Typography variant="body2">{email}</Typography>
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom className={title}>
          Проверьте данные операторов
        </Typography>

        <Grid>
          {this.state.operators.map(item => (
            <List>
              <ListItem className={onlyForName}>
                <ListItemText primary="Наименование организации" />
                <div className={typ}>
                  <Typography variant="body2" align="right">
                    {item.name}
                  </Typography>
                </div>
              </ListItem>

              <ListItem className={listItem}>
                <ListItemText primary="ИНН" />
                <Typography variant="body2">{item.inn}</Typography>
              </ListItem>

              <ListItem className={listItem}>
                <ListItemText primary="КПП" />
                <Typography variant="body2">
                  {item.kpp === "" ? "" : `(${item.kpp})`}
                </Typography>
              </ListItem>

              <ListItem className={listItem}>
                <ListItemText primary="Оператор" />
                <Typography variant="body2">
                  {OPERATORS.map(value => (
                    <Typography variant="body2">
                      {item.oper === value.value ? value.label : ""}
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
  }
});

export default withStyles(styles)(Summary);
