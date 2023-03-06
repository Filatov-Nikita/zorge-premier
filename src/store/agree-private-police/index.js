export default {
  namespaced: true,
  state: {
    agreement: require('./agreement').default,
    privatePolice: require('./private-police').default
  },
  actions: {},
  mutations: {},
  getters: {
    agreement: ({agreement}) => agreement,
    privatePolice: ({privatePolice}) => privatePolice
  }
}
