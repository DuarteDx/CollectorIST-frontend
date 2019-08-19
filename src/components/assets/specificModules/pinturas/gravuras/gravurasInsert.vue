<template>
    <div>
        <v-layout>
            <v-flex>
                <h1 style="color: red;">Gravuras</h1>
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
    </div>
</template>

<script>
import AssetInsertionStore from '@/assets/store/AssetInsertionStore'
import api from '@/api/api'

export default {
    name: 'gravurasInsert',
    data() {
        return {
            gravuras: {
                amountOfCopies: null,
                copyNumber: null
            }
        }
    },
    methods: {
        updateStore() {
            AssetInsertionStore.setGravuras(this.gravuras)
        }
    },
    created() {
        
    }
}
</script>
