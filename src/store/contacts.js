export default {
  namespaced: true,
  state: {
    address: 'Республика Башкортостан, г.Уфа, <br>ул. Зорге, 73',
    phone: '+7 (347) 289-90-05',
    email: 'sales@js-invest.ru',
    position: {lat: 54.772224, lng: 56.015887}
  },
  actions: {},
  mutations: {},
  getters: {
    address: ({address}) => address,
    phone: ({phone}) => phone,
    email: ({email}) => email,
    position: ({position}) => position
  }
}
