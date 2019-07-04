<template>
    <div>
        <SearchBar/>
        <v-btn color="info" style="margin-left: 40px;" @click="displayInsertionForm()">+ Inserir coleção</v-btn>
        <InsertSingleCollection v-if="displayInsertionFormButton"/>
        <CollectionsList v-bind:collectionsList="collectionsList"/>
    </div>
</template>

<script>
import CollectionsList from '@/components/collections/search/CollectionsList'
import SearchBar from '@/components/collections/search/SearchBar'
import InsertSingleCollection from '@/components/collections/insertion/InsertSingleCollection'

import api from '@/api/api'
import Credentials from '@/assets/scripts/login.js'

export default {
	name: 'Collections',
	components: {
        CollectionsList,
        SearchBar,
        InsertSingleCollection
    },
    data() {
        return {
            displayInsertionFormButton: false,
            collectionsList: []
        }
    },
    methods: {
        displayInsertionForm() {
            this.displayInsertionFormButton = !this.displayInsertionFormButton
        },
        async fetchListOfCollections() {
            const response = await api().get('/collection')
            this.collectionsList = response.data
        }
    },
    created() {
        this.fetchListOfCollections()
    }
}
</script>