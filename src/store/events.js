import axios from 'axios'
import dateFormat from '../components/dateFormat'

export default {
  namespaced: true,
  state: {
    items: [],
    years: [],
    yearActive: ''
  },
  actions: {
    async getData ({commit, getters}, update = false) {
      let data = getters.data
      if (!data || update) {
        let years = []
        const result = await axios.get('api/v2/anonymouses/articles', {params: {categoryId: 3}})
        data = result.data.data.map(item => {
          const date = dateFormat(item.created)
          if (!years.includes(date.year)) {
            years = [...years, date.year]
          }
          return {
            id: item.id,
            year: date.year,
            title: item.name,
            created: item.created,
            tag: item.tags.length ? item.tags[0] : 'event'
          }
        })
        years = years.sort((a, b) => b - a)
        commit('setYearActive', years[0])
        commit('setYears', years)
        commit('setItems', data.sort((a, b) => new Date(b.created) - new Date(a.created)))
      }
      return data
    }
  },
  mutations: {
    setItems (state, payload) {
      state.items = payload
    },
    setYears (state, payload) {
      state.years = payload
    },
    setYearActive (state, payload) {
      state.yearActive = payload
    }
  },
  getters: {
    years: ({years}) => years,
    yearActive: ({yearActive}) => yearActive,
    items: ({items, yearActive}) => items.filter(({year}) => year === yearActive)
  }
}
