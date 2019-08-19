<template>
    <div>
        <v-layout>
            <v-flex>
                <h1 style="color: red;">Pinturas</h1>
            </v-flex>
        </v-layout>
        <!--AUTOR-->
        <v-layout wrap>
            <v-flex md12>
                <h2>Autor</h2>
            </v-flex>
            <v-flex sm12 md6>
                <v-text-field
                v-model="pinturas.author"
                label="Autor"
                required
                v-on:input="updateStore()"
                solo
                ></v-text-field>
            </v-flex>
        </v-layout>
        <!--DATAÇÃO-->
        <v-layout wrap>
            <v-flex md12>
                <h2>Datação</h2>
            </v-flex>
            <v-flex sm12 md6>
                <v-text-field
                v-model="pinturas.year"
                label="Ano"
                required
                v-on:input="updateStore()"
                solo
                ></v-text-field>
            </v-flex>
        </v-layout>
        <!--MATÉRIA-->
        <v-layout wrap>
            <v-flex md12>
                <h2>Matéria</h2>
            </v-flex>
            <v-flex sm10 md6>
                <v-text-field
                v-model="auxMateria"
                label="Matéria"
                required
                solo
                v-on:keyup.enter="pinturas.materia.push(auxMateria); updateStore(); updateMaterias++"
                ></v-text-field>
            </v-flex>
            <v-flex md2><v-btn color="success" @click="pinturas.materia.push(auxMateria); updateStore(); updateMaterias++">+</v-btn></v-flex>
        </v-layout>
        <v-layout wrap :key="updateMaterias">
            <v-flex v-for="(materia, index) in pinturas.materia" v-bind:key="index">
                <v-btn color="info" @click="pinturas.materia.splice(index, 1)">{{materia}} X</v-btn>
            </v-flex>
        </v-layout>
        <!--SUPORTE-->
        <v-layout wrap>
            <v-flex md12>
                <h2>Suporte</h2>
            </v-flex>
            <v-flex sm12 md6>
                <v-text-field
                v-model="pinturas.suporte"
                label="Suporte"
                required
                v-on:input="updateStore()"
                solo
                ></v-text-field>
            </v-flex>
        </v-layout>
        <!--TECNICA-->
        <v-layout wrap>
            <v-flex md12>
                <h2>Técnica</h2>
            </v-flex>
            <v-flex sm12 md6>
                <v-text-field
                v-model="pinturas.tecnica"
                label="Técnica"
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
    name: 'pinturasInsert',
    data() {
        return {
            pinturas: {
                author: null,
                year: null,
                materia: [],
                suporte: null,
                tecnica: null
            },
            auxMateria: null,
            updateMaterias: 0
        }
    },
    methods: {
        updateStore() {
            AssetInsertionStore.setPinturas(this.pinturas)
        }
    },
    created() {
        
    }
}
</script>
