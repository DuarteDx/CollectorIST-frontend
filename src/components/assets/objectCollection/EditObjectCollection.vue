<template>
    <div style="background-color: rgba(0, 128, 0, 0.226)">
        <v-layout>
            <v-flex>
                <h1 style="color: red;">Object Collection</h1>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex sm12 md6 class="category-name">
                <span class="ml">Coleção:</span>
            </v-flex>
            <v-flex sm12 md6>
                <v-select
                :items="listOfCollections"
                :label="asset.collection"
                v-model="newCollection"
                solo
                ></v-select>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex>
                <v-btn color="info" @click="submit()">Editar</v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
// Api
import api from '@/api/api'
// Stores
import Credentials from '@/assets/scripts/login.js'

export default {
    name: 'EditObjectCollection',
    props: ['asset'],
    data() {
        return {
            listOfCollections: [],
            newCollection: null
        }
    },
    methods: {
        async submit() {
            await api().put('/assets/' + this.$route.params.id + '/object-collection/edit/' + Credentials.getToken(), {
                collection: this.newCollection
            })
        },
        async fetchCollections() {
            let response = await api().get('/assets/object-collection/users/' + Credentials.getToken())
            this.listOfCollections = response.data
        }
    },
    created() {
        this.fetchCollections()
    }
}
</script>

<style scoped>

    .category-name {
        margin: 20px 0 20px 0;
        margin-left: 0 !important;
        font-size: 20px;
    }

    .category-data {
        margin: 20px 0 20px 0;
        font-size: 20px;
        color: #898989;
    }

</style>

