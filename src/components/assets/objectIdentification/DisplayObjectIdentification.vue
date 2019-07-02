<template>
    <div>
        <v-layout style="background-color: rgba(0, 128, 0, 0.226)">
            <v-flex xs12 md12>
                <!--TITLE-->
                <v-layout align-center justify-space-between row>
                    <v-flex md12 class="main-title">
                        <h1 v-if="asset.title" class="ml">{{ asset.title }}</h1>
                        <h1 v-else class="ml"><i>Peça sem título</i></h1>
                    </v-flex>
                </v-layout>
                <!--OPTIONAL ID-->
                <v-layout>
                    <v-flex md6 class="category-name">
                        <span>ID opcional:</span>
                    </v-flex>
                    <v-flex md6 class="category-data">
                        <span v-if="asset.optionalId">{{asset.optionalId}}</span>
                        <span v-else><i>Não especificado</i></span>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
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

