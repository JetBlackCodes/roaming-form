export const validate = radioValue => values => {
  let errors = {};
  // values = upperCaseGuid(values)
  errors = validationInn({values, errors, radioValue})
  errors = validationKpp({values, errors, radioValue})
  errors = validateEmail({values, errors})
  errors = validateGuid({values, errors})
  if (!values.name) {
    errors.name = 'Обязательное поле';
  }
  return errors;
};

const validationInn = ({values, errors, radioValue}) => {
  // переписать с учетом прихода radioValue
  if (isNaN(values.inn))
    errors.inn = 'Некорректный ИНН'
  if (!values.inn)
    errors.inn = 'Обязательное поле';
  if (values.inn){
    if (radioValue === 'UL' && values.inn.length !== 10)
      errors.inn = 'Некорректный ИНН'
    else if (radioValue !== 'UL' && values.inn.length !== 12)
      errors.inn = 'Некорректный ИНН'
  }
  return errors
}

const validationKpp = ({values, errors, radioValue}) => {
  if (!values.kpp && radioValue === 'UL')
    errors.kpp = 'Обязательное поле';
  if (values.kpp && values.kpp.length !== 9)
    errors.kpp = 'Некорректный КПП'
  return errors
}

const validateEmail = ({values, errors}) => {
  if (!values.email)
    errors.email = 'Обязательное поле';
  if (values.email) {
    let emailValid = values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (!emailValid)
      errors.email = 'Некорректный e-mail'
  }
  return errors
}

const validateGuid = ({values, errors}) => {

  if (!values.guid)
    errors.guid = 'Обязательное поле';
  if (values.guid && values.guid.length < 39)
    errors.guid = 'Некорректный идентификатор'
  if (values.guid && values.guid.length > 3) {
    if (values.guid.substr(0, 3) !== '2AE')
      errors.guid = 'Некорректный идентификатор'
  }
  return errors
}
//
// const upperCaseGuid = values => {
//   if (values.guid)
//     values.guid = values.guid.toUpperCase()
//   return values
// }
