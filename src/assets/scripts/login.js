import api from '@/api/api'

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
    },
    async checkIfAdmin() {
        return await api().get('users/checkIfAdmin/' + Credentials.getToken())
            .then(function(response) {
                return response.data
            })
            .catch(function() {
                return false
            })
    }
}

export default Credentials