import axios from '../../utils/axios'

const actions = {
  getUserInfo: (store, params) => {
    return new Promise((resolve, reject)=>{
      axios.post("/auth/form",{
        username: params.username,
        password: params.password,
        code: params.code,
        deviceId: params.deviceId
      }).then(res=>{
        store.commit('SET_userInfo', res.data.additionalInfo)
        store.commit("SET_access_token", {
          value: res.data.token,
          expire: res.data.tokenExpireIn
        })
        axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;
        resolve(res)
      }).catch(err=>{
        reject(err)
        // console.log(err);
      })
    })
  }
}

export default {
  actions
}