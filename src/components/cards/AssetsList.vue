<template>
    <div>
        <v-card v-for="asset in assetsList" v-bind:key="asset._id" class="single-asset">
            <v-layout align-center>
                <v-flex md11>
                    <v-layout wrap>
                    <template v-for="(value, key) in asset">
                        <v-flex md1 v-bind:key="key">
                            <p>{{ key }}</p>
                        </v-flex>
                        <v-flex md11 v-bind:key="value">
                            <p>{{ value }}</p>
                        </v-flex>
                    </template>
                </v-layout>
                </v-flex>

                <v-flex md1 style="font-size: 25px;">
                    X
                </v-flex>
            </v-layout>
        </v-card>
    </div>
</template>

<script>
import api from '@/api/api'

export default {
    name: 'SingleAsset',
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
        async deleteAsset() {
            // ToDO
        }
    },
    created() {
        this.fetchListOfAssets()
    }
}


</script>

<style>

    .single-asset {
        margin: 10px 40px 10px 40px;
    }

</style>