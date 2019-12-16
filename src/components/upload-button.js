import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    background: "#fff",
    '&:hover': {
      background: theme.palette.primary.main,
      color: '#fff'
    }
  },
  input: {
    display: "none"
  },
});

const UploadButton = props => {
  const { classes, upload } = props;
  return (
    <>
      <input
        accept="application/pdf"
        className={classes.input}
        id="contained-button-file"
        onChange={upload}
        type="file"
        value=''
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
    </>
  );
};

export const u = withStyles(styles)(UploadButton);
export { u as UploadButton };
