import React from "react";
import {
  withStyles,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Divider
} from "@material-ui/core";
import { OPERATORS } from "../../constants/customer-form";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class Summary extends React.Component {
  state = {
    operators: this.props.operators,
    dataMyOrganisation: this.props.dataMyOrganisation
  };

  render() {
    const {
      classes,
      receiverList,
      fileReceiver,
      chipReceiverFileName,
      objReceiverList
    } = this.props;
    const { dataMyOrganisation, operators } = this.state;

    let name = "";
    let disable = true;
    if (dataMyOrganisation.lastname && dataMyOrganisation.inn.length === 12) {
      name = `ИП ${dataMyOrganisation.lastname}  ${
        dataMyOrganisation.firstname
      }`;
      if (dataMyOrganisation.patronymic)
        name += ` ${dataMyOrganisation.patronymic}`;
    } else {
      name = dataMyOrganisation.name;
    }
    disable = dataMyOrganisation.inn.length === 12 ? true : false;

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

          <Kpp
            disable={disable}
            kpp={dataMyOrganisation.kpp}
            classes={classes}
            kontr={false}
          />

          <ListItem className={classes.listItem}>
            <ListItemText primary="Идентификатор" />
            <Typography variant="body2">{dataMyOrganisation.id}</Typography>
          </ListItem>

          <ListItem className={classes.listItem}>
            <ListItemText primary="e-mail" />
            <Typography variant="body2">{dataMyOrganisation.email}</Typography>
          </ListItem>
        </List>

        {!fileReceiver && (
          <Typography variant="h6" gutterBottom className={classes.title}>
            Проверьте данные контрагентов
          </Typography>
        )}
        {fileReceiver && (
          <Typography variant="h6" gutterBottom className={classes.title}>
            Вы загрузили список контрагентов файлом
          </Typography>
        )}

        <Grid xs={12}>
          {operators.map((item, index) => (
            <div>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Kname
                    operators={operators}
                    index={index}
                    classes={classes}
                    fileReceiver={fileReceiver}
                  />
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <List className={classes.root} fullWidth>
                    <OperatorList
                      {...item}
                      operators={operators}
                      index={index}
                      classes={classes}
                      receiverList={receiverList}
                      chipReceiverFileName={chipReceiverFileName}
                      objReceiverList={objReceiverList}
                    />
                  </List>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}

const Kpp = props => {
  // попробуем сделать universal
  let { disable, kpp, classes, operators, index, kontr } = props;
  if (kontr)
    // инициализация КПП для операторов
    disable = operators[index].inn.length === 12 ? true : false;
  if (disable === false)
    return (
      <ListItem className={classes.listItem}>
        <ListItemText primary="КПП" />
        <Typography variant="body2">{kpp}</Typography>
      </ListItem>
    );
  else return null;
};
// попробуем сделать universal
const OperatorList = props => {
  const {
    classes,
    receiverList,
    chipReceiverFileName,
    objReceiverList,
    operators,
    kpp,
    index,
    inn,
    operator,
    ...other
  } = props;
  if (receiverList === "") {
    return (
      <Grid container item xs={12}>

          <List key={index} className={classes.root}>

            <ListItem className={classes.listItem}>
              <ListItemText primary="ИНН" />
              <Typography variant="body2">{inn}</Typography>
            </ListItem>

            <Kpp
              disable={false}
              kpp={kpp}
              classes={classes}
              operators={operators}
              index={index}
              kontr={true}
            />

            <ListItem className={classes.listItem}>
              <ListItemText primary="Оператор" />
              <Typography variant="body2">
                {OPERATORS.map(value => (
                  <Typography variant="body2">
                    {operator === value.value ? value.label : ""}
                  </Typography>
                ))}
              </Typography>
            </ListItem>
          </List>
      </Grid>
    );
  } else {
    let size = 0;
    if (receiverList.size > 1048575)
      size = `${~~(receiverList.size / 1048576)}.${receiverList.size %
        1048576}мб`;
    else size = `${~~(receiverList.size / 1024)}.${receiverList.size % 1024}кб`;
    return (
      <>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Название файла" />
          <Typography variant="body2">{chipReceiverFileName}</Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Размер файла" />
          <Typography variant="body2">{size}</Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Всего контрагентов в файле" />
          <Typography variant="body2">{objReceiverList.all}</Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Контрагентов ЮЛ в файле" />
          <Typography variant="body2">{objReceiverList.ul}</Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Контрагентов ИП в файле" />
          <Typography variant="body2">{objReceiverList.ip}</Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Некорректные строки в файле" />
          <Typography variant="body2">{objReceiverList.error}</Typography>
        </ListItem>
      </>
    );
  }
};

const Kname = props => {
  const { operators, index, classes, fileReceiver } = props;
  let name = "";
  if (operators[index].inn.length === 10) name = operators[index].name;
  else {
    if (fileReceiver)
      name = "Список контрагентов файлом"
    else {
      name = `ИП ${operators[index].lastname}  ${operators[index].firstname} `;
      if (operators[index].patronymic)
        name += operators[index].patronymic
    }
  }
  return (
    // <ListItem className={classes.onlyForName}>
    //   {/* <ListItemText primary="Наименование организации" /> */}
    //   <div className={classes.typ}>
    <Typography align="right" className={classes.heading}>
      {name}
    </Typography>
    //   </div>
    // </ListItem>
  );
};

const styles = theme => ({
  // onlyForName: {
  //   padding: theme.spacing(0),
  //   height: "auto"
  // },
  // typ: {
  //   maxWidth: 270
  // },
  // listItem: {
  //   padding: '0px',
  //   height: '10px'
  // },
  // title: {
  //   marginTop: theme.spacing.unit * 2
  // },
  // disable: {
  //   color: "#333"
  // },
  // heading: {
  //   // fontSize: theme.typography.pxToRem(12),
  //   // padding: theme.spacing(0),
  //   // margin: theme.spacing(0),
  //   // minHeight: 20
  //   // fontWeight: theme.typography.fontWeightRegular,
  //   padding: '0px',
  //   height: '10px'
  // },
  root: {
    width: "100%",
    padding: "0px",
    display: "block"
  }
});

export default withStyles(styles)(Summary);
