import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

export interface ISettingsState {
  fixedHeader: boolean
  showSettings: boolean
  sidebarLogo: boolean
}

const state: ISettingsState = {
  showSettings,
  fixedHeader,
  sidebarLogo,
}

const mutations = {
  CHANGE_SETTING: (state: ISettingsState, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

