<!DOCTYPE html>
<html lang="ru">
<head>
  <title>Zorge - Квартира №{#number#} - {#total_area#}</title>
  <meta charset="UTF-8">
  <style>
    {#style#}
    .bottom__plan, .bottom__plan__image, .bottom__plan__svg {
      width: {#plan_width#}px;
      height: {#plan_height#}px;
    }
    .bottom__plan__image {
      margin-bottom: -{#plan_height#}px;
    }
  </style>
</head>
<body>
<div class="header">
  <img class="header__logo" src="{#logo#}">
  <div class="header__right">
    <span class="header__domain">{#server_name#}</span><br>
    <span class="header__phone">{#phone#}</span>
  </div>
  <div class="clear"></div>
</div>
<table class="apartment">
  <tr>
    <td style="height: 560px;">
      <div class="apartment__title">{#title#}</div>
      <img class="apartment__image" src="{#image#}">
    </td>
  </tr>
</table>
<div class="bottom">
  <div class="bottom__left">
    <table class="bottom__table">
      <tr>
        <td class="bottom__table__name">Литер</td>
        <td class="bottom__table__value">{#liter#}</td>
      </tr>
      <tr>
        <td class="bottom__table__name">Этаж</td>
        <td class="bottom__table__value">{#storey_number#}</td>
      </tr>
      <tr>
        <td class="bottom__table__name">Квартира, №</td>
        <td class="bottom__table__value">{#number#}</td>
      </tr>
      <tr>
        <td class="bottom__table__name">Комнат</td>
        <td class="bottom__table__value">{#rooms_number#}</td>
      </tr>
      <tr>
        <td class="bottom__table__name">Площадь, м<sup>2</sup></td>
        <td class="bottom__table__value">{#total_area#}</td>
      </tr>
    </table>
    <img class="bottom__compass" src="{#compass#}">
  </div>
  <div class="bottom__right">
    <div class="bottom__plan">
      <img class="bottom__plan__image" src="{#storey_image#}">
      <svg class="bottom__plan__svg" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" viewBox="0 0 {#width#} {#height#}" preserveAspectRatio="xMidYMid">
        <path fill="#f6ac6d" opacity="0.75" d="{#polygon#}"></path>
      </svg>
      <div class="bottom__plan__street-name">улица Рихарда Зорге</div>
    </div>
  </div>
</div>
</body>
</html>
