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
        <template v-if="dataIsLoaded">
            <component v-for="(component, index) in asset.data.ObjectDescription.category" :is="component.toLowerCase()+'Edit'" v-bind:asset="asset.data" v-bind:key="index"/>
        </template>
        <EditObjectLocation v-if="dataIsLoaded" v-bind:asset="asset.data.ObjectLocation"/>
        <EditObjectHistory v-if="dataIsLoaded" v-bind:asset="asset.data.ObjectHistory"/>
        <EditObjectCollection v-if="dataIsLoaded" v-bind:asset="asset.data.ObjectCollection"/>
    </v-container>
</template>

<script>
// General modules
import EditObjectIdentification from '@/components/assets/objectIdentification/EditObjectIdentification'
import EditObjectDescription from '@/components/assets/objectDescription/EditObjectDescription'
import EditObjectLocation from '@/components/assets/objectLocation/EditObjectLocation'
import EditObjectHistory from '@/components/assets/objectHistory/EditObjectHistory'
import EditObjectCollection from '@/components/assets/objectCollection/EditObjectCollection'
// Specific modules
import pinturasEdit from '@/components/assets/specificModules/pinturas/pinturasEdit'
import gravurasEdit from '@/components/assets/specificModules/pinturas/gravuras/gravurasEdit'
import serigrafiaEdit from '@/components/assets/specificModules/serigrafia/serigrafiaEdit'
import mineraisEdit from '@/components/assets/specificModules/minerais/mineraisEdit'

import api from '@/api/api'
import Credentials from '@/assets/scripts/login'

export default {
    name: 'EditAssetComponent',
    components: {
        // General modules
        EditObjectIdentification,
        EditObjectDescription,
        EditObjectLocation,
        EditObjectHistory,
        EditObjectCollection,
        // Specific modules
        pinturasEdit,
        gravurasEdit,
        serigrafiaEdit,
        mineraisEdit
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
