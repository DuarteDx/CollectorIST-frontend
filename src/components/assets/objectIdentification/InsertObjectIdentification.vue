<template>
    <div>
        <h1 style="color: red;">Object Identification</h1>
        <h2>Informação do objecto</h2>
        <!--TITLE-->
        <v-text-field
        v-model="ObjectIdentification.title"
        label="Título"
        required
        v-on:input="updateStore()"
        solo
        ></v-text-field>

        <!--OPTIONAL IDs-->
         <v-layout>
             <v-flex sm12 md12>
                 <span>Ids opcionais</span>
             </v-flex>
         </v-layout>
         <v-layout v-for="(object, index) in ObjectIdentification.optionalIds" v-bind:key="index">
             <v-flex sm6 md6>
                <v-select
                :items="listOfNonPickedOptionalIds"
                v-model="idsKeys[index]"
                label="Id opcional..."
                v-on:input="updateListOfNonPickedOptionalIds(index)"
                solo
                ></v-select>
             </v-flex>
             <v-flex sm6 md6>
                <v-text-field
                v-model="idsValues[index]"
                label="Valor"
                required
                v-on:input="updateListOfNonPickedOptionalIds(index)"
                solo
                ></v-text-field>
             </v-flex>
         </v-layout>
         <v-layout>
             <v-flex sm12 md12>
                 <v-icon large @click="addOptionalIdInput()">add_circle_outline</v-icon>
                 <v-icon large @click="removeOptionalIdInput()">remove_circle_outline</v-icon>
             </v-flex>
         </v-layout>
    </div>
</template>

<script>
import AssetInsertionStore from '@/assets/store/AssetInsertionStore'
import api from '@/api/api'

export default {
    name: 'InsertObjectIdentification',
    data() {
        return {
            ObjectIdentification: {
                title: '',
                optionalIds: []
            },
            listOfOptionalIds: [],
            listOfNonPickedOptionalIds: [],
            idsKeys: [],
            idsValues: []
        }
    },
    methods: {
        updateStore() {
            AssetInsertionStore.setObjectIdentification(this.ObjectIdentification)
        },
        async fetchOptionalIds() {
            let response = await api().get('/assets/object-identification/optional-id')
            this.listOfOptionalIds = response.data
            this.listOfNonPickedOptionalIds = response.data
        },
        addOptionalIdInput() {
            this.ObjectIdentification.optionalIds.push({})
        },
        removeOptionalIdInput() {
            this.ObjectIdentification.optionalIds[this.ObjectIdentification.optionalIds.length-1] = {}
            this.idsKeys[this.ObjectIdentification.optionalIds.length-1] = null
            this.idsValues[this.ObjectIdentification.optionalIds.length-1] = null
            this.ObjectIdentification.optionalIds.splice(this.ObjectIdentification.optionalIds.length-1, 1)
        },
        updateListOfNonPickedOptionalIds(idIndex) {
            this.ObjectIdentification.optionalIds[idIndex][this.idsKeys[idIndex]] = this.idsValues[idIndex]
            this.updateStore()
        }
    },
    created() {
        this.fetchOptionalIds()
    }
}
</script>
