import axios from 'axios'
import Router from '../router'
import dateFormat from '../components/dateFormat'

export default {
  namespaced: true,
  state: {
    data: {}
  },
  actions: {
    async getData ({dispatch, getters, commit}, id = null) {
      if (!getters.data.hasOwnProperty(id)) {
        const events = await dispatch('events/getData', null, {root: true})
        if (events.filter(item => item.id === Number(id)).length) {
          const result = await axios.get('api/v2/anonymouses/articles/' + id)
          result.data.data.dateFormat = dateFormat(result.data.data.created)
          commit('add', {[id]: result.data.data})
        } else {
          Router.back()
          return false
        }
      }
      return getters.data[id]
    }
  },
  mutations: {
    add (state, payload) {
      state.data = Object.assign(state.data, payload)
    }
  },
  getters: {
    data: ({data}) => data
  }
}
