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
                        <v-btn @click.stop="changeRank(0)" :color="!userInfo.role.admin && !userInfo.role.editor ? 'success' : ''" :key="updateRoles">Visualizador</v-btn>
                        <v-btn @click.stop="changeRank(1)" :color="userInfo.role.editor ? 'success' : ''" :key="updateRoles+100">Editor</v-btn>
                        <v-btn @click.stop="changeRank(2)" :color="userInfo.role.admin  ? 'success' : ''" :key="updateRoles+200">Administrador</v-btn>
                    </v-flex>
                    <v-flex class="person-id">
                        {{ userInfo.username}}
                    </v-flex>
                </v-layout>
                <span class="collections-key">Coleções:</span>
                <v-layout row wrap class="person-collections">
                    <v-flex sm6 md4 v-for="(collection, index) in userInfo.role.collections" v-bind:key="index">
                            <v-btn color="info" @click.stop="deleteCollection(collection)">{{ collection }} X</v-btn>
                    </v-flex>
                </v-layout>
                <span class="collections-key">Adicionar coleção:</span>
                <form style="margin-top: 30px;">
                    <v-layout>
                        <v-flex md6>
                            <v-select
                            :items="listOfCollections"
                            label="Nome da categoria"
                            v-model="newCollection"
                            solo
                            ></v-select>
                        </v-flex>
                        <v-flex md4>
                            <v-btn @click="addCollection()">Submeter coleção</v-btn>
                        </v-flex>
                    </v-layout>
                </form>
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
                role: {
                    admin: false,
                    editor: false,
                    collections: []
                }
            },
            newCollection: null,
            updateRoles: 0,
            listOfCollections: []
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
        async fetchCollections() {
            let response = await api().get('/assets/object-collection/collections')
            response.data.forEach((collection) => {
                this.listOfCollections.push(collection.title)
            })
        },
        async deleteCollection(collection) {
            if(this.confirmAction('Tem a certeza que pretende apagar esta coleção?')) {
                var component = this
                await api().delete('/users/' +  this.$route.params.istId + '/collections/' + collection + '/' + Credentials.getToken())
                    .then(function() {
                    var deletedIndex = component.userInfo.role.collections.findIndex(x => x == collection)
                    component.userInfo.role.collections.splice(deletedIndex, 1)
                    })
                    .catch(function(error) {
                        console.log(error)
                    })
            }
        },
        async changeRank(newRank) {
            if(this.confirmAction('Tem a certeza que pretende alterar as permissões deste utilizador?')) {
                await api().post('users/' +  this.$route.params.istId + '/rank/' + newRank + '/' + Credentials.getToken())
                    
            }
        },
        async addCollection() {
            var component = this
            await api().post('users/' +  this.$route.params.istId + '/collections/' + Credentials.getToken(), {
                newCollection: component.newCollection
            })
                .then(function() {
                    component.userInfo.role.collections.push(component.newCollection)
                    component.newCollection = ''
                })
                .catch(function(error) {
                    console.log(error)
                })
        },
        confirmAction(text) {
            if (confirm(text)) {
                    return true
                } else {
                    return false
                }
        }
    },
    created() {
        this.fetchUser()
        this.fetchCollections()
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

.currentRank {
    background-color: rgba(175, 230, 93, 0.733) !important;
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
    margin-top: 30px;
    margin-bottom: 60px;
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