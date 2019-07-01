<template>
    <v-container class="template">
        <v-layout row wrap>
            <!--AUTHOR-->
            <v-flex md6 class="category-name">
                <span>Autor:</span>
            </v-flex>
            <v-flex md6 class="category-data">
                <span v-if="asset.author">{{asset.author}}</span>
                <span v-else><i>Desconhecido</i></span>
            </v-flex>
            <!--OPTIONAL ID-->
            <v-flex md6 class="category-name">
                <span>ID opcional:</span>
            </v-flex>
            <v-flex md6 class="category-data">
                <span v-if="asset.optionalId">{{asset.optionalId}}</span>
                <span v-else><i>Não especificado</i></span>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'AssetSpecific',
    props: ['asset'],
    created() {
        console.log(this.asset)
    }
}
</script>

<style scoped>

    .template {
        background-color: rgba(165, 42, 42, 0.239);
    }

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
