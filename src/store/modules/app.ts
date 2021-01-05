import Cookies from 'js-cookie'

export interface IAppState {
  device: string
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
}

const state: IAppState = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false,
  },
  device: 'desktop',
}

const mutations = {
  TOGGLE_SIDEBAR: (state: IAppState) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state: IAppState, withoutAnimation: boolean) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state: IAppState, device: string) => {
    state.device = device
  },
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device: string) {
    commit('TOGGLE_DEVICE', device)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
