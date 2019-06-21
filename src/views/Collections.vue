<template>
    <div>
        <SearchBar/>
        <v-btn color="info" @click="displayInsertionForm()">+ Inserir coleção</v-btn>
        <InsertSingleCollection v-if="displayInsertionFormButton"/>
        <CollectionsList/>
    </div>
</template>

<script>
import CollectionsList from '@/components/collections/search/CollectionsList'
import SearchBar from '@/components/collections/search/SearchBar'
import InsertSingleCollection from '@/components/collections/insertion/InsertSingleCollection'

export default {
	name: 'Collections',
	components: {
        CollectionsList,
        SearchBar,
        InsertSingleCollection
    },
    data() {
        return {
            displayInsertionFormButton: false
        }
    },
    methods: {
        displayInsertionForm() {
            this.displayInsertionFormButton = !this.displayInsertionFormButton
        }
    }
}
</script>