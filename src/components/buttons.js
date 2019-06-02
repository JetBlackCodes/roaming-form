import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

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
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
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
