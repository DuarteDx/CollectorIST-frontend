<template>
    <div>
        <SearchBar/>
        <v-btn color="info" style="margin-left: 40px;" @click="displayInsertionForm()">+ Inserir peça</v-btn>
        <InsertSingleAsset v-if="displayInsertionFormButton"/>
        <AssetsList/>
        <!--<v-layout justify-center>
            <v-flex sm5 md3 style="font-size: 20px; margin: 20px 0 10px 0;">
                List of assets in database
            </v-flex>
        </v-layout>-->
    </div>
</template>

<script>

import AssetsList from '@/components/assets/search/AssetsList'
import SearchBar from '@/components/assets/search/SearchBar'
import InsertSingleAsset from '@/components/assets/insertion/InsertSingleAsset'

export default {
	name: 'Assets',
	components: {
        AssetsList,
        SearchBar,
        InsertSingleAsset
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
