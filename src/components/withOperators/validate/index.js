export const validate = values => {
  let errors = {};
  let error = "";
  Object.keys(values).forEach(function(key) {
    // sender + receiver
    if (key === 'sender' || key === 'receiver') {
      // if object value from operators
      values[key].map((item, index) => { // цикл sender or receiver

        if ((typeof values[key][index]) === 'object') {
          // easy check
          Object.keys(values[key][index]).forEach(keyItem => {
            // need object
            let value = values[key][index][keyItem] // value
            let objvalues = values[key][index] // object
            let type = key // name global object example: sender, receiver

            if (distributor[keyItem]) {
              error = distributor[keyItem]({ value, objvalues, type }); //
              if (error) { // if error value
                if (!errors[key]) errors[key] = []
                if (!errors[key][index]) errors[key][index] = {}
                errors[key][index][keyItem] = error;
              }
            }
          })
        }
      })      
    }
  }, values);
  return errors;
};

const validationInn = ({ value, objvalues, type }) => {
  let inn = "";
  if (isNaN(value)) inn = "Некорректный ИНН";
  if (!value) inn = "Обязательное поле";
  if (value) {
    if (value.length !== 10 && value.length !== 12)
      inn = 'Некорректный ИНН'
  }
  return inn;
};

const validationKpp = ({ value, objvalues, type }) => {
  let kpp = "";
  if (objvalues.inn && objvalues.inn.length === 10) {
    if (!value) kpp = "Обязательное поле"
    if (value && value.length < 9) kpp = "Некорректный КПП"
  }
  return kpp;
};

const validationGuid = ({ value, objvalues, type }) => {
  let id = "";
  if (objvalues.inn && (objvalues.inn.length === 10 || objvalues.inn.length === 12) && !value)
    id = type === 'sender' ? "Обязательное поле" : '';
  if (value && value.length < 36) id = "Некорректный идентификатор";
  return id;
};

// const validationGuidOfAbonent = ({ value, objvalues, type }) => {
//   let id = "";
//   if (objvalues.inn && (objvalues.inn.length === 10 || objvalues.inn.length === 12) && !value)
//     id = type === 'sender' ? "Обязательное поле" : '';
//   if (value && value.length < 4 && value.length > 46) id = "Некорректный идентификатор";
//   return id;
// };

const validationName = ({ value, objvalues, type }) => {
  let name = "";
  if (objvalues.inn && objvalues.inn.length === 10 && !value)
    name = "Обязательное поле";
  return name;
};

const validationLastName = ({ value, objvalues, type }) => {
  let lastname = "";
  if (objvalues.inn && objvalues.inn.length === 12 && !value)
    lastname = "Обязательное поле";
  return lastname;
};

const validationFirstName = ({ value, objvalues, type }) => {
  let firstname = "";
  if (objvalues.inn && objvalues.inn.length === 12 && !value)
    firstname = "Обязательное поле";
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
