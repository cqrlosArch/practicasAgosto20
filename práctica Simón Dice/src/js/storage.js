const setLocalStorage=(key,value)=>{
    localStorage.setItem(key,value)
}
const getLocalStorage=(key)=>{
    return localStorage.getItem(key)
}
const setSessionStorage=(key,value)=>{
    sessionStorage.setItem(key,value)
}
const getSessionStorage=(key)=>{
    return sessionStorage.getItem(key)
}

const clearSessionStorage=()=>{
    sessionStorage.clear()
}




export const localSt={
    setLocalStorage,
    getLocalStorage
}

export const sessionSt={
    setSessionStorage,
    clearSessionStorage,
    getSessionStorage
}