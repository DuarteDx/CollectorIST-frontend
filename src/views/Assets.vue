<template>
    <div>
        <!--SEARCH BAR-->
        <!--<SearchBar @searchBarParams="updateResults"/>-->
        <v-layout class="mt">
            <!--SIDE PANEL-->
            <v-flex md3 style="margin-bottom: 30px;">
                <SidePanel v-if="modulesReady" v-bind:modules="modules" @sideBarParams="updateResults"/>
                <span style="margin-left:20px;">Resultados: {{ numberOfResults }}</span>
            </v-flex>
            <v-flex md9>
                <!--TOP "NAVBAR"-->
                <v-layout row>
                    <v-flex md2 style="min-width: 180px;">
                        <v-btn color="info" style="margin-left: 40px;" @click="displayInsertionForm()">+ Inserir peça</v-btn>
                    </v-flex>
                    <v-flex md6>
                        
                    </v-flex>
                    <v-flex md2 v-if="numberOfResults/15 > 1">
                        <v-pagination
                        v-model="page"
                        @input="updatePage()"
                        :length="Math.ceil(numberOfResults/15)"
                        :total-visible="5"
                        ></v-pagination>
                    </v-flex>
                </v-layout>
                <!--INSERT ASSET-->
                <InsertAsset v-if="displayInsertionFormButton"/>
                <!--ASSETS LIST-->
                <AssetsList v-if="assetsList.length > 0" v-bind:assetsList="assetsList"/>
                <v-layout v-if="assetsList.length == 0" row justify-center align-center>
                    <v-flex md12 class="no-results">
                        <span>Não foram encontrados resultados...</span>
                    </v-flex>
                </v-layout>
                <!--BOTTOM "NAVBAR"-->
                <v-layout row class="mb">
                    <v-flex md8>
                        <v-btn color="info" style="margin-left: 40px;" @click="displayInsertionForm()">+ Inserir peça</v-btn>
                    </v-flex>
                    <v-flex md2 v-if="numberOfResults/15 > 1">
                        <v-pagination
                        v-model="page"
                        @input="updatePage()"
                        :length="Math.ceil(numberOfResults/15)"
                        :total-visible="5"
                        ></v-pagination>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
// Components
import AssetsList from '@/components/assets/search/AssetsList'
import SearchBar from '@/components/assets/search/SearchBar'
import InsertAsset from '@/components/assets/InsertAsset'
import SidePanel from '@/components/assets/search/SidePanel'
// Api
import api from '@/api/api'
import Credentials from '@/assets/scripts/login'
// Store
import AssetsSearchParams from '@/assets/store/AssetsSearchParams'

export default {
	name: 'Assets',
	components: {
        AssetsList,
        SearchBar,
        InsertAsset,
        SidePanel
    },
    data() {
        return {
            searchParams: {},
            displayInsertionFormButton: false,
            assetsList: [],
            modules: {},
            modulesReady: false,
            page: 1,
            numberOfResults: 0
        }
    },
    methods: {
        displayInsertionForm() {
            this.displayInsertionFormButton = !this.displayInsertionFormButton
        },
        // FETCH DATA FROM SERVER
        async fetchListOfAssets() {
            const response = await api().get('/assets')
            this.assetsList = response.data
        },
        async fetchModules() {
            const response = await api().get('/assets/modules')
            this.modulesReady = true
            this.modules = response.data
        },
        // UPDATE RESULTS
        async search() {
            let response = await api().get('/assets/search', {
                params: this.searchParams
            })
            // Get and remove number of results from asset array
            this.numberOfResults = response.data.shift()
            this.assetsList = response.data
        },
        updateResults() {
            this.searchParams = AssetsSearchParams.getSearchParams()
            this.searchParams.currentPage = 1
            this.page = 1
            console.log(this.searchParams)
            this.search()
        },
        updatePage() {
            AssetsSearchParams.setCurrentPage(this.page)
            this.searchParams = AssetsSearchParams.getSearchParams()
            this.search()
        }
    },
    created() {
        this.page = AssetsSearchParams.getCurrentPage()
        this.searchParams = AssetsSearchParams.getSearchParams()
        this.search()
        this.fetchModules()
        console.log(location.href)
    }
}
</script>

<style scoped>

    .mb {
        margin-bottom: 20px;
    }

    .mt {
        margin-top: 60px;
    }

    .no-results {
        text-align: center;
        margin: 40px 0 40px 0;
        font-size: 31px;
        color: rgba(151, 150, 150, 0.644);
    }
</style>
