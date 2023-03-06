export default {
  namespaced: true,
  state: {
    content: `
      <p>Четверть века ГК «Жилстройинвест» возводит жилые дома и коммерческую недвижимость. На счету компании не один десяток реализованных проектов. Только за последние годы была завершена застройка микрорайона «Айгуль», сданы в эксплуатацию жилые комплексы «Апельсин», «Олимп», «Парус», «Эверест», «Фестиваль», «Четыре сезона», первый уфимский небоскрёб IDEL TOWER, «Тихая Роща» и «Тихая роща-2», «Аристократ», «Символ» и «Ботаника», которые, несомненно, стали украшением столицы и получили престижные федеральные награды в области строительства.</p>
      <p>Сегодня у компании на стадии разработки новые грандиозные проекты, а это тысячи квадратных метров современного качественного жилья и счастливые новоселы.</p>
      <p>ГК «Жилстройинвест» - единственная компания в Башкирии, которая четыре раза подряд удостоилась золотого знака «Надежный застройщик России».</p>
    `,
    link: {
      href: 'https://js-invest.ru/',
      text: 'js-invest.ru'
    },
    items: [
      {
        name: 'ЖК «Символ»',
        image: '/static/developer/developer-1.jpg',
        imageMobile: '/static/developer/developer-mobile-1.jpg'
      },
      {
        name: 'ЖК «Аристократ»',
        image: '/static/developer/developer-2.jpg',
        imageMobile: '/static/developer/developer-mobile-2.jpg'
      },
      {
        name: 'ЖК IDEL',
        image: '/static/developer/developer-3.jpg',
        imageMobile: '/static/developer/developer-mobile-3.jpg'
      },
      {
        name: 'ЖК «Ботаника»',
        image: '/static/developer/developer-4.jpg',
        imageMobile: '/static/developer/developer-mobile-4.jpg'
      }
    ]
  },
  actions: {},
  mutations: {},
  getters: {
    content: ({content}) => content,
    link: ({link}) => link,
    items: ({items}) => items
  }
}
