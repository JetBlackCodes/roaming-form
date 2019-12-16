import React, { Component } from "react";
import {
  withStyles,
  Grid,
  Button,
  Card,
  IconButton,
  InputAdornment
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import { TextField } from "final-form-material-ui";
import { Field } from "react-final-form";
import { FieldArray } from 'react-final-form-arrays'
import formatStringByPattern from "format-string-by-pattern";

class FirstStep extends Component {

  render() {
    const {
      classes,
      values,
      senderList
    } = this.props;

    const fieldArrayName = 'sender'

    return (
      <>
        <FieldArray name={fieldArrayName}>
          {({ fields }) => (
            <>
              {fields.map((key, index) => {
                let value = ''
                if (values && values[fieldArrayName])
                  value = values[fieldArrayName][index]

                let disableKpp = true
                let disable = true
                let typeUL = true
                let disableNumber = true
                if (value && value['inn']) {
                  disableKpp = value['inn'].length === 10 ? false : true
                  typeUL = value['inn'].length === 12 ? false : true
                  if (value['inn'].length === 10 || value['inn'].length === 12)
                    disable = false
                  else
                    disable = true
                }
                if (value && value['id'] && value['id'].length > 3) {
                  let subValue = value['id'].substr(0, 3)
                  if (subValue === '2AK' || subValue === '2BE' || subValue === '2BM')
                    disableNumber = false
                }

                this.props.submitFinalForm.submit()
                return (
                  <>
                    <Field
                      fullWidth
                      required={false}
                      component={TextField}
                      name="request_id"
                      type='text'
                      label='Идентификатор заявки в системе роумингового оператора'
                      className={classes.requestIDfield}
                    />
                    <Card className={classes.cardRoot}>

                      <IconButton
                        className={classes.delButton}
                        onClick={() => { if (fields.length > 1) fields.remove(index) }}
                      >
                        <Delete />
                      </IconButton>

                      <Grid container spacing={1}> {/* GRID for inn + KPP */}
                        <Grid item xs={12} sm={6}>
                          <Field
                            fullWidth
                            required={!senderList}
                            disabled={senderList}
                            component={TextField}
                            name={`${key}.inn`}
                            type='text'
                            label='ИНН'
                            parse={formatStringByPattern("999999999999")}
                            className={classes.field}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            fullWidth
                            required={!disableKpp}
                            disabled={disableKpp}
                            component={TextField}
                            name={`${key}.kpp`}
                            type='text'
                            label='КПП'
                            parse={formatStringByPattern("999999999")}
                            className={classes.field}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        {typeUL &&
                          <Field
                            fullWidth
                            required={!disable}
                            disabled={disable}
                            component={TextField}
                            name={`${key}.name`}
                            type='text'
                            label='Название организации'
                            className={classes.field}
                          />
                        }
                        {!typeUL &&
                          <>
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={4}>
                                <Field
                                  fullWidth
                                  required={!disable}
                                  disabled={disable}
                                  component={TextField}
                                  name={`${key}.lastname`}
                                  type='text'
                                  label='Фамилия'
                                  className={classes.field}
                                />
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Field
                                  fullWidth
                                  required={!disable}
                                  disabled={disable}
                                  component={TextField}
                                  name={`${key}.firstname`}
                                  type='text'
                                  label='Имя'
                                  className={classes.field}
                                />
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Field
                                  fullWidth
                                  disabled={disable}
                                  component={TextField}
                                  name={`${key}.patronymic`}
                                  type='text'
                                  label='Отчество'
                                  className={classes.field}
                                />
                              </Grid>
                            </Grid>
                          </>
                        }
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Field
                          fullWidth
                          required={!disable}
                          disabled={disable}
                          component={TextField}
                          name={`${key}.id`}
                          type='text'
                          label='Идентификатор'
                          className={classes.field}
                          parse={parse}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        {!disableNumber &&
                          <Field
                            fullWidth
                            disabled={disable}
                            required={!disable}
                            component={TextField}
                            name={`${key}.number`}
                            type='text'
                            label='Номер заявки'
                            parse={formatStringByPattern("999999")}
                            className={classes.field}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">O-</InputAdornment>,
                            }}
                          />
                        }
                      </Grid>
                    </Card>
                  </>
                )
              })}
              <Grid item xs={12} sm={12} className={classes.buttonForm}>
                <Button
                  variant='contained'
                  color='primary'
                  size='small'
                  onClick={() => fields.push()}
                >
                  Добавить контрагента
                  </Button>
              </Grid>
            </>
          )}
        </FieldArray>
      </>
    )
  }
}

const parse = value => {
  const someFormat = formatStringByPattern(
    "XXXXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
  );
  let newValue = someFormat(value.toUpperCase());
  return newValue;
};

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  field: {
    minHeight: '70px'
  },
  requestIDfield: {
    minHeight: '70px',
    marginLeft: '5px',
  },
  form: {
    width: 600,
    marginTop: 20
  },
  cardRoot: {
    marginTop: "8px",
    marginBottom: "8px",
    maxWidth: "610px",
    padding: "10px",
    position: "relative",
    marginLeft: "8px"
  },
  buttonForm: {
    margin: "8px"
  },
  delButton: {
    position: 'absolute',
    right: -1,
    top: -1,
    zIndex: 2
  },
});

export default withStyles(styles)(FirstStep);
