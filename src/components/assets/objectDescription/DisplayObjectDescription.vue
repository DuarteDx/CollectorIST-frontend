<template>
    <v-layout wrap style="background-color: rgb(240, 209, 138);">
        <h1 style="color: red;">Object Description</h1>
        <v-flex xs12 md12>
            <!--CATEGORY-->
            <v-layout align-center justify-start row wrap>
                <v-flex md6 class="category-name">
                    <span class="ml"> Categoria:</span> 
                </v-flex>
                <v-flex v-if="asset.ObjectDescription" md6 class="category-data">
                    <!--<span v-for="(category, key, index) in asset.category.path" class="ml" v-bind:key="index">{{category}} > </span>-->
                    <span class="ml">{{asset.ObjectDescription.category}}</span>
                </v-flex>
                <v-flex v-if="!asset.ObjectDescription" md12 class="category-data"><i class="ml">Esta peça não tem uma categoria associada</i></v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    name: 'DisplayObjectDescription',
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

