export const OPERATORS = [
  {
    value: "2JD",
    label: "АО НИИАС – 2JD"
  },
  {
    value: "2BN",
    label: "Линк-Сервис – 2BN"
  },
  {
    value: "2BM",
    label: "СКБ Контур.Диадок – 2BM"
  },
  {
    value: "2AL",
    label: "Такском – 2AL"
  },
  {
    value: "2AK",
    label: "ТаксНет – 2AK"
  },
  {
    value: "2BE",
    label: "Тензор СБиС – 2BE"
  },
  {
    value: "2IG",
    label: "Synerdocs – 2IG"
  }
];

export const MAX_OPERATORS_COUNT = 100;

export const DEFAULT_OPERATOR = {
  name: "",
  inn: "",
  kpp: "",
  operator: "",
  lastname: "",
  firstname: "",
  patronymic: ""
};

export const MY_ORGANISATION_DEFAULT_DATA = {
  inn: "",
  kpp: "",
  name: "",
  id: "",
  email: "",
  dop_sog: "",
  radioValue: "UL",
  lastname: "",
  firstname: "",
  patronymic: ""
};

export const STATE_OPERATORS = [
  {
    name: 'ДИРЕКТУМ (Synerdocs)',
    status: 3,
  },
  {
    name: 'ИНФОТЕКС Интернет Траст (VipNet ЭДО Документ)',
    status: 3
  },
  {
    name: 'КОНТУР (Диадок)',
    status: 3
  },
  {
    name: 'КОРУС Консалтинг СНГ (СФЕРА)',
    status: 2
  },
  {
    name: 'КРИПТЭКС (Signatura)',
    status: 0
  },
  {
    name: 'МТС (Электронный документооборот)',
    status: 1
  },
  {
    name: 'НИИАС (РЖД)',
    status: 3
  },
  {
    name: 'СИСЛИНК (DOCLINK)',
    status: 0
  },
  {
    name: 'СТЭК НТЦ (СТЭК-ТРАСТ)',
    status: 3
  },
  {
    name: 'ТАКСКОМ (Файлер, 1С-Такском)',
    status: 3
  },
  {
    name: 'ТАКСНЕТ (Транскрипт)',
    status: 3
  },
  {
    name: 'ТЕНЗОР (СБИС, 1С-ЭДО)',
    status: 3
  },
  {
    name: 'ЭТП ГПБ (Система ЭДО ЭТП ГПБ, 1С-ЭДО)',
    status: 3
  },
];

export const STATE_STATUS = [
  {
    name: 'Проведение переговоров',
    progress: 25,
  },
  {
    name: 'Доработка ПО, тестирование обмена',
    progress: 50,
  },
  {
    name: 'Тестирование обмена',
    progress: 75,
  },
  {
    name: 'Промышленная эксплуатация',
    progress: 100,
  }
];

export const FIRST_STATE_OPERATOR = {
  id: '',
  inn: '',
  kpp: '',
  name: '',
  lastname: '',
  firstname: '',
}

export const SECOND_STATE_OPERATOR = {
  inn: '',
  kpp: '',
  name: '',
  lastname: '',
  firstname: '',
}
