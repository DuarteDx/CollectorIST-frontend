<template>
    <v-app>
        <v-container my-4>
            <v-layout row wrap justify-center align-center>
                <v-flex xs12 sm10 md6 pa-5>
                    <v-layout row wrap justify-center align-center mb-5>
                        <v-flex xs6 class="text-xs-center">
                            <h1>Login</h1>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap justify-center align-center>
                        <v-flex>
                            <v-form>
                                <v-text-field outline required label="Utilizador" :value="username" v-model="username" @keydown="processInput"></v-text-field>
                                <v-text-field outline required label="Password" :value="password" v-model="password" @keydown="processInput" :type="passwordVisible ? 'text' : 'password'" :append-icon="passwordVisible ? 'visibility' : 'visibility_off'" @click:append="togglePasswordVisibility"></v-text-field>
                                <div class="text-xs-center">
                                    <v-btn class="mt-2 text--white" @click="login">Login</v-btn>
                                </div>
                            </v-form>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12 md7>
                    <v-alert :value="display === 1" type="success">
                        Login efetuado com sucesso!
                    </v-alert>
                    <v-alert :value="display === 2" type="error">
                        Login falhado!
                    </v-alert>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
import hash from 'hash.js'
import api from '@/api/api'
import Credentials from '@/assets/scripts/login.js'

export default {
    name: 'LoginComponent',
    data() {
        return {
            username: '',
            password: '',
            passwordVisible: false,
            display: 0 // 0 -> nothing | 1 -> success | 2 -> error
        }
    },
    methods: {
        async login() {
            this.hashedPassword = hash.sha256().update(this.password).digest('hex')
            console.log('Hashed password: ' + this.hashedPassword)

            var component = this
            const response = await api().post('/users/login',{
                username: this.username,
                hashedPassword: this.hashedPassword
            })
            .then (function (response) {
                if (response.data.success) {
                    console.log(response)
                    Credentials.setUsername(response.data.username)
                    Credentials.setId(response.data.id)
                    Credentials.setRank(response.data.rank)
                    component.display = 1
                } else {
                    console.log(response)
                    component.display = 2
                }
            })
            .catch (function (error) {
                console.log(error)
                component.display = 2
            })
        },
        resetDisplay() {
            this.display = 0
        },
        togglePasswordVisibility() {
            this.passwordVisible = !this.passwordVisible
        },
        processInput(event) {
            if (event.key === "Enter") {
                this.login()
            }
        }
    }
}
</script>
