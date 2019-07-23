<template>
    <div style="background-color: rgba(0, 128, 0, 0.226)">
        <v-layout>
            <v-flex xs12 md12>
                <h1 style="color: red;">Object Identification</h1>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 sm12 md5 class="category-name">
                <span class="ml">Título:</span>
            </v-flex>
            <v-flex xs12 sm12 md6>
                <v-text-field
                v-model="title"
                solo
                :placeholder="asset.title"
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 sm12 md6 class="category-name">
                <span class="ml">Id Opcional:</span>
            </v-flex>
        </v-layout>

        <v-layout v-for="(object, index) in selectedOptionalIds" v-bind:key="index">
            <v-flex sm5 md5 offset-md1>
                <v-select
                :items="listOfNonPickedOptionalIds"
                v-model="idsKeys[index]"
                label="Id opcional..."
                v-on:input="updateListOfNonPickedOptionalIds(index)"
                solo
                ></v-select>
            </v-flex>
            <v-flex sm5 md4 offset-md1>
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
            <v-flex sm12 md11 offset-md1>
                <v-icon large @click="addOptionalIdInput()">add_circle_outline</v-icon>
                <v-icon large @click="removeOptionalIdInput()">remove_circle_outline</v-icon>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex md12>
                <v-btn @click="submit()" color="info" >Editar</v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
// Api
import api from '@/api/api'
// Stores
import Credentials from '@/assets/scripts/login.js'

export default {
    name: 'EditObjectIdentification',
    props: ['asset'],
    data() {
        return {
            title: '',
            configData: {},
            listOfOptionalIds: [],
            listOfNonPickedOptionalIds: [],
            selectedOptionalIds: [],
            idsKeys: [],
            idsValues: []
        }
    },
    methods: {
        async submit() {
            await api().put('/assets/' + this.$route.params.id + '/object-identification/edit/' + Credentials.getToken(), {
                title: this.title,
                optionalIds: this.selectedOptionalIds
            })
        },
        async fetchOptionalIds() {
            let response = await api().get('/assets/object-identification/optional-id')
            this.listOfOptionalIds = response.data
            this.listOfNonPickedOptionalIds = response.data
        },
        addOptionalIdInput() {
            this.selectedOptionalIds.push({})
        },
        removeOptionalIdInput() {
            this.selectedOptionalIds[this.selectedOptionalIds.length-1] = {}
            this.idsKeys[this.selectedOptionalIds.length-1] = null
            this.idsValues[this.selectedOptionalIds.length-1] = null
            this.selectedOptionalIds.splice(this.selectedOptionalIds.length-1, 1)
        },
        updateListOfNonPickedOptionalIds(idIndex) {
            this.selectedOptionalIds[idIndex][this.idsKeys[idIndex]] = this.idsValues[idIndex]
        },
        initializeVariables() {
            // Title
            this.title = this.asset.title

            // Optional Ids
            if(this.asset.optionalIds) {
                this.selectedOptionalIds = this.asset.optionalIds
                for(let i = 0; i < this.selectedOptionalIds.length; i++) {
                    this.idsKeys[i] = Object.keys(this.selectedOptionalIds[i])[0]
                    this.idsValues[i] = this.selectedOptionalIds[i][Object.keys(this.selectedOptionalIds[i])[0]]
                }
            }
        }
    },
    created() {
        this.initializeVariables()
        this.fetchOptionalIds()
    }
}
</script>

<style scoped>

    .category-name {
        margin: 20px 0 20px 0;
        margin-left: 0 !important;
        font-size: 20px;
    }

    .category-data {
        margin: 20px 0 20px 0;
        font-size: 20px;
        color: #898989;
    }

</style>

