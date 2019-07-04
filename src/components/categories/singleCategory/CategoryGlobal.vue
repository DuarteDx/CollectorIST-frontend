<template>
    <v-container class="template">
        <v-layout>
            <v-flex xs10 sm5 md3>
                <v-img :src="require('@/assets/images/image-placeholder.jpg')"></v-img>
            </v-flex>
            <v-flex xs12 md9>
                <!--TITLE-->
                <v-layout align-center justify-space-between row>
                    <v-flex md12 class="main-title">
                        <h1 v-if="category.title" class="ml">{{ category.title }}</h1>
                        <h1 v-else class="ml"><i>Peça sem título</i></h1>
                    </v-flex>
                </v-layout>
                <!--SUB-CATEGORIES-->
                <v-layout align-center justify-start row wrap>
                    <v-flex md12 class="category-name">
                        <span class="ml"> Sub-categorias:</span> 
                    </v-flex>
                    <v-flex md12  class="category-data">
                        <span v-for="(subCategory, key) in category.subCategories" :key="key" class="ml">{{subCategory.title}}</span>
                        <span v-if="category.subCategories.length == 0" class="ml"><i>Não existem sub-categorias para esta categoria.</i></span>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'CategoryGlobal',
    props: ['category']
}
</script>

<style scoped>

    .template {
        height: 500px;
        background-color: rgba(0, 128, 0, 0.198);
    }

    .main-title {
        margin: 0 0 20px 0 !important;
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

    .ml {
        margin-left: 30px;
    }

</style>