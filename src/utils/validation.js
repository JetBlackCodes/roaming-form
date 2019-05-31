export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

export const maxLength  = (maxCount) => (str) => {
    if(str.length > maxCount) {
        return "Количество символов превышает";
    }else {
        return undefined;
    }
}

export const require = (str) => {
    if(!str) {
        return "Поле обязательно";
    } else {
        return undefined;
    }
}

export const minLength  = (minCount) => (str) => {
    if(str.length < minCount) {
        return "Заполните поле чуть больше";
    }else {
        return undefined;
    }
}