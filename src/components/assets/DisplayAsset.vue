<template>
    <v-container>
        <v-layout justify-space-between>
            <v-flex sm2 md2>
                <router-link style="text-decoration: none;" :to="'/assets/'">
                    <div class="edit-link text-md-left">
                        <v-icon large>keyboard_backspace</v-icon> Voltar
                    </div>
                </router-link>
            </v-flex>
            <!--Editor link to object edit page-->
            <v-flex sm2 md2 v-if="authorized">
                <router-link style="text-decoration: none;" :to="'/assets/' + this.$route.params.id + '/edit'">
                    <div class="edit-link">
                        <v-icon large @click.stop="">edit</v-icon> Editar
                    </div>
                </router-link>
            </v-flex>
        </v-layout>
        <!--Object components-->
        <DisplayObjectIdentification v-if="dataIsLoaded" v-bind:asset="asset.data"/>
        <DisplayObjectCollection v-if="dataIsLoaded" v-bind:asset="asset.data"/>
        <DisplayObjectDescription v-if="dataIsLoaded" v-bind:asset="asset.data"/>
        <DisplayObjectLocation v-if="dataIsLoaded" v-bind:asset="asset.data"/>
        <DisplayObjectHistory v-if="dataIsLoaded" v-bind:asset="asset.data"/>
        <template v-if="dataIsLoaded">
            <component v-for="(component, index) in asset.data.ObjectDescription.category" :is="component.toLowerCase()+'Display'" v-bind:asset="asset.data" v-bind:key="index"/>
        </template>
    </v-container>
</template>

<script>
// General modules
import DisplayObjectIdentification from '@/components/assets/objectIdentification/DisplayObjectIdentification'
import DisplayObjectDescription from '@/components/assets/objectDescription/DisplayObjectDescription'
import DisplayObjectLocation from '@/components/assets/objectLocation/DisplayObjectLocation'
import DisplayObjectHistory from '@/components/assets/objectHistory/DisplayObjectHistory'
import DisplayObjectCollection from '@/components/assets/objectCollection/DisplayObjectCollection'
// Specific modules
import pinturasDisplay from '@/components/assets/specificModules/pinturas/pinturasDisplay'
import serigrafiaDisplay from '@/components/assets/specificModules/serigrafia/serigrafiaDisplay'
import mineraisDisplay from '@/components/assets/specificModules/minerais/mineraisDisplay'

import api from '@/api/api'
import Credentials from '@/assets/scripts/login'

export default {
    name: 'DisplayAsset',
    components: {
        // General modules
        DisplayObjectIdentification,
        DisplayObjectDescription,
        DisplayObjectLocation,
        DisplayObjectHistory,
        DisplayObjectCollection,
        // Specific modules
        pinturasDisplay,
        serigrafiaDisplay,
        mineraisDisplay
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
        showClassModule() {
            return this.asset.data
        }
    },
    async created() {
        this.getAssetInfo()
        console.log(await Credentials.checkIfCanEdit(this.$route.params.id))
        this.authorized = await Credentials.checkIfCanEdit(this.$route.params.id)
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
