import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Upload } from 'material-ui-upload';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  fab: {
    margin: theme.spacing.unit,
  },
});

const UploadButton = props => {
  const { classes } = props;
  return (
    <>
      <input
        accept="application/pdf"
        className={classes.input}
        id="contained-button-file"
        multiple
        onChange={props.upload}
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button fullWidth variant="contained" component="span" className={classes.button}>
          Загрузить соглашение о выборе оператора
        </Button>
      </label>
    </>
  );
};

export const u = withStyles(styles)(UploadButton);
export { u as UploadButton };
