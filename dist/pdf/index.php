<?php

header('Access-Control-Allow-Origin: *');

require_once('vendor/autoload.php');

$planWidth = 300;
$planHeight = 250;
$logo = 'assets/images/logo.svg';
$compass = 'assets/images/compass.png';
$phone = '+7 (347) <strong>445-44-11</strong>';

$get = filter_input_array(INPUT_GET, [
  'image'         => FILTER_SANITIZE_STRING,
  'storey_image'  => FILTER_SANITIZE_STRING,
  'polygon'       => FILTER_SANITIZE_STRING,
  'width'         => FILTER_SANITIZE_NUMBER_INT,
  'height'        => FILTER_SANITIZE_NUMBER_INT,
  'storey_number' => FILTER_SANITIZE_NUMBER_INT,
  'number'        => FILTER_SANITIZE_NUMBER_INT,
  'rooms_number'  => FILTER_SANITIZE_NUMBER_INT,
  'liter'         => FILTER_SANITIZE_NUMBER_INT,
  'total_area'    => [
    'filter' => FILTER_SANITIZE_NUMBER_FLOAT,
    'flags' => FILTER_FLAG_ALLOW_FRACTION
  ]
]);

$black_image = str_replace('/2d/', '/2d/black/', $get['image']);

if (file_exists(dirname(__dir__) . $black_image)) {
  $get['image'] = $black_image;
}

if (empty($get)) die;
foreach ($get as $item) if (empty($item)) die;

switch ($get['rooms_number']) {
    case 1:
        $title = 'Однокомнатная квартира';
        break;
    case 2:
        $title = 'Двухкомнатная квартира';
        break;
    case 3:
        $title = 'Трёхкомнатная квартира';
        break;
    case 4:
        $title = 'Четырехкомнатная квартира';
        break;
    case 5:
        $title = 'Пятикомнатная квартира';
        break;
    case 6:
        $title = 'Шестикомнатная квартира';
        break;
    case 7:
        $title = 'Семикомнатная квартира';
        break;
    case 8:
        $title = 'Восьмикомнатная квартира';
        break;
    case 9:
        $title = 'Девятикомнатная квартира';
        break;
    case 10:
        $title = 'Десятикомнатная квартира';
        break;
    case 11:
        $title = 'Одиннадцатикомнатная квартира';
        break;
    case 12:
        $title = 'Двенадцатикомнатная квартира';
        break;
    case 13:
        $title = 'Тринадцатикомнатная квартира';
        break;
    default:
        $title = '';
}

$mpdf = new \Mpdf\Mpdf();
$html = file_get_contents('assets/index.tpl');

if ($get['width'] <= $get['height'] + $planWidth - $planHeight) {
  $currentHeight = $planHeight;
  $currentWidth = round($planHeight / ($get['height'] / 100) * ($get['width'] / 100));
} else {
  $currentHeight = round($planWidth / ($get['width'] / 100) * ($get['height'] / 100));
  $currentWidth = $planWidth;
}

$values = array_merge($get, [
  'style'         => file_get_contents('assets/style.css'),
  'logo'          => $logo,
  'server_name'   => $_SERVER['SERVER_NAME'],
  'phone'         => $phone,
  'title'         => $title,
  'compass'       => $compass,
  'plan_height'   => $currentHeight,
  'plan_width'    => $currentWidth
]);


$html = str_replace(array_map(function ($item) {
  return "{#{$item}#}";
}, array_keys($values)), array_values($values), $html);

$mpdf->WriteHTML($html);

$mpdf->Output();
