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
            var getTokenUrl = 'https://fenix.tecnico.ulisboa.pt/oauth/access_token?client_id=1414440104755271&client_secret=%2Bpf629QqjGx35YhJHoOuQPKiNzFIloF7KmPSv5I6AUIv5gWiPX1k3%2B5jlud0%2B2XuVUl6WmVYv/AKaCVyWmNBBw==&redirect_uri=http://localhost:8080/login&code=' + this.code + '&grant_type=authorization_code'
            var response = await axios.post(getTokenUrl)
                .then(function(response) {
                    console.log('Got token!')
                    console.log(response)
                    Credentials.setToken()
                })
                .then(function(error) {
                    console.log('Error getting token')
                    this.message = 'login error'
                })
        }
    },
    created() {
        this.code = this.$route.query.code
        if(!this.code) {
            console.log('No authentication code provided!')
        } 
        else if(!Credentials.token) {
            console.log('code: ' + this.code)
            this.token = this.getToken()
            console.log('token: ' + this.token)
            Credentials.setToken(this.token)
        }
        else {
            console.log('Complete login sucessfull!!')
            this.$router.push('/assets')
        }
    }
}
</script>
