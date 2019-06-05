var Credentials = {
    token: null,
    loggingIn: false,

    setToken(newToken) {
        this.token = newToken
    },
    getToken() {
        return this.token
    },
    isLoggingIn() {
        this.loggingIn = true
    },
    isNotLoggingIn() {
        this.loggingIn = false
    }
}

export default Credentials