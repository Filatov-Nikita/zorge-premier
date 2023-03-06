export default (string) => {
  const months = ['',
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
  ]
  const array = string.split(' ')
  array[0] = array[0].split('-')
  array[1] = array[1].split(':')
  return {
    year: Number(array[0][0]),
    month: Number(array[0][1]),
    month_text: months[Number(array[0][1])],
    day: Number(array[0][2]),
    hour: Number(array[1][0]),
    minute: Number(array[1][1]),
    second: Number(array[1][2])
  }
}
