<template>
    <div>
        <v-layout justify-center>
            <v-flex sm12 md5>
                <h3 class="title">Inserir nova coleção</h3>
            </v-flex>
        </v-layout>
        <v-layout justify-center>
            <v-flex sm8 md7>
                <v-text-field
                label="Título"
                v-model="newCollection.title"
                solo
            ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout justify-center>
            <v-flex sm8 md7>
                <v-textarea
                solo
                name="input-7-4"
                label="Desrição"
                v-model="newCollection.description"
                ></v-textarea>
            </v-flex>
        </v-layout>
        <v-layout justify-center>
            <v-flex sm5 md3>
                <v-btn @click="insertCollection">Inserir</v-btn>
            </v-flex>
        </v-layout>
        <v-layout justify-center>
            <v-flex md5>
                <h3 class="title">Coleções existentes:</h3>
            </v-flex>
        </v-layout>
        <v-layout v-for="(collection, index) in listOfCollections" v-bind:key="index">
            <v-flex sm8 md10 class="collection-name">{{ collection.title }}</v-flex>
            <v-flex sm4 md2 class="delete-collection" @click="deleteCollection()">
                <v-btn color="error" v-on:click.stop="deleteCollection(index)">Apagar</v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import api from '@/api/api'
import Credentials from '@/assets/scripts/login.js'

export default {
    name: 'ConfigObjectCollection',
    data() {
        return {
            newCollection: {
                title: null,
                description: null
            },
            listOfCollections: []
        }
    },
    methods: {
        async fetchCollections() {
            let response = await api().get('/assets/object-collection/collections')
            this.listOfCollections = response.data
        },
        async deleteCollection(collectionIndex) {
            if(confirm('Tem a certeza que pretende apagar a coleção ' + this.listOfCollections[collectionIndex].title + '?')) {
                let response = await api().delete('/assets/object-collection/collections/' + Credentials.getToken(), {data: this.listOfCollections[collectionIndex].title})
                if(response.status === 200) {
                    this.listOfCollections.splice(collectionIndex, 1)
                }
            }
        },
        async insertCollection() {
            let response = await api().post('/assets/object-collection/collections/' + Credentials.getToken(), this.newCollection)
            if(response.status === 200) {
                this.listOfCollections.push(this.newCollection)
            }
        }
    },
    created() {
        this.fetchCollections()
    }
}
</script>

<style scoped>

    .title {
        padding: 20px;
    }

    .collection-name {
        padding: 15px;
    }


</style>
