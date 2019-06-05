<template>
    <div>
        <v-card v-for="asset in assetsList" v-bind:key="asset._id" class="single-asset">
                <v-layout align-center>
                    
                    <v-flex sm11 md11>
                        <router-link :to="'/assets/' + asset._id" class="text--no-decoration single-asset-link">
                            <v-layout wrap>
                                <template v-for="(value, key) in asset">
                                    <v-flex sm1 md1 offset-sm1 offset-md1 v-bind:key="key">
                                        <p>{{ key }}</p>
                                    </v-flex>
                                    <v-flex sm10 md10 v-bind:key="value">
                                        <p>{{ value }}</p>
                                    </v-flex>
                                </template>
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
    data() {
        return {
            assetsList: []
        }
    },
    methods: {
        async fetchListOfAssets() {
            const response = await api().get('/assets')
            this.assetsList = response.data
        },
        async deleteAsset(assetId) {
            if(this.confirmDeletion()){
                console.log(assetId)
                const response = await api().delete('/assets', {data: {
                    id: assetId
                }})
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
        this.fetchListOfAssets()
        console.log('assetsList: ' + Credentials.token)
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

</style>