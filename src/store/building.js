import axios from 'axios'

export default {
  namespaced: true,
  state: {
    years: [],
    months: [],
    building: null,
    activeYear: '',
    activeMonth: '',
    streaming: 'https://ucams.ufanet.ru/api/internal/embed/1661758524ZAX465/?ttl=3600&autoplay=true&mute=true" '
  },
  actions: {
    async getData ({commit, getters}, update = false) {
      let data = getters.data
      if (!data || update) {
        const result = await axios.get('api/v2/mixed_galleries/1')
        data = result.data.data.items.map(item => {
          const date = item.name.trim().replace('  ', ' ').toLowerCase().split(' ')
          return {
            images: item.images.map(image => image.url),
            month: date[0],
            year: Number(date[1])
          }
        })
        if (data.length) {
          commit('updateBuilding', data)
          commit('updateYears', data)
          commit('updateMonths', data)
          commit('setActiveYear', getters.years[0])
          commit('setActiveMonth', getters.months[getters.months.length - 1])
        }
      }
    }
  },
  mutations: {
    updateBuilding (state, payload) {
      state.building = payload
    },
    updateYears (state, payload) {
      const years = []
      payload.forEach(({year}) => {
        if (!years.includes(year)) {
          years.push(year)
        }
      })
      state.years = years.sort((a, b) => b - a)
    },
    updateMonths (state, payload) {
      const monthsData = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
      const months = {}
      payload.forEach(({year, month}) => {
        if (typeof months[year] === 'undefined') {
          months[year] = []
        }
        if (!months[year].includes(month)) {
          months[year].push(month)
        }
      })
      Object.keys(months).forEach(year => {
        months[year] = months[year].sort((a, b) => monthsData.indexOf(a) - monthsData.indexOf(b))
      })
      state.months = months
    },
    setActiveYear (state, payload) {
      payload = Number(payload)
      state.activeYear = payload
      state.activeMonth = state.months[payload][state.months[payload].length - 1]
    },
    setActiveMonth (state, payload) {
      state.activeMonth = payload
    }
  },
  getters: {
    data: ({building}) => building,
    activeMonth: ({activeMonth}) => activeMonth,
    activeYear: ({activeYear}) => activeYear,
    years: ({years}) => years,
    months: state => state.months[state.activeYear],
    building: state => {
      let current = null
      if (state.building) {
        current = state.building.map(
          item => item.year === state.activeYear && item.month === state.activeMonth ? item.images : null
        ).filter(item => item)
        current = current.length ? current[0] : null
      }
      return current
    },
    streaming: ({streaming}) => streaming
  }
}
