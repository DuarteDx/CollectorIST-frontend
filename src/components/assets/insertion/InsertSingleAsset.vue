<template>
    <form style="margin: 90px;">
        <h2>Inserir nova peça</h2>
    <v-text-field
      v-model="creator"
      label="Autor"
      required
    ></v-text-field>
    <v-text-field
      v-model="title"
      label="Título"
      required
    ></v-text-field>

    <!-- Select category dropdown -->
    <v-select
        :items="mainCategories"
        v-model="selectedMainCategory"
        label="Categorias"
        v-on:change="getSubCategories()"
    ></v-select>
    <v-select
        v-if="subCategoriesBoolean"
        v-model="selectedSubCategory"
        :items="subCategories"
        label="Categorias"
    ></v-select>

    <v-btn @click="submit()">submit</v-btn>
    <v-btn @click="clear()">clear</v-btn>

    <p v-if="inserted">New asset inserted!</p>
  </form>


</template>

<script>
import api from '@/api/api'

export default {
    name: 'InsertSingleAsset',
    data() {
        return {
            creator: '',
            title: '',
            inserted: false,
            rawCategories: [],
            mainCategories: [],
            selectedMainCategory: '',
            selectedSubCategory: '',
            subCategories: [],
            selectedCategoryIndex: -1,
            subCategoriesBoolean: false
        }
    },
    methods: {
        async submit() {
            const response = await api().post('/assets', {
                author: this.creator,
                title: this.title,
                category: this.selectedMainCategory,
                subCategory: this.selectedSubCategory
            })
            console.log(response)
            if(response.status == 200) {
                this.inserted = true
                this.clear()
            }
        },
        clear() {
            // Reset all form variables
            this.creator = ''
            this.title = ''
            this.selectedMainCategory = ''
            this.selectedSubCategory = ''
            this.subCategoriesBoolean = false
        },
        async fetchCategories() {
            var component = this
            await api().get('/category')
                .then(function(response) {
                    console.log(response)
                    component.rawCategories = response.data
                    component.rawCategories.forEach(function(category) {
                        component.mainCategories.push(category.title)
                    })
                })
        },
        getSubCategories() {
            // Gets the index of the selected category
            this.selectedCategoryIndex = this.rawCategories.findIndex(x => x.title == this.selectedMainCategory)
            console.log(this.selectedCategoryIndex)

            // Check if there exist subCategories for the chosen category
            this.subCategoriesBoolean = this.rawCategories[this.selectedCategoryIndex].subCategories.length > 0 ? true : false

            // Create array with subCategories titles
            var component = this
            this.subCategories = []
            this.rawCategories[this.selectedCategoryIndex].subCategories.forEach(function(subCategory) {
                component.subCategories.push(subCategory.title)
            })
        }
    },
    created() {
        this.fetchCategories()
    }
}
</script>


