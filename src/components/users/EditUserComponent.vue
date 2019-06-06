<template>
    <v-container>
        <v-layout>
            <v-flex md3>
                <img class="image" :src="'data:image/jpeg;base64,' + userInfo.picture.data" style="width: 200px;height:200px;">
            </v-flex>
            <v-flex md9>
                <v-layout column>
                    <v-flex class="person-name">
                        {{ userInfo.name}}
                    </v-flex>
                    <v-flex class="person-rank">
                        <span class="select-rank">Visualizador</span>
                        <span class="select-rank">Editor</span>
                        <span class="select-rank">Administrador</span>
                    </v-flex>
                    <v-flex class="person-id">
                        {{ userInfo.username}}
                    </v-flex>
                    </v-layout>
                    <span class="collections-key">Coleções:</span>
                    <v-layout row wrap class="person-collections">
                        <v-flex md2 class="single-collection" v-for="(collection, index) in userInfo.collections" v-bind:key="index">
                                <span>{{ collection }}</span>
                                <span @click.stop="deleteCollection(collection)" class="delete-collection">X</span>
                        </v-flex>
                    </v-layout>
                    <span class="collections-key">Adicionar coleção:</span>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Credentials from '@/assets/scripts/login.js'
import api from '@/api/api'

export default {
    name: 'EditUserComponent',
    data() {
        return {
            userInfo: {
                name: null,
                username: null,
                picture: {
                    type: null,
                    data: null
                },
                rank: 0,
                collections: null
            }
        }
    },
    methods: {
        async fetchUser() {
            var component = this
            await api().get('/users/' +  this.$route.params.istId + '/' + Credentials.getToken())
                .then(function(response) {
                    component.userInfo = response.data
                    console.log(component.userInfo)
                })
                .catch(function(error) {
                    console.log(error)
                })
        },
        async deleteCollection(collection) {
            await api().delete('/users/' +  this.$route.params.istId + '/collections/' + collection + '/' + Credentials.getToken())
                .then(function(response) {
                    console.log(response)
                })
                .catch(function(error) {
                    console.log(error)
                })
        }
    },
    created() {
        this.fetchUser()
    }

}
</script>

<style scoped>

.image {
    box-shadow:0px 0px 4px -2px #000;
    border-radius: 50%;
}

.person-name {
    font-family: Raleway;
    font-size: 31px;
}

.person-rank {
    margin: 30px 0 30px 0;
}

.select-rank {
    font-family: Raleway;
    font-size: 20px;
    margin-right: 30px;
    background-color: rgba(200, 200, 200, 0.63);
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
}

.person-id {
    font-size: 20px;
    margin-bottom: 30px;
}

.collections-key {
    font-family: Raleway;
    font-size: 27px;
}

.person-collections {
    font-family: Raleway;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 20px;
}

.single-collection {
    background-color: #41a1e6;
    border-radius: 13%;
    padding: 5px;
    font-weight: bold;
    display: inline-block;
    text-align: center;
}

.delete-collection {
    margin-left: 7px;
    background-color: rgb(207, 60, 60);
    color: white;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
}
</style>