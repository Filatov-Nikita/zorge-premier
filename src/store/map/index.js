export default {
  namespaced: true,
  state: {
    tabs: require('./tabs').default,
    markers: require('./markers').default,
    options: require('./options').default,
    list: [
      'Лесопарковая зона',
      'Спортивные площадки',
      'Фитнес-клубы',
      'Престижные школы',
      'Клубы раннего развития для детей',
      'Кафе и рестораны',
      'Салоны красоты',
      'Медицинские центры'
    ]
  },
  mutations: {
    filterMarkers (state, {tab, markers}) {
      markers.forEach(marker => {
        if (!tab || !marker.tab || marker.tab === tab.key) {
          marker.setVisible(true)
        } else {
          marker.setVisible(false)
          marker.infowindow.close()
        }
      })
    }
  },
  actions: {
    filterMarkers ({commit}, payload) {
      commit('filterMarkers', payload)
    }
  },
  getters: {
    tabs: ({tabs}) => tabs,
    markers ({markers}) {
      markers.map(marker => {
        marker.icon = marker.icon || `/static/markers/${marker.tab}.svg`
      })
      return markers
    },
    options: ({options}) => options,
    list: ({list}) => list
  }
}
