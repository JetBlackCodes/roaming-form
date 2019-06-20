import React from "react";
import { Typography } from "@material-ui/core";

const CompleteStep = props => { //предполагается передавать номер заявки
  return (
    <>
      <Typography variant="h8">Заявка №04029</Typography>
      <Typography variant="h5" gutterBottom>
        Ваш запрос на установку связи направлен оператору абонента.
      </Typography>
      <Typography variant="subtitle1">
        Срок ответа на заявку от 2 до 6 рабочих дней. По итогу настройки на
        указанный вами e-mail придет извещение.
      </Typography>
    </>
  );
};

export default CompleteStep;
