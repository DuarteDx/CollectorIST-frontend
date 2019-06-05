<template>
    <div>
        {{ message }}
    </div>
</template>

<script>
import Credentials from '@/assets/scripts/login.js'
import axios from 'axios'
import api from '@/api/api'


export default {
    name: 'AuthComponent',
    data() {
        return {
            code: null,
            token: null,
            message: 'LOADING...'
        }
    },
    methods: {
        async getToken() {
            var component = this
            var getTokenUrl = 'https://fenix.tecnico.ulisboa.pt/oauth/access_token?client_id=1414440104755271&client_secret=%2Bpf629QqjGx35YhJHoOuQPKiNzFIloF7KmPSv5I6AUIv5gWiPX1k3%2B5jlud0%2B2XuVUl6WmVYv/AKaCVyWmNBBw==&redirect_uri=http://localhost:8080/login&code=' + this.code + '&grant_type=authorization_code'
            var response = await axios.post(getTokenUrl)
                .then(function(response) {
                    // console.log('Got token!')
                    // console.log('access_token: ' + response.data.access_token)
                    // console.log('refresh_tokeN: ' + response.data.refresh_token)
                    // console.log('Credentials.token: ' + Credentials.getToken())
                    component.message = 'Got token from IST'
                    api().post('/users/login', {data: {
                        access_token: response.data.access_token,
                        refresh_token: response.data.refresh_token
                    }})
                        .then(function(response) {
                            Credentials.setToken(response.data)
                            console.log('jwt token: ' + Credentials.getToken())
                            component.$router.push('/assets')
                        })
                        .catch(function(error) {
                            console.log(error)
                        })
                })
                .catch(function(error) {
                    // console.log('Error getting token')
                    component.message = error
                })
        }
    },
    async created() {
        this.code = this.$route.query.code
        if(!this.code) {
            // console.log('No authentication code provided!')
        } 
        else if(!Credentials.getToken()) {
            // console.log('code: ' + this.code)
            this.token = await this.getToken()
        }
        else {
            // console.log('Complete login sucessfull!!')
            this.$router.push('/assets')
        }
    }
}
</script>
