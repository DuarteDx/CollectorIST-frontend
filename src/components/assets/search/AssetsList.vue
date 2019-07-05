<template>
    <div>
        <v-card v-for="asset in assetsList" v-bind:key="asset._id" class="single-asset">
                <v-layout align-center>
                    
                    <v-flex sm11 md11>
                        <router-link :to="'/assets/' + asset._id" class="text--no-decoration single-asset-link">
                            <v-layout wrap>
                                <v-flex md2>
                                   <v-img width="150px" :src="require('@/assets/images/image-placeholder.jpg')"></v-img> 
                                </v-flex>
                                <v-flex md9>
                                    <v-layout row wrap>
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

                    <v-flex md1 style="font-size: 25px;">
                        <font-awesome-icon @click.stop="deleteAsset(asset._id)" icon="trash" style="cursor: pointer;"/>
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
        }
    },
    methods: {
        async deleteAsset(assetId) {
            if(this.confirmDeletion()){
                console.log(assetId)
                const response = await api().delete('/assets/' + assetId + '/' + Credentials.getToken())
                console.log(response)
                var deletedIndex = this.assetsList.findIndex(x => x._id == assetId)
                this.assetsList.splice(deletedIndex, 1)
            }
        },
        confirmDeletion() {
            if (confirm('Tem a certeza que pretende apagar esta peça?')) {
                    return true
                } else {
                    return false
                }
            }
    },
    created() {
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

</style>