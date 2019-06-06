<template>
    <div>
        <v-card v-for="person in usersList" v-bind:key="person.username" class="single-card">
            <v-container>
                <v-layout>
                    <v-flex md2>
                        <img class="image" :src="'data:image/jpeg;base64,' + person.picture.data" style="width: 100px;height:100px;">
                    </v-flex>
                    <v-flex md9>
                        <v-layout column>
                            <v-flex class="person-name">
                                {{ person.name }}
                            </v-flex>
                            <v-flex class="person-rank">
                                {{ convertRank(person.rank) }}
                            </v-flex>
                            <v-flex class="person-id">
                                {{ person.username }}
                            </v-flex>
                            <v-flex class="person-collections">
                                Coleções:
                                <div v-for="(collection, index) in person.collections" v-bind:key="index">
                                    <span class="single-collection">{{ collection }}</span>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex md1>
                        <v-layout column align-center justify-center>
                            <v-flex md6>
                                <v-icon large>edit</v-icon>
                            </v-flex>
                            <v-flex md6>
                                <v-icon large>delete_forever</v-icon>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </div>
</template>

<script>
import Credentials from '@/assets/scripts/login.js'
import api from '@/api/api'

export default {
    name: 'ManageUsersList',
    data() {
        return {
            usersList: []
        }
    },
    methods: {
        async fetchUsersList() {
            var component = this
            await api().get('/users/all/' + Credentials.getToken())
                .then(function(response) {
                    component.usersList = response.data
                })
                .catch(function(error) {
                    console.log(error)
                })
        },
        convertRank(number) {
            switch(number) {
                case 0:
                    return 'Visualizador'
                case 1:
                    return 'Editor'
                case 2:
                    return 'Administrador'
                default:
                    return 'Indefinido'
            }
        }
    },
    created() {
        this.fetchUsersList()
    }
}
</script>

<style scoped>

.single-card {
    margin: 10px 40px 10px 40px;
}

.single-card:hover {
    padding: 5px;
}

.image {
    box-shadow:0px 0px 4px -2px #000;
    border-radius: 50%;
}

.person-name {
    font-family: Raleway;
    font-size: 20px;
}

.person-rank {
    font-family: Raleway;
}

.person-id {
    font-size: 16px;
}

.person-collections {
    font-family: Raleway;
    margin-top: 10px;
    font-size: 16px;
}

.single-collection {
    margin-left: 8px;
    margin-right: 0;
    background-color: #41a1e6;
    border-radius: 20%;
    padding: 5px;
    font-weight: bold;
}
</style>
