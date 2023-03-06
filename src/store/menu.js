/* eslint-disable */
export default {
  namespaced: true,
  state: {
    links: [
      {
        title: 'Выбрать квартиру',
        to: '/select'
      },
      {
        title: 'О проекте',
        to: '/'
      },
      {
        title: 'Расположение',
        to: '/location'
      },
      {
        title: 'Галерея',
        to: '/gallery'
      },
      /*{
        title: '3D прогулка',
        to: '/3d'
      },*/
      {
        title: 'Контакты',
        to: '/contacts'
      }
    ],
    subLinks: [
      {
        title: 'Акции и события',
        to: '/events'
      },
      {
        title: 'Ход строительства',
        to: '/building'
      },
      {
        title: 'Застройщик',
        to: '/developer'
      },
      /*{
        title: 'Документы',
        to: '/docs'
      }*/
    ],
    mobileMenuContext: null
  },
  mutations: {
    setMobileMenuContext (state, payload) {
      state.mobileMenuContext = payload
    }
  },
  actions: {},
  getters: {
    links: ({links}) => links,
    subLinks: ({subLinks}) => subLinks,
    mobileMenuContext: ({mobileMenuContext}) => mobileMenuContext
  }
}
