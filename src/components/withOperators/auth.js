import React, { Component } from "react";
import {
  withStyles,
  Card,
  Button,
  Grid,
} from "@material-ui/core";
import { TextField } from "final-form-material-ui";
import { Field } from "react-final-form";

class Auth extends Component {

  state = {
  };

  render() {
    const { classes, disabled } = this.props
    return(
      <>
        <div className={classes.root}>
          <Card className={classes.card} color='primary'>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <Field
                  required
                  disabled={disabled}
                  fullWidth
                  label='Логин'
                  name='loginAuth'
                  type='text'
                  component={TextField}
                  autoFocus={true}
                  className={classes.field}
                />
              </Grid>
              <Grid item sm={12}>
                <Field
                  required
                  disabled={disabled}
                  fullWidth
                  label='Пароль'
                  type='password'
                  name='passAuth'
                  component={TextField}
                  className={classes.field}
                />
              </Grid>
              <Grid item sm={12}>
                <Button
                  variant="outlined"
                  disabled={disabled}
                  color="primary"
                  className={classes.button}
                  type='submit'
                >
                  Войти
                </Button>
              </Grid>
            </Grid>
          </Card>
        </div>
      </>
    )
  }
}


const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    height: '500px'
  },
  card: {
    flexDirection: 'column',
    width: '300px',
    padding: '20px'
  },
  button: {
    marginTop: '50px',
    width: '100%'
  },
  field: {
    minHeight: '60px',
  }
});

export default withStyles(styles)(Auth);
