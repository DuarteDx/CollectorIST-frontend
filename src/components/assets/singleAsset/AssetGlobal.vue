<template>
    <v-container class="template">
        <v-layout>
            <v-flex xs10 sm5 md3>
                <v-img :src="require('@/assets/images/image-placeholder.jpg')"></v-img>
            </v-flex>
            <v-flex xs12 md9>
                <!--TITLE-->
                <v-layout align-center justify-space-between row>
                    <v-flex md12 class="main-title">
                        <h1 v-if="asset.title" class="ml">{{ asset.title }}</h1>
                        <h1 v-else class="ml"><i>Peça sem título</i></h1>
                    </v-flex>
                </v-layout>
                <!--CATEGORY-->
                <v-layout align-center justify-start row wrap>
                    <v-flex md12 class="category-name">
                        <span class="ml"> Categoria:</span> 
                    </v-flex>
                    <v-flex md12 class="category-data">
                        <span v-for="(category, key, index) in asset.category.path" class="ml" v-bind:key="index">{{category}} > </span>
                        <span>{{asset.category.title}}</span>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex md6 class="category-name">
                <span>Localização habitual:</span>
            </v-flex>
            <!--USUAL LOCATION-->
            <v-flex md6 v-if="asset.location[asset.location.length-1].usual.istSpace.room" class="category-data">
                <span v-for="(space, key) in istUsualSpacesPath" v-bind:key="key" >{{space}} <span v-if="key < istUsualSpacesPath.length - 1 "> > </span> </span>
            </v-flex>
            <template v-if="asset.location[asset.location.length-1].usual.coordinates.lat">
                <v-flex md3 class="category-data">
                    <span> Latitude: {{asset.location[asset.location.length-1].usual.coordinates.lat}} </span>
                </v-flex>
                <v-flex md3 class="category-data">
                    <span> Longitude: {{asset.location[asset.location.length-1].usual.coordinates.long}} </span>
                </v-flex>
            </template>
            <v-flex md6 v-if="asset.location[asset.location.length-1].usual.address.name" class="category-data">
                <span> Morada: {{asset.location[asset.location.length-1].usual.address.name}} </span>
            </v-flex>

            <!--CURRENT LOCATION-->
            <v-flex md6 class="category-name">
                <span>Localização atual:</span>
            </v-flex>
            <v-flex md6 v-if="asset.location[asset.location.length-1].current.istSpace.room" class="category-data">
                <span v-for="(space, key) in istCurrentSpacesPath" v-bind:key="key" >{{space}} <span v-if="key < istCurrentSpacesPath.length - 1 "> > </span> </span>
            </v-flex>
            <template v-if="asset.location[asset.location.length-1].current.lat">
                <v-flex md3 class="category-data">
                    <span> Latitude: {{asset.location[asset.location.length-1].current.lat}} </span>
                </v-flex>
                <v-flex md3 class="category-data">
                    <span> Longitude: {{asset.location[asset.location.length-1].current.long}} </span>
                </v-flex>
            </template>
            <v-flex md6 v-if="asset.location[asset.location.length-1].current.address.name" class="category-data">
                <span> Morada: {{asset.location[asset.location.length-1].current.address.name}} </span>
            </v-flex>

        </v-layout>
        <!--DOCUMENTS-->
        <h2>Documentos: </h2>
        <v-layout class="document" v-for="(document, key, index) in asset.documents" v-bind:key="index">
            <v-flex md3>
                <v-img width="100px" :src="require('@/assets/images/image-placeholder.jpg')"></v-img>
            </v-flex>
            <v-flex md9>
                <span v-if="document.description != null">{{document.description}}</span>
                <span v-else><i>Documento sem descrição</i></span>
            </v-flex>
        </v-layout>
        <v-layout v-if="asset.documents.length == 0">
            <v-flex md12 class="category-data">
                <span><i>Não existem documentos associados a esta obra</i></span>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
import api from '@/api/api'
import axios from 'axios'
import Credentials from '@/assets/scripts/login'

export default {
    name: 'AssetGlobal',
    props: ['asset'],
    data() {
        return {
            istUsualSpacesPath: [],
            istCurrentSpacesPath: []
        }
    },
    methods: {
        async fetchLocationsTree() {
            const spacesUrl = 'https://fenix.tecnico.ulisboa.pt/api/fenix/v1/spaces/'
            var parentId = null
            // USUAL LOCATION
            var spaceInfo = await axios.get(spacesUrl + this.asset.location[0].usual.istSpace.room)
            this.istUsualSpacesPath.push(spaceInfo.data.name)
            while(spaceInfo.data.parentSpace) {
                this.istUsualSpacesPath.push(spaceInfo.data.parentSpace.name)
                try {
                    parentId = spaceInfo.data.parentSpace.id
                    spaceInfo = await axios.get(spacesUrl + parentId)
                }
                catch {
                    //No more parents
                }
            }
            this.istUsualSpacesPath.reverse()
            // CURRENT LOCATION
            var spaceInfo = await axios.get(spacesUrl + this.asset.location[0].current.istSpace.room)
            this.istCurrentSpacesPath.push(spaceInfo.data.name)
            while(spaceInfo.data.parentSpace) {
                this.istCurrentSpacesPath.push(spaceInfo.data.parentSpace.name)
                try {
                    parentId = spaceInfo.data.parentSpace.id
                    spaceInfo = await axios.get(spacesUrl + parentId)
                }
                catch {
                    //No more parents
                }
            }
            this.istCurrentSpacesPath.reverse()
        }
    },
    created() {
        this.fetchLocationsTree()
    }
}
</script>

<style scoped>

    .template {
        background-color: rgba(0, 128, 0, 0.226);
    }

    .main-title {
        margin: 0 0 20px 0 !important;
    }

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

    .ml {
        margin-left: 30px;
    }

    .document {
        margin: 20px 0 20px 0;
    }

</style>