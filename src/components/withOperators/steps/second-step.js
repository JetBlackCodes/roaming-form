import React, { Component } from "react";
import {
  withStyles,
  StepLabel,
  Step,
  Stepper,
  Grid,
  Button,
  IconButton,
  Card,
  Typography,
  Avatar,
  Chip,
  InputAdornment
} from "@material-ui/core";
import { Delete, AttachFile } from "@material-ui/icons";

import { TextField } from "final-form-material-ui";
import { Field } from "react-final-form";
import { FieldArray } from 'react-final-form-arrays'
import formatStringByPattern from "format-string-by-pattern";
import { SECOND_STATE_OPERATOR } from '../../../constants/customer-form'

class SecondStep extends Component {

  render() {
    const {
      classes,
      values,
      handleBack,
      handleNext,
      receiverList,
      loadSoglash,
      handleDeleteSoglash,
      soglash
    } = this.props;

    const fieldArrayName = 'receiver'

    return (
      <>
        <FieldArray name={fieldArrayName}>
          {({ fields }) => (
            <>
              {fields.map((key, index) => {
                const value = values[fieldArrayName][index]

                let disableKpp = true
                let disable = true
                let typeUL = true
                if (value && value['inn']) {
                  disableKpp = value['inn'].length === 10 ? false : true
                  typeUL = value['inn'].length === 12 ? false : true
                  if (value['inn'].length === 10 || value['inn'].length === 12)
                    disable = false
                  else
                    disable = true
                }

                this.props.submitFinalForm.submit()
                return (
                  <>
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
                            required={!receiverList}
                            disabled={receiverList}
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
                          disabled={disable}
                          component={TextField}
                          name={`${key}.id`}
                          type='text'
                          label='Идентификатор'
                          className={classes.field}
                          parse={parse}
                          InputProps={{
                            startAdornment: <InputAdornment position="start">2AE</InputAdornment>,
                          }}
                        />
                      </Grid>
                    </Card>
                  </>
                )
              })}
              <div className={classes.cardRoot}>
                <Grid item xs={12} sm={12} className={classes.buttonForm}>
                  <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    onClick={() => { if (fields.length <= 100) fields.push({ ...SECOND_STATE_OPERATOR }) }}
                  >
                    Добавить контрагента
                  </Button>
                </Grid>
              </div>
            </>
          )}
        </FieldArray>
      </>
    )
  }
}

const parse = value => {
  const someFormat = formatStringByPattern(
    "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
  );
  let newValue = someFormat(value.toUpperCase());
  return newValue;
};

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  paperPopper: {
    padding: 10,
    background: theme.palette.primary.light,
    color: "#000",
    maxWidth: 800
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  chip: {
    margin: theme.spacing(1),
  },
  field: {
    minHeight: '70px'
  },
  form: {
    width: 600,
    marginTop: 20
  },
  cardRoot: {
    width: '100%',
    margin: 10,
    padding: 10,
    position: 'relative'
  },
  buttonForm: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  delButton: {
    position: 'absolute',
    right: -1,
    top: -1,
    zIndex: 2
  },
  input: {
    display: "none"
  },
  labelChip: {
    width: 100,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  chipSoglash: {
    width: 170
  },
});

export default withStyles(styles)(SecondStep);
