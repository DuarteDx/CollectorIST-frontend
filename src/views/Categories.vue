<template>
    <div>
        <v-btn color="info" class="insert-button" @click="displayInsertionForm()">+ Inserir categorias</v-btn>
        <UploadCategoriesFile v-if="displayInsertionFormButton"/>
        <CategoriesList v-bind:categoriesList="categoriesList"/>
    </div>
</template>

<script>
import CategoriesList from '@/components/categories/search/CategoriesList'
import UploadCategoriesFile from '@/components/categories/insertion/UploadCategoriesFile'

import api from '@/api/api'
import Credentials from '@/assets/scripts/login.js'

export default {
	name: 'Categories',
	components: {
        CategoriesList,
        UploadCategoriesFile
    },
    data() {
        return {
            displayInsertionFormButton: false,
            categoriesList: []
        }
    },
    methods: {
        displayInsertionForm() {
            this.displayInsertionFormButton = !this.displayInsertionFormButton
        },
        async fetchListOfCategories() {
            const response = await api().get('/category')
            this.categoriesList = response.data
        }
    },
    created() {
        this.fetchListOfCategories()
    }
}
</script>

<style scoped>

    .insert-button {
        margin: 40px 0 0 40px;
    }

</style>
