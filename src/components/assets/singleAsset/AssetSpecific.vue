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
                <span>ID da opcional:</span>
            </v-flex>
            <v-flex md6 class="category-data">
                <span v-if="asset.optionalId">{{asset.optionalId}}</span>
                <span v-else><i>Não especificado</i></span>
            </v-flex>
        </v-layout>
        <!--DOCUMENTS-->
        <h2>Documentos: </h2>
        <v-layout class="document" v-for="(document, key, index) in asset.documents" v-bind:key="index">
            <v-flex md3>
                <v-img width="100px" :src="require('@/assets/images/image-placeholder.jpg')"></v-img>
            </v-flex>
            <v-flex md9>
                <span v-if="document.description != null">{{document.description}}</span>
                <span v-else><i>Documento sem descrição</i></span>
            </v-flex>
        </v-layout>
        <v-layout v-if="asset.documents.length == 0">
            <v-flex md12 class="category-data">
                <span><i>Não existem documentos associados a esta obra</i></span>
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

    .document {
        margin: 20px 0 20px 0;
    }

</style>
