let footerShowDefault
let yesideaOldStatus

export default {
  namespaced: true,
  state: {
    yesidea: true,
    yesideaIndex102: false,
    menuShow: false,
    footerShow: true,
    footerBg: false,
    phoneShow: false,
    phoneHidden: false,
    topButtonsShow: true,
    phoneBlackMode: false,
    phoneTextVisible: true,
    homeContentVisible: {
      home: true,
      about: false
    },
    homeVideoVisible: {
      cycle: true,
      toAbout: false
    },
    homeTransitionToAbout: false,
    mobileTopLogoBgHide: false,
    scrollPageOffsetY: {}
  },
  actions: {
    toggleMenu ({commit, getters}) {
      commit('menuShow', !getters.menuShow)
      if (getters.menuShow) {
        footerShowDefault = getters.footerShow
        yesideaOldStatus = getters.yesidea
        commit('footerShow', true)
        commit('yesidea', true)
        commit('yesideaIndex102', true)
      } else {
        commit('footerShow', footerShowDefault)
        commit('yesidea', yesideaOldStatus)
        commit('yesideaIndex102', false)
      }
    }
  },
  mutations: {
    yesidea (state, payload) {
      state.yesidea = payload
    },
    menuShow (state, payload) {
      state.menuShow = payload
    },
    footerShow (state, payload) {
      state.footerShow = payload
    },
    footerBg (state, payload) {
      state.footerBg = payload
    },
    phoneShow (state, payload) {
      state.phoneShow = payload
    },
    phoneHidden (state, payload) {
      state.phoneHidden = payload
    },
    phoneBlackMode (state, payload) {
      state.phoneBlackMode = payload
    },
    topButtonsShow (state, payload) {
      state.topButtonsShow = payload
    },
    phoneTextVisible (state, payload) {
      state.phoneTextVisible = payload
    },
    yesideaIndex102 (state, payload) {
      state.yesideaIndex102 = payload
    },
    homeContentVisible (state, payload) {
      state.homeContentVisible = payload
    },
    homeVideoVisible (state, payload) {
      state.homeVideoVisible = payload
    },
    homeTransitionToAbout (state, payload) {
      state.homeTransitionToAbout = payload
    },
    setMobileTopLogoBgHide (state, payload) {
      state.mobileTopLogoBgHide = payload
    },
    setScrollPageOffsetY (state, payload) {
      state.scrollPageOffsetY = Object.assign(state.scrollPageOffsetY, {[payload.path]: payload.offset})
    }
  },
  getters: {
    yesidea: ({yesidea}) => yesidea,
    menuShow: ({menuShow}) => menuShow,
    phoneShow: ({phoneShow}) => phoneShow,
    phoneHidden: ({phoneHidden}) => phoneHidden,
    footerShow: ({footerShow}) => footerShow,
    footerBg: ({footerBg}) => footerBg,
    phoneBlackMode: ({phoneBlackMode}) => phoneBlackMode,
    topButtonsShow: ({topButtonsShow}) => topButtonsShow,
    yesideaIndex102: ({yesideaIndex102}) => yesideaIndex102,
    phoneTextVisible: ({phoneTextVisible}) => phoneTextVisible,
    homeContentVisible: ({homeContentVisible}) => homeContentVisible,
    homeVideoVisible: ({homeVideoVisible}) => homeVideoVisible,
    homeTransitionToAbout: ({homeTransitionToAbout}) => homeTransitionToAbout,
    mobileTopLogoBgHide: ({mobileTopLogoBgHide}) => mobileTopLogoBgHide,
    scrollPageOffsetY: ({scrollPageOffsetY}) => scrollPageOffsetY
  }
}
