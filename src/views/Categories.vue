<template>
    <div>
        <v-layout justify-center>
            <v-flex sm5 md3 style="font-size: 20px; margin: 20px 0 10px 0;">
                List of categories in database
            </v-flex>
        </v-layout>
        <v-btn color="info" @click="displayInsertionForm()">+ Inserir categorias</v-btn>
        <UploadCategoriesFile v-if="displayInsertionFormButton"/>
        <CategoriesList/>
    </div>
</template>

<script>
import CategoriesList from '@/components/categories/search/CategoriesList'
import UploadCategoriesFile from '@/components/categories/insertion/UploadCategoriesFile'

export default {
	name: 'Categories',
	components: {
        CategoriesList,
        UploadCategoriesFile
    },
    data() {
        return {
            displayInsertionFormButton: false
        }
    },
    methods: {
        displayInsertionForm() {
            this.displayInsertionFormButton = !this.displayInsertionFormButton
        }
    }
}
</script>