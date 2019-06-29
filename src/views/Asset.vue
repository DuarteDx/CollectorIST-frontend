<template>
    <v-app>
        <AssetGlobal v-if="dataIsLoaded" v-bind:asset="asset.data"/>
        <AssetSpecific v-if="dataIsLoaded" v-bind:asset="asset.data"/>
    </v-app>
</template>

<script>
import AssetGlobal from '@/components/assets/singleAsset/AssetGlobal'
import AssetSpecific from '@/components/assets/singleAsset/AssetSpecific'

import api from '@/api/api'
import Credentials from '@/assets/scripts/login'

export default {
    name: 'Asset',
    components: {
        AssetGlobal,
        AssetSpecific
    },
    data() {
        return {
            asset: {},
            dataIsLoaded: false
        }
    },
    methods: {
        async getAssetInfo() {
            this.asset = await api().get('/assets/' + this.$route.params.id + '/' + Credentials.getToken())
            this.dataIsLoaded = true
        }
    },
    created() {
        this.getAssetInfo()
    }
}
</script>
