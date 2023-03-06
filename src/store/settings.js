export default {
  namespaced: true,
  state: {
    phone: {
      text: '+7 (347) 289-90-05',
      href: '83472899005'
    },
    socs: {
      // facebook: 'https://www.facebook.com/gkjsinvest/',
      // instagram: 'https://www.instagram.com/gkjsi/',
      vkontakte: 'https://vk.com/jsinvest'
    }
  },
  mutations: {},
  actions: {},
  getters: {
    phone: ({phone}) => phone,
    socs: ({socs}) => socs
  }
}
