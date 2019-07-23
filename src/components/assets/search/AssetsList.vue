<template>
    <div>
        <v-card v-for="asset in assetsList" v-bind:key="asset._id" class="single-asset">
                <v-layout align-center>
                    
                    <v-flex sm12 md12>
                        <router-link :to="'/assets/' + asset._id" class="text--no-decoration single-asset-link">
                            <v-layout wrap v-resize="onResize">
                                <v-flex sm12 md2 v-if="windowWidth > 958" style="min-width: 150px;">
                                   <v-img width="150px" :src="require('@/assets/images/image-placeholder.jpg')"></v-img> 
                                </v-flex>
                                <v-flex sm12 md9>
                                    <v-layout row wrap class="pd">
                                        <v-flex class="asset-title" xs12 sm12 md12>
                                            <p v-if="asset.ObjectIdentification.title">{{ asset.ObjectIdentification.title }}</p>
                                            <p v-else><i>Peça sem título</i></p>
                                        </v-flex>
                                        <v-flex class="asset-category" sx12 sm12 md12>
                                            <p v-if="asset.ObjectDescription.category">{{ asset.ObjectDescription.category }}</p>
                                            <p v-else><i>Peça sem categoria</i></p>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </router-link>
                    </v-flex>
                </v-layout>
        </v-card>
    </div>
</template>

<script>
import api from '@/api/api'
import Credentials from '@/assets/scripts/login'

export default {
    name: 'AssetsList',
    props: ['assetsList'],
    data() {
        return {
            windowWidth: 0
        }
    },
    methods: {
        onResize() {
            this.windowWidth = window.innerWidth
        }
    },
    mounted() {
        this.onResize()
    }
}


</script>

<style>

    .single-asset {
        margin: 10px 40px 10px 40px;
    }

    .single-asset:hover {
        padding: 5px;
    }

    .single-asset-link {
        text-decoration: none;
        color: black;
    }

    .asset-title {
        font-size: 27px;
        margin-top: 30px;
    }

    .asset-category {
        font-size: 21px;
    }

    .pd {
        padding-left: 20px;
    }

</style>