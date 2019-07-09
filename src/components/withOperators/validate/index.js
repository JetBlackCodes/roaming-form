export const validate = values => {
  let errors = {};
  let error = "";
  Object.keys(values).forEach(function(key) {
    // sender + receiver

    if ((typeof values[key]) === 'object') {
      values[key].map((item, index) => { // цикл sender or receiver

        Object.keys(item).forEach(keyItem => {
          let value = values[key][index][keyItem]
          let objvalues = values[key][index]

          if (distributor[keyItem]) {
            error = distributor[keyItem]({ value, objvalues });
            if (error) {
              if (!errors[key])
                errors[key] = []
              if (!errors[key][index])
                errors[key][index] = {}
              errors[key][index][keyItem] = error;
            }
          }

        })

      })
    }

  }, values);
  return errors;
};

const validationInn = ({ value, objvalues }) => {
  let inn = "";
  if (isNaN(value)) inn = "Некорректный ИНН";
  if (!value) inn = "Обязательное поле";
  if (value) {
    if (value.length !== 10 && value.length !== 12)
      inn = 'Некорректный ИНН'
  }
  return inn;
};

const validationKpp = ({ value, objvalues }) => {
  let kpp = "";
  if (value && objvalues.inn && objvalues.inn.length === 10) {
    if (value.length !== 9)
      kpp = "Некорректный КПП"
  }
  return kpp;
};

const validationGuid = ({ value, objvalues }) => {
  let id = "";
  if (!value) id = "Обязательное поле";
  if (value && value.length < 39) id = "Некорректный идентификатор";
  if (value && value.length > 3) {
    if (value.substr(0, 3) !== "2AE") id = "Некорректный идентификатор";
  }
  return id;
};

const validationName = ({ value, objvalues }) => {
  let name = "";
  if (objvalues.inn && objvalues.inn.length === 10) {
    if (!value)
      name = "Обязательное поле";
  }
  return name;
};

const validationLastName = ({ value, objvalues }) => {
  let lastname = "";
  if (objvalues.inn && objvalues.inn.length === 12) {
    if (!value)
      lastname = "Обязательное поле";
  }
  return lastname;
};

const validationFirstName = ({ value, objvalues }) => {
  let firstname = "";
  if (objvalues.inn && objvalues.inn.length === 12) {
    if (!value)
      firstname = "Обязательное поле";
  }
  return firstname;
};

const distributor = {
  inn: validationInn,
  kpp: validationKpp,
  id: validationGuid,
  name: validationName,
  lastname: validationLastName,
  firstname: validationFirstName
};
