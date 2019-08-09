<template>
    <div style="background-color: rgba(0, 128, 0, 0.226)">
        <v-layout>
            <v-flex sm12 md12>
                <h1 style="color: red;">Pintura (componente específico)</h1>
            </v-flex>
        </v-layout>
        <!--AUTHOR-->
        <v-layout align-center justify-start row wrap>
            <v-flex md6 class="category-name">
                <span class="ml"> Autor:</span> 
            </v-flex>
            <v-flex v-if="asset.pinturas.author" md6 class="category-data">
                <span>{{asset.pinturas.author}}</span>
            </v-flex>
            <v-flex md6 v-if="!asset.pinturas.author" class="category-data"><i class="ml">Indefenido</i></v-flex>
        </v-layout>
        <!--DATE-->
        <v-layout align-center justify-start row wrap>
            <v-flex md6 class="category-name">
                <span class="ml"> Ano:</span> 
            </v-flex>
            <v-flex v-if="asset.pinturas.year" md6 class="category-data">
                <span>{{asset.pinturas.year}}</span>
            </v-flex>
            <v-flex md6 v-if="!asset.pinturas.year" class="category-data"><i class="ml">Indefenido</i></v-flex>
        </v-layout>
        <!--MATERIALS-->
        <v-layout align-center justify-start row wrap>
            <v-flex md6 class="category-name">
                <span class="ml"> Matérias:</span> 
            </v-flex>
            <v-flex v-if="asset.pinturas.materia" md6 class="category-data">
                <span v-for="(material, index) in asset.pinturas.materia" class="ml" v-bind:key="index">
                    {{material}}
                    <span v-if="index+1 < asset.pinturas.materia.length">,</span>
                </span>
            </v-flex>
            <v-flex md6 v-if="!asset.pinturas.materia" class="category-data"><i class="ml">Indefenida</i></v-flex>
        </v-layout>
        <!--SUPPORT-->
        <v-layout align-center justify-start row wrap>
            <v-flex md6 class="category-name">
                <span class="ml"> Suporte:</span> 
            </v-flex>
            <v-flex v-if="asset.pinturas.suporte" md6 class="category-data">
                <span>{{asset.pinturas.suporte}}</span>
            </v-flex>
            <v-flex md6 v-if="!asset.pinturas.suporte" class="category-data"><i class="ml">Indefenido</i></v-flex>
        </v-layout>
        <!--TECHNIQUE-->
        <v-layout align-center justify-start row wrap>
            <v-flex md6 class="category-name">
                <span class="ml"> Técnica:</span> 
            </v-flex>
            <v-flex v-if="asset.pinturas.tecnica" md6 class="category-data">
                <span>{{asset.pinturas.tecnica}}</span>
            </v-flex>
            <v-flex md6 v-if="!asset.pinturas.tecnica" class="category-data"><i class="ml">Indefenida</i></v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    name: 'pinturasDisplay',
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

