import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";

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

//я хз как сразу экспортировать констунту со стилями withStyles(styles)(UploadButton)
//мне не нравится синтаксис этой обертки

const UploadButton = props => {
  const { classes } = props;
  return (
    <div>
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
    </div>
  );
};

export default withStyles(styles)(UploadButton);

export const AddButton = props => {
  return <Fab color="primary">+</Fab>;
};
