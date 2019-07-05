<template>
    <v-container>
        <!--Editor link to object edit page-->
        <v-layout v-if="authorized">
            <v-flex md12>
                <router-link style="text-decoration: none;" :to="'/assets/' + this.$route.params.id + '/edit'">
                    <div class="edit-link">
                        <v-icon large @click.stop="">edit</v-icon> Editar
                    </div>
                </router-link>
            </v-flex>
        </v-layout>
        <!--Object components-->
        <DisplayObjectIdentification v-if="dataIsLoaded" v-bind:asset="asset.data"/>
        <DisplayObjectDescription v-if="dataIsLoaded" v-bind:asset="asset.data"/>
        <DisplayObjectLocation v-if="dataIsLoaded" v-bind:asset="asset.data"/>
        <DisplayObjectHistory v-if="dataIsLoaded" v-bind:asset="asset.data"/>
    </v-container>
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
    name: 'DisplayAsset',
    components: {
        DisplayObjectIdentification,
        DisplayObjectDescription,
        DisplayObjectLocation,
        DisplayObjectHistory
    },
    data() {
        return {
            asset: {},
            dataIsLoaded: false,
            authorized: false
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
        this.authorized = Credentials.checkIfAdmin()
    }
}
</script>

<style scoped>

    .edit-link {
        text-align: end;
        text-decoration: none;
        padding: 10px;
        font-size: 18px;
        color: #737373;
    }

</style>
