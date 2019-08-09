<template>
    <div style="background-color: rgba(24, 74, 0, 0.226)">
        <v-layout>
            <v-flex sm12 md12>
                <h1 style="color: red;">Gravura (componente específico)</h1>
            </v-flex>
        </v-layout>
        <!--NUMBER OF COPIES-->
        <v-layout align-center justify-start row wrap>
            <v-flex md6 class="category-name">
                <span class="ml"> Quantidade de cópias:</span> 
            </v-flex>
            <v-flex v-if="asset.gravuras.amountOfCopies" md6 class="category-data">
                <span>{{asset.gravuras.amountOfCopies}}</span>
            </v-flex>
            <v-flex md6 v-if="!asset.gravuras.amountOfCopies" class="category-data"><i class="ml">Indefenida</i></v-flex>
        </v-layout>
        <!--COPY NUMBER-->
        <v-layout align-center justify-start row wrap>
            <v-flex md6 class="category-name">
                <span class="ml"> Número da cópia:</span> 
            </v-flex>
            <v-flex v-if="asset.gravuras.copyNumber" md6 class="category-data">
                <span>{{asset.gravuras.copyNumber}}</span>
            </v-flex>
            <v-flex md6 v-if="!asset.gravuras.copyNumber" class="category-data"><i class="ml">Indefenido</i></v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    name: 'gravurasDisplay',
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

