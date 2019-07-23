<template>
    <v-layout wrap style="background-color: rgba(0, 128, 0, 0.226)">
        <h1 style="color: red;">Object Identification</h1>
        <v-flex xs12 md12>
            <!--TITLE-->
            <v-layout align-center justify-space-between row>
                <v-flex md12 class="main-title">
                    <h1 v-if="asset.ObjectIdentification.title" class="ml">{{ asset.ObjectIdentification.title }}</h1>
                    <h1 v-else class="ml"><i>Peça sem título</i></h1>
                </v-flex>
            </v-layout>
            <!--OPTIONAL ID-->
            <v-layout v-for="(optionalId, index) in asset.ObjectIdentification.optionalIds" v-bind:key="index">
                <v-flex md6 class="category-name">
                    <span class="ml">{{ Object.keys(optionalId)[0] }}</span>
                </v-flex>
                <v-flex md6 class="category-data">
                    <span v-if="optionalId[Object.keys(optionalId)[0]]">{{ optionalId[Object.keys(optionalId)[0]] }}</span>
                    <span v-else><i>Não especificado</i></span>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    name: 'DisplayObjectIdentification',
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

