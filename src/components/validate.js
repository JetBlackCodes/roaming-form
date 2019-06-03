export const validate = radioValue => values => {
  let errors = {};

  errors['inn'] = validationInn({ values, radioValue })
  errors['kpp'] = validationKpp({ values, radioValue })
  errors['email'] = validationEmail({ values })
  errors['guid'] = validationGuid({ values })
  errors['name'] = validationName({ values })

  return errors;
};

const validationInn = ({ values, radioValue }) => {
  let inn = ''
  if (isNaN(values.inn))
    inn = 'Некорректный ИНН'
  if (!values.inn)
    inn = 'Обязательное поле';
  if (values.inn){
    if (radioValue === 'UL' && values.inn.length !== 10)
      inn = 'Некорректный ИНН'
    else if (radioValue !== 'UL' && values.inn.length !== 12)
      inn = 'Некорректный ИНН'
  }
  return inn
}

const validationKpp = ({ values, radioValue }) => {
  let kpp = ''
  if (!values.kpp && radioValue === 'UL')
    kpp = 'Обязательное поле';
  if (values.kpp && values.kpp.length !== 9)
    kpp = 'Некорректный КПП'
  return kpp
}

const validationEmail = ({ values }) => {
  let email = ''
  if (!values.email)
    email = 'Обязательное поле';
  if (values.email) {
    let emailValid = values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (!emailValid)
      email = 'Некорректный e-mail'
  }
  return email
}

const validationGuid = ({ values }) => {
  let guid = ''
  if (!values.guid)
    guid = 'Обязательное поле';
  if (values.guid && values.guid.length < 39)
    guid = 'Некорректный идентификатор'
  if (values.guid && values.guid.length > 3) {
    if (values.guid.substr(0, 3) !== '2AE')
      guid = 'Некорректный идентификатор'
  }
  return guid
}

const validationName = ({ values }) => {
  let name = ''
  if (!values.name) {
    name = 'Обязательное поле';
  }
  return name
}
