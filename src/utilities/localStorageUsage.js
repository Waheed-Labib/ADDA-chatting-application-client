const setSideBarInLocalStorage = (sideBar) => {
    localStorage.setItem('sideBar', sideBar);
}

const getSideBarFromLocalStorage = () => {
    return localStorage.getItem('sideBar')
}

const setShowInSmallDeviceInLocalStorage = (showInSmallDevice) => {
    localStorage.setItem('showInSmallDevice', showInSmallDevice)
}

const getShowInSmallDeviceFromLocalStorage = () => {
    return localStorage.getItem('showInSmallDevice')
}

const setChatMateInLocalStorage = (chatMate) => {
    localStorage.setItem('chatMate', JSON.stringify(chatMate))
}

const getChatMateFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('chatMate'))
}

export {
    setSideBarInLocalStorage,
    getSideBarFromLocalStorage,
    setShowInSmallDeviceInLocalStorage,
    getShowInSmallDeviceFromLocalStorage,
    setChatMateInLocalStorage,
    getChatMateFromLocalStorage
}
