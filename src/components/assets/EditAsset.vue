<template>
    <v-container>
        <!--Editor link to object edit page-->
        <v-layout justify-space-between>
            <v-flex sm2 md2>
                <router-link style="text-decoration: none;" :to="'/assets/' + this.$route.params.id">
                    <div class="edit-link text-md-left">
                        <v-icon large>keyboard_backspace</v-icon> Voltar
                    </div>
                </router-link>
            </v-flex>
            <!--Editor link to object edit page-->
            <v-flex sm2 md2>
                <v-btn color="error" @click="deleteAsset()">Apagar peça</v-btn>
            </v-flex>
        </v-layout>
        <h2>Editar Obra</h2>
        <!--Object components-->
        <EditObjectIdentification v-if="dataIsLoaded" v-bind:asset="asset.data.ObjectIdentification"/>
        <EditObjectDescription v-if="dataIsLoaded" v-bind:asset="asset.data.ObjectDescription"/>
        <EditObjectLocation v-if="dataIsLoaded" v-bind:asset="asset.data.ObjectLocation"/>
        <EditObjectHistory v-if="dataIsLoaded" v-bind:asset="asset.data.ObjectHistory"/>
        <EditObjectCollection v-if="dataIsLoaded" v-bind:asset="asset.data.ObjectCollection"/>
    </v-container>
</template>

<script>
import AssetGlobal from '@/components/assets/singleAsset/AssetGlobal'
import AssetSpecific from '@/components/assets/singleAsset/AssetSpecific'

import EditObjectIdentification from '@/components/assets/objectIdentification/EditObjectIdentification'
import EditObjectDescription from '@/components/assets/objectDescription/EditObjectDescription'
import EditObjectLocation from '@/components/assets/objectLocation/EditObjectLocation'
import EditObjectHistory from '@/components/assets/objectHistory/EditObjectHistory'
import EditObjectCollection from '@/components/assets/objectCollection/EditObjectCollection'

import api from '@/api/api'
import Credentials from '@/assets/scripts/login'

export default {
    name: 'EditAssetComponent',
    components: {
        EditObjectIdentification,
        EditObjectDescription,
        EditObjectLocation,
        EditObjectHistory,
        EditObjectCollection
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
        },
        async deleteAsset() {
            if(confirm('Tem a certeza que pretende apagar esta peça?')){
                const response = await api().delete('/assets/' + this.$route.params.id + '/' + Credentials.getToken())
                console.log(response)
                this.$router.go('/assets')
            }
        }
    },
    created() {
        this.getAssetInfo()
    }
}
</script>

<style scoped>

    .edit-link {
        text-align: start;
        text-decoration: none;
        padding: 10px;
        font-size: 18px;
        color: #737373;
    }

</style>
