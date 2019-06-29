<template>
    <div>
        <SearchBar/>
        <v-btn color="info" style="margin-left: 40px;" @click="displayInsertionForm()">+ Inserir peça</v-btn>
        <InsertSingleAsset v-if="displayInsertionFormButton"/>
        <AssetsList v-bind:assetsList="assetsList"/>
    </div>
</template>

<script>

import AssetsList from '@/components/assets/search/AssetsList'
import SearchBar from '@/components/assets/search/SearchBar'
import InsertSingleAsset from '@/components/assets/insertion/InsertSingleAsset'

import api from '@/api/api'
import Credentials from '@/assets/scripts/login'

export default {
	name: 'Assets',
	components: {
        AssetsList,
        SearchBar,
        InsertSingleAsset
    },
    data() {
        return {
            displayInsertionFormButton: false,
            assetsList: []
        }
    },
    methods: {
        displayInsertionForm() {
            this.displayInsertionFormButton = !this.displayInsertionFormButton
        },
        async fetchListOfAssets() {
            const response = await api().get('/assets')
            this.assetsList = response.data
        }
    },
    created() {
        this.fetchListOfAssets()
    }
}
</script>
