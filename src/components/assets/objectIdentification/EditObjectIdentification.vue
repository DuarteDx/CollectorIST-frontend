<template>
    <v-layout wrap style="background-color: rgba(0, 128, 0, 0.226)">
        <v-flex xs12 md12>
            <h1 style="color: red;">Object Identification</h1>
        </v-flex>
        <v-flex xs12 sm12 md6 class="category-name">
            <span class="ml">Título:</span>
        </v-flex>
        <v-flex xs12 sm12 md6>
            <v-flex xs12 sm6 md3>
            <v-text-field
            v-model="title"
            solo
            :placeholder="asset.title"
            ></v-text-field>
        </v-flex>
        </v-flex>
        <v-flex xs12 sm12 md6 class="category-name">
            <span class="ml">Id Opcional:</span>
        </v-flex>
        <v-flex xs12 sm12 md4>
            <v-select
            :items="[1, 2]"
            solo
            :placeholder="asset.optionalId"
            ></v-select>
        </v-flex>
        <v-flex md12>
            <v-btn @click="submit()" color="info" >Editar</v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    name: 'EditObjectIdentification',
    props: ['asset'],
    data() {
        return {
            title: '',
            optionalId: ''
        }
    },
    methods: {
        submit() {

        }
    },
    created() {

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

