<template>
    <v-app>
        <v-container>
            <DisplayObjectIdentification v-if="dataIsLoaded" v-bind:asset="asset.data"/>
            <DisplayObjectDescription v-if="dataIsLoaded" v-bind:asset="asset.data"/>
            <DisplayObjectLocation v-if="dataIsLoaded" v-bind:asset="asset.data"/>
            <DisplayObjectHistory v-if="dataIsLoaded" v-bind:asset="asset.data"/>
        </v-container>
        <!--<AssetGlobal v-if="dataIsLoaded" v-bind:asset="asset.data"/>
        <AssetSpecific v-if="dataIsLoaded" v-bind:asset="asset.data"/>-->
    </v-app>
</template>

<script>
import AssetGlobal from '@/components/assets/singleAsset/AssetGlobal'
import AssetSpecific from '@/components/assets/singleAsset/AssetSpecific'

import DisplayObjectIdentification from '@/components/assets/objectIdentification/DisplayObjectIdentification'
import DisplayObjectDescription from '@/components/assets/objectDescription/DisplayObjectDescription'
import DisplayObjectLocation from '@/components/assets/objectLocation/DisplayObjectLocation'
import DisplayObjectHistory from '@/components/assets/objectHistory/DisplayObjectHistory'

import api from '@/api/api'
import Credentials from '@/assets/scripts/login'

export default {
    name: 'Asset',
    components: {
        /*AssetGlobal,
        AssetSpecific*/
        DisplayObjectIdentification,
        DisplayObjectDescription,
        DisplayObjectLocation,
        DisplayObjectHistory
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
