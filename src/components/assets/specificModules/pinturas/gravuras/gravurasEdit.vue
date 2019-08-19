<template>
    <div style="background-color: rgba(24, 74, 0, 0.226)">
        <v-layout>
            <v-flex sm12 md12>
                <h1 style="color: red;">Gravura (componente específico)</h1>
            </v-flex>
        </v-layout>
        <!--AMOUNT OF COPIES-->
        <v-layout wrap>
            <v-flex md12>
                <h2>Quantidade de cópias existentes</h2>
            </v-flex>
            <v-flex sm12 md6>
                <v-text-field
                v-model="gravuras.amountOfCopies"
                label="Quantidade"
                required
                v-on:input="updateStore()"
                solo
                ></v-text-field>
            </v-flex>
        </v-layout>
        <!--COPY NUMBER-->
        <v-layout wrap>
            <v-flex md12>
                <h2>Número da cópia</h2>
            </v-flex>
            <v-flex sm12 md6>
                <v-text-field
                v-model="gravuras.copyNumber"
                label="Número"
                required
                v-on:input="updateStore()"
                solo
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex>
                <v-btn color="info" @click="submit()">Editar</v-btn>
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
    name: 'pinturasEdit',
    props: ['asset'],
    data() {
        return {
            gravuras: {
                amountOfCopies: null,
                copyNumber: null
            }
        }
    },
    methods: {
        async submit() {
            await api().put('/assets/' + this.$route.params.id + '/gravuras/edit/' + Credentials.getToken(), {
                gravuras: this.gravuras
            })
        }
    },
    created() {
        this.gravuras = this.asset.gravuras
    }
}
</script>

<style scoped>
    
</style>

