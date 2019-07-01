<template>
    <div>
        <!--SEARCH BAR-->
        <SearchBar/>
        <v-layout>
            <!--SIDE PANEL-->
            <v-flex md3>
                <SidePanel v-bind:categories="categoriesList" v-bind:collections="collectionsList"/>
            </v-flex>
            <v-flex md9>
                <!--TOP "NAVBAR"-->
                <v-layout row>
                    <v-flex md8>
                        <v-btn color="info" style="margin-left: 40px;" @click="displayInsertionForm()">+ Inserir peça</v-btn>
                    </v-flex>
                    <v-flex md2>
                        <v-pagination
                        v-model="page"
                        :length="10"
                        :total-visible="5"
                        ></v-pagination>
                    </v-flex>
                </v-layout>
                <InsertSingleAsset v-if="displayInsertionFormButton"/>
                <!--ASSETS LIST-->
                <AssetsList v-bind:assetsList="assetsList"/>
                <!--BOTTOM "NAVBAR"-->
                <v-layout row class="mb">
                    <v-flex md10>
                        <v-btn color="info" style="margin-left: 40px;" @click="displayInsertionForm()">+ Inserir peça</v-btn>
                    </v-flex>
                    <v-flex md2>
                        <v-btn color="info" style="margin-left: 40px;" @click="displayInsertionForm()">+ Inserir peça</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>

import AssetsList from '@/components/assets/search/AssetsList'
import SearchBar from '@/components/assets/search/SearchBar'
import InsertSingleAsset from '@/components/assets/insertion/InsertSingleAsset'
import SidePanel from '@/components/assets/search/SidePanel'

import api from '@/api/api'
import Credentials from '@/assets/scripts/login'

export default {
	name: 'Assets',
	components: {
        AssetsList,
        SearchBar,
        InsertSingleAsset,
        SidePanel
    },
    data() {
        return {
            displayInsertionFormButton: false,
            assetsList: [],
            categoriesList: [],
            collectionsList: [],
            page: 1
        }
    },
    methods: {
        displayInsertionForm() {
            this.displayInsertionFormButton = !this.displayInsertionFormButton
        },
        async fetchListOfAssets() {
            const response = await api().get('/assets')
            this.assetsList = response.data
        },
        async fetchCategories() {
            const response = await api().get('/category')
            this.categoriesList = response.data
        },
        async fetchCollections() {
            const response = await api().get('/collection')
            this.collectionsList = response.data
        }
    },
    created() {
        this.fetchListOfAssets()
        this.fetchCategories()
        this.fetchCollections()
    }
}
</script>

<style scoped>

    .mb {
        margin-bottom: 20px;
    }

</style>
