//storage系列操作
export const storageFetch = function(key) {
  return JSON.parse(localStorage.getItem(key) || null);
}
export const sessionFetch = function(key) {
  return JSON.parse(sessionStorage.getItem(key) || null);
}
export const storageSave = function(key, info) {
  localStorage.setItem(key, JSON.stringify(info));
}
export const sessionSave = function(key, info) {
  sessionStorage.setItem(key, JSON.stringify(info));
}
export const storageRemove = function(key) {
  localStorage.removeItem(key)
}
export const sessionRemove = function(key) {
  sessionStorage.removeItem(key)
}

export const userInfoKey = "SCIENTFICMANAGE_SYSTEM_USER_INFO"
export const tabsKey = "SYSTEM_TABS"