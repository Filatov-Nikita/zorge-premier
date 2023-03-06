/* eslint-disable */

import axios from 'axios'
import Route from './../../src/router'

const filterOptions = {
  complex_id: 1,
  house_id: [30, 31, 32]
}

const fields = () => ({
  rooms: [],
  liters: [],
  uniqueness: [],
  area: [41, 146],
  storey: [2, 23]
})

export default {
  namespaced: true,
  state: {
    complexId: filterOptions.complex_id,
    // удалить
    liters: {
      31: '1Б',
      30: '1А',
      32: '1Г'
    },
    houses: {
      1: '1А',
      2: '1Б',
      3: '1Г',
    },
    fields: fields(),
    result: [],
    filterResult: {},
    sortBy: 'DESC',
    orderBy: 'liter',
    cols: [
      {
        key: 'liter',
        name: 'Литер'
      },
      {
        key: 'rooms_number',
        name: 'Комнат'
      },
      {
        key: 'storey_number',
        name: 'Этаж'
      },
      {
        key: 'total_area',
        name: 'Площадь, м2'
      },
      // {
      //   key: 'uniqueness',
      //   name: 'Преимущества'
      // }
    ]
  },
  actions: {
    async getData ({commit, getters, dispatch}, update = false) {
      let data = getters.result
      if (!data.length || update) {
        data = []
        let flats = await axios.get('api/v2/flats', {
          params: {
            joefalse: true,
            complex_id: filterOptions.complex_id
          }
        })
        flats = flats.data.data.filter(flat => filterOptions.house_id.includes(flat.house))

        for (const flat of flats) {
          const more = await dispatch('flat/getFlatMore', flat.id, {root: true})
          const result = {
            id: flat.id,
            house: flat.house,
            number: flat.number,
            liter: getters.litersNumber[flat.house],
            complex: flat.complex,
            status: flat.status,
            storey: flat.storey,
            uniqueness: more ? more.uniqueness : []
          }

          if (getters.cols.filter(({key}) => key === 'entrance_number').length) {
            flat.entrance_number = await dispatch('house/getNumberEntrance',
              {house: flat.house, entrance: flat.entrance},
              {root: true}
            )
          }
          getters.cols.forEach(({key}) => {
            if (!result.hasOwnProperty(key)) {
              result[key] = Number(flat[key])
            }
          })
          data.push(result)
        }

        commit('setFilterResult', flats)
        commit('setResult', data)
      }

      commit('reset')

      const set = Route.history.current.params.set
      switch (set) {
        case 'private':
          commit('setField', {key: 'uniqueness', value: [{value: 'private'}]})
          commit('setField', {key: 'liters', value: 3})
          commit('setField', {key: 'rooms', value: 4})
          break
        case 'view':
          commit('setField', {key: 'uniqueness', value: [{value: 'view'}]})
          break
        case 'pantry':
          commit('setField', {key: 'uniqueness', value: [{value: 'pantry'}]})
          break
      }

      return {
        original: getters.filterResult,
        joins: getters.result
      }
    },
    setSortBy ({commit, getters}, payload) {
      if (payload === 'uniqueness') {
        return false
      }
      if (getters.orderBy === payload) {
        commit('setSortBy', getters.sortBy === 'ASC' ? 'DESC' : 'ASC')
      } else {
        commit('setOrderBy', payload)
      }
    },
    async getFilterData ({commit, getters, dispatch}, {update = false, params = {}}) {
      await dispatch('getData', update)
      const keys = Object.keys(params)
      return getters.result.filter(flat => {
        let status = true
        keys.forEach(key => {
          if (status) {
            if (flat[key]) {
              status = flat[key] === params[key]
            }
          } else {
            return false
          }
        })
        return status
      })
    },
    getComplexId: ({getters}) => getters.complexId,
    getLiterIdByNumber: ({getters}, number) => {
      for (const id in getters.litersNumber) {
        if (getters.litersNumber.hasOwnProperty(id) && Number(number) === getters.litersNumber[id]) {
          return id
        }
      }
    }
  },
  mutations: {
    setResult (state, payload) {
      state.result = payload
    },
    reset (state) {
      state.fields = fields()
    },
    setField (state, {key, value}) {
      if (typeof value === 'object') {
        state.fields[key] = value
      } else {
        if (state.fields[key].includes(value)) {
          state.fields[key] = state.fields[key].filter(item => item !== value)
        } else {
          state.fields[key].push(value)
        }
      }
    },
    setSortBy (state, payload) {
      state.sortBy = payload
    },
    setOrderBy (state, payload) {
      state.orderBy = payload
    },
    setFilterResult (state, payload) {
      state.filterResult = payload
    }
  },
  getters: {
    rooms: ({fields}) => fields.rooms,
    houses: (state) => state.houses,
    liters: ({fields}) => fields.liters,
    area: ({fields}) => fields.area,
    storey: ({fields}) => fields.storey,
    uniqueness: ({fields}) => fields.uniqueness,
    cols: ({cols}) => cols,
    sortBy: ({sortBy}) => sortBy,
    orderBy: ({orderBy}) => orderBy,
    filterResult: ({filterResult}) => filterResult,
    complexId: ({complexId}) => complexId,
    litersNumber: ({liters}) => liters,
    originalResult: ({result}) => result,
    result: ({result, fields, sortBy, orderBy}) => {
      result = result.filter(flat => {
        let result = true
        if (fields.rooms.length && !fields.rooms.includes(flat.rooms_number)) {
          result = false
        }
        if (result && fields.liters.length && !fields.liters.includes(flat.liter)) {
          result = false
        }
        if (result && fields.area[0] > flat.total_area || fields.area[1] < flat.total_area) {
          result = false
        }
        if (result && flat.storey_number < fields.storey[0] || flat.storey_number > fields.storey[1]) {
          result = false
        }
        if (result && fields.uniqueness.length) {
          result = false
          fields.uniqueness.forEach(({value}) => {
            if (!result && flat.uniqueness.includes(value)) {
              result = true
            }
          })
          /*const uniquenessStatus = []
          fields.uniqueness.forEach(({value}) => {
            if (flat.uniqueness.includes(value)) {
              uniquenessStatus.push(true)
            }
          })
          if (uniquenessStatus.length === fields.uniqueness.length) {
            result = true
          }*/
        }
        return result
      })
      if (orderBy === 'liter') {
        const sortPosition = ['А','Б','Г']
        result.sort((a, b) => a.storey_number - b.storey_number)
        if (sortBy === 'ASC') {
          result.sort((a, b) =>
            sortPosition.indexOf(b.liter.replace(/[^АБГ]/gi,'')) - sortPosition.indexOf(a.liter.replace(/[^АБГ]/gi,''))
          )
        } else if (sortBy === 'DESC') {
          result.sort((a, b) =>
            sortPosition.indexOf(a.liter.replace(/[^АБГ]/gi,'')) - sortPosition.indexOf(b.liter.replace(/[^АБГ]/gi,''))
          )
        }
      } else {
        if (sortBy === 'ASC') {
          result.sort((a, b) => b[orderBy] - a[orderBy])
        } else if (sortBy === 'DESC') {
          result.sort((a, b) => a[orderBy] - b[orderBy])
        }
      }
      return result
    }
  }
}
