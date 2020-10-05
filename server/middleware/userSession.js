let currentUser = ''

module.exports.setCurrentUser = (user) => {
    console.log("setCurrentUser  :", user);
    currentUser = user
}

module.exports.getCurrentUser = () => {
    console.log("currentUser  : ", currentUser);
    return currentUser
}

//export { setCurrentUser, getCurrentUser }