<template>
    <div>
        <h1 style="color: red;">Object Collection</h1>
        <!--CATEGORY-->
        <div class="mb">
            <h3>Coleção</h3>
            <v-select
            :items="listOfCollections"
            v-model="ObjectCollection.collection"
            v-on:change="updateStore()"
            label="Coleção"
            solo
            ></v-select>
        </div>
    </div>
</template>

<script>
// Api
import api from '@/api/api'
// Stores
import Credentials from '@/assets/scripts/login.js'
import AssetInsertionStore from '@/assets/store/AssetInsertionStore'


export default {
    name: 'InsertObjectCollection',
    components: {
    },
    data() {
        return {
            listOfCollections: [],
            ObjectCollection: {
                collection: null
            }
        }
    },
    methods: {
        async fetchUserCollections() {
            let response = await api().get('/assets/object-collection/users/' + Credentials.getToken())
            this.listOfCollections = response.data
        },
        updateStore() {
            AssetInsertionStore.setObjectCollection(this.ObjectCollection)
        }
    },
    created() {
        this.fetchUserCollections()
    }
}
</script>
