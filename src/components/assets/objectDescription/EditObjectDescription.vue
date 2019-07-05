<template>
    <v-layout wrap style="background-color: rgb(240, 209, 138);">
        <h1 style="color: red;">Object Description</h1>
        <v-flex xs12 md12>
            <!--CATEGORY-->
            <v-layout align-center justify-start row wrap>
                <v-flex md6 class="category-name">
                    <span class="ml"> Categoria atual:</span> 
                </v-flex>
                <v-flex v-if="asset.category" md6 class="category-data">
                    <span class="ml">{{asset.category}}</span>
                </v-flex>
                <v-flex v-if="!asset.category" md12 class="category-data"><i class="ml">Esta peça não tem uma categoria associada</i></v-flex>
            </v-layout>
        </v-flex>
        <v-flex md8 offset-md1>
            <h3>Nova categoria:</h3>
            <!-- Select category dropdown | Recursive component -->
            <CategoriesNode v-if="rawCategories.length > 0" :categories="rawCategories"/>
        </v-flex>
        <v-flex md12>
            <v-btn @click="submit()" color="info">Editar</v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
// Api
import api from '@/api/api'
// Components
import CategoriesNode from './treeNodes/CategoriesNode'

export default {
    name: 'EditObjectDescription',
    props: ['asset'],
    components: {
        CategoriesNode
    },
    data() {
        return {
            rawCategories: []
        }
    },
    methods: {
        async fetchCategories() {
            this.rawCategories = await api().get('/category')
            this.rawCategories = this.rawCategories.data
        },
    },
    created() {
        this.fetchCategories()
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

