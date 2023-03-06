import Vue from 'vue'
import Vuex from 'vuex'

import menu from './menu'
import settings from './settings'
import map from './map/index'
import building from './building'
import gallery from './gallery'
import filter from './filter'
import house from './house'
import variables from './variables'
import flat from './flat'
import agreePrivatePolice from './agree-private-police/index'
import about from './about'
import events from './events'
import event from './event'
import contacts from './contacts'
import developer from './developer'
import concepts from './concepts'
import engineering from './engineering'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    menu,
    settings,
    map,
    building,
    gallery,
    filter,
    house,
    variables,
    flat,
    agreePrivatePolice,
    about,
    events,
    event,
    contacts,
    developer,
    concepts,
    engineering
  }
})
