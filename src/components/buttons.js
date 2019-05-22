import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import { Grid } from "@material-ui/core";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  fab: {
    margin: theme.spacing.unit
  }
});

const UploadButton = props => {
  const { classes } = props;
  return (
    <Grid>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button
          fullWidth
          variant="contained"
          component="span"
          className={classes.button}
        >
          Загрузить соглашение о выборе оператора
        </Button>
      </label>
    </Grid>
  );
};

const u = withStyles(styles)(UploadButton);    //вот эта конструкция особенно ТОП
export { u as UploadButton };

export const AddButton = props => {
  return (
    <Grid>      
      <Fab color="primary" onClick={props.AddNewOperator}>+</Fab>               
    </Grid>
  );
};

//некрасиво и не удобно. надо переделать как удаление конкретного элемента, а не последнего.
export const DelButton = props => {
  return (
    <Grid>      
      <Fab color="primary" onClick={props.DelOperator}>-</Fab>               
    </Grid>
  );
};
