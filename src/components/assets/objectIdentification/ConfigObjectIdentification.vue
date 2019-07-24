<template>
    <div style="margin-bottom: 20px;">
        <v-layout justify-center>
            <v-flex sm12 md12>
                <h3 class="title text-md-center">Inserir novo parâmetro opcional</h3>
            </v-flex>
        </v-layout>
        <v-layout justify-center>
            <v-flex sm8 md7>
                <v-text-field
                label="Novo parâmetro"
                v-model="newOptionalId"
                solo
            ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout justify-center>
            <v-flex sm12 md12 class="text-md-center">
                <v-btn @click="insertOptionalId()">Inserir</v-btn>
            </v-flex>
        </v-layout>
        <v-layout justify-center>
            <v-flex sm12 md12>
                <h3 class="title text-md-center">Parâmetros opcionais existentes:</h3>
            </v-flex>
        </v-layout>
        <v-layout v-for="(optionalId, index) in listOfOptionalIds" v-bind:key="index">
            <v-flex sm8 md10 class="collection-name">{{ optionalId }}</v-flex>
            <v-flex sm4 md2 class="delete-collection">
                <v-btn color="error" v-on:click.stop="deleteOptionalId(index)">Apagar</v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import api from '@/api/api'
import Credentials from '@/assets/scripts/login.js'

export default {
    name: 'ConfigObjectIdentification',
    data() {
        return {
            newOptionalId: null,
            listOfOptionalIds: []
        }
    },
    methods: {
        async fetchOptionalIds() {
            let response = await api().get('/assets/object-identification/optional-id')
            this.listOfOptionalIds = response.data
        },
        async deleteOptionalId(optionalIdIndex) {
            if(confirm('Tem a certeza que pretende apagar este parâmetro ' + this.listOfOptionalIds[optionalIdIndex] + '?')) {
                let response = await api().delete('/assets/object-identification/optional-id/' + Credentials.getToken(), {data: this.listOfOptionalIds[optionalIdIndex]})
                if(response.status === 200) {
                    this.listOfOptionalIds.splice(optionalIdIndex, 1)
                }
            }
        },
        async insertOptionalId() {
            let response = await api().put('/assets/config/object-identification/' + Credentials.getToken(), {
                optionalId: this.newOptionalId
            })
            if(response.status === 200) {
                this.listOfOptionalIds.push(this.newOptionalId)
            }
        }
    },
    created() {
        this.fetchOptionalIds()
    }
}
</script>

<style scoped>

    .title {
        padding: 20px;
    }

    .collection-name {
        padding: 15px;
    }


</style>
