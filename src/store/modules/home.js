import CookieUtils from '../../utils/cookies'
import { token, isFir} from '../../utils/cookies'
import {storageSave, sessionSave, userInfoKey} from '^/storage'
const state = {
  isCollapse: false,
  userInfo: {
    indexes: ['1','2']
  },
  hostname: "",
  access_token: "",
  refresh_token: "",
  socketData: '',
  tabs: [],
  nowRoute: '',
  isFristLogin: false
}
// console.log(process.env.NODE_ENV);
if( process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod') {
// 正式环境地址
  state.hostname = ''
}else if (process.env.NODE_ENV === 'test'){
// 测试服地址
  state.hostname = ''
} else{
// 开发地址
  state.hostname = ''
}
const mutations = {
  SET_access_token: (state, payload) => {
    state.access_token = payload.value;
    CookieUtils.set({
      key: token,
      value: payload.value,
      expires: 365,
      success: () => {
        // console.log(CookieUtils.get("access_token") + "测试");
      }
    });
    
    if(CookieUtils.get(isFir) || CookieUtils.get(isFir) === 'true') {
      CookieUtils.set({
        key: isFir,
        value: false,
        expires: 365
      })
      state.isFristLogin = false
    }else{
      CookieUtils.set({
        key: isFir,
        value: true,
        expires: 365
      })
      state.isFristLogin = true
    }
  },
  SET_refresh_token: (state, refresh_token) => {
    state.refresh_token = refresh_token;
  },
  PUSH_tabs: (state, tab) => {
    // debugger
    for(let i = 0; i < state.tabs.length; i++){
      if(state.tabs[i].name == tab.name) {
        if(tab.params) {
          state.tabs[i].params = tab.params
        }
        return null
      }
    }
    state.tabs.push(tab)
  },
  SET_tabs: (state, tabs) => {
    state.tabs = tabs
  },
  SET_nowRoute: (state, nowRoute) => {
    state.nowRoute = nowRoute
  },
  SET_userInfo: (state, userInfo) => {
    state.userInfo = userInfo;
    storageSave(userInfoKey, userInfo)
  },
  SET_isCollapse: (state, isCollapse) => {
    state.isCollapse = isCollapse
  },
  SET_socketData: (state, socketData) => {
    state.socketData = socketData
  }
}

const getters = {
  hostname: (state) => {
    return state.hostname
  },
  access_token: (state) => {
    if (!state.access_token) {
      state.access_token = CookieUtils.get("access_token");
      return state.access_token;
    } else {
      return state.access_token;
    }
  },
  refresh_token: (state) => {
    if (validateNull(state.refresh_token)) {
      return CookieUtils.get("refresh_token");
    } else {
      return state.refresh_token;
    }
  },
  userInfo: (state) => {
    return state.userInfo
  },
  tabs: (state) => {
    return state.tabs
  },
  nowRoute: (state) => {
    return state.nowRoute
  },
  isCollapse: (state) => {
    return state.isCollapse
  },
  socketData: (state) => {
    return state.socketData
  },
  isFristLogin: (state) => {
    return state.isFristLogin
  }
}

export default {
  state,
  mutations,
  getters
}
