<template>
    <v-container>
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
                                {{ convertRank(person.role) }}
                            </v-flex>
                            <v-flex class="person-id">
                                {{ person.username }}
                            </v-flex>
                        </v-layout>
                        <span style="margin-bottom: 10px">Coleções:</span>
                        <v-layout row wrap class="person-collections">
                            <v-flex md2 class="single-collection" v-for="(collection, index) in person.role.collections" v-bind:key="index">
                                    <span>{{ collection }}</span>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex md1>
                        <v-layout column align-center justify-center>
                            <v-flex md6>
                                <v-icon large @click.stop="editUser(person.username)" style="cursor: pointer;margin-bottom: 30px;">edit</v-icon>
                            </v-flex>
                            <v-flex md6>
                                <v-icon large @click.stop="deleteUser(person.username)" style="cursor: pointer">delete_forever</v-icon>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-container>
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
        convertRank(role) {
            if(role.editor) {
                return 'Editor'
            }
            if(role.admin) {
                return 'Administrador'
            }
            else {
                return 'Visualizador'
            }
        },
        async deleteUser(istId) {
            if(this.confirmDeletion()){
                console.log(istId)
                const response = await api().delete('/users', {data: {
                    id: istId
                }})
                console.log(response)
                var deletedIndex = this.usersList.findIndex(x => x.username == istId)
                this.usersList.splice(deletedIndex, 1)
                console.log(deletedIndex)
            }
        },
        confirmDeletion() {
            if (confirm('Tem a certeza que pretende apagar este utilizador?')) {
                    return true
                } else {
                    return false
                }
        },
        async editUser(istId) {
            this.$router.push('/users/manage/' + istId)
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
    background-color: #41a1e6;
    border-radius: 13%;
    margin: 0 5px 10px 5px;
    padding: 5px;
    font-weight: bold;
    text-align: center;
}
</style>
