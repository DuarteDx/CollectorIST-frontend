<template>
    <v-layout wrap style="background-color: rgb(240, 209, 138);">
        <h1 style="color: red;">Object Collection</h1>
        <v-flex xs12 md12>
            <!--COLLECTION-->
            <v-layout align-center justify-start row wrap>
                <v-flex md6 class="category-name">
                    <span class="ml"> Coleção:</span> 
                </v-flex>
                <v-flex v-if="asset.ObjectCollection" md6 class="category-data">
                    <span class="ml">{{asset.ObjectCollection.collection}}</span>
                </v-flex>
                <v-flex v-if="!asset.ObjectCollection" md6 class="category-data"><i class="ml">Esta peça não pertence a nenhuma coleção</i></v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    name: 'DisplayObjectCollection',
    props: ['asset'],
    data() {
        return {

        }
    },
    methods: {

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

