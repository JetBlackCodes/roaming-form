export const validate = radioValue => values => {
  let errors = {};
  let error = "";
  Object.keys(values).forEach(function(key) {
    let value = this[key];
    if (distributor[key]) {
      error = distributor[key]({ value, radioValue });
      if (error) errors[key] = error;
    }
  }, values);
  return errors;
};

const validationInn = ({ value, radioValue }) => {
  let inn = "";
  if (isNaN(value)) inn = "Некорректный ИНН";
  if (!value) inn = "Обязательное поле";
  if (value) {
    if (value.length !== 10 && value.length !== 12)
      inn = 'Некорректный ИНН'
  }
  return inn;
};

const validationKpp = ({ value, radioValue }) => {
  let kpp = "";
  if (!value && radioValue === "UL") kpp = "Обязательное поле";
  if (value && value.length !== 9) kpp = "Некорректный КПП";
  return kpp;
};

const validationEmail = ({ value }) => {
  let email = "";
  if (!value) email = "Обязательное поле";
  if (value) {
    let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (!emailValid) email = "Некорректный e-mail";
  }
  return email;
};

const validationGuid = ({ value }) => {
  let id = "";
  if (!value) id = "Обязательное поле";
  if (value && value.length < 39) id = "Некорректный идентификатор";
  if (value && value.length > 3) {
    if (value.substr(0, 3) !== "2AE") id = "Некорректный идентификатор";
  }
  return id;
};

const validationName = ({ value }) => {
  let name = "";
  if (!value) name = "Обязательное поле";
  return name;
};

const distributor = {
  inn: validationInn,
  kpp: validationKpp,
  email: validationEmail,
  id: validationGuid,
  name: validationName
};
