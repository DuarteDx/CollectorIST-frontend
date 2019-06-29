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
            <v-flex md6 class="category-data">
                <span>Alameda > Torre Norte > Piso 3 > Sala 4{{/*asset.location[0].usual*/}}</span>
            </v-flex>
            <v-flex md6 class="category-name">
                <span>Localização atual:</span>
            </v-flex>
            <v-flex md6 class="category-data">
                <span>Taguspark > Pavilhão 3 > Sala de Informática 2{{/*asset.location[0].current*/}}</span>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import api from '@/api/api'
import Credentials from '@/assets/scripts/login'

export default {
    name: 'AssetGlobal',
    props: ['asset'],
    data() {
        return {
        }
    },
    methods: {
        async fetchLocationsTree() {

        }
    },
    created() {
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

</style>