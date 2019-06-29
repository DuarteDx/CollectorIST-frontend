<template>
  <div>
    <v-select
        :items="categoriesList"
        v-model="selectedCategory"
        label="Categoria"
        v-on:change="getSubCategories()"
    ></v-select>

    <CategoriesNode
        v-if="categories[selectedCategoryIndex].subCategories.length > 0"
        :categories="categories[selectedCategoryIndex].subCategories"
        :key="childKey"
    ></CategoriesNode>

  </div>
</template>

<script>
  import categoriesAssetInsert from '@/assets/store/selectedCategoryAssetInsertion.js'

  export default { 
    props: [ 'categories' ],
    name: 'CategoriesNode',
    data() {
        return {
            categoriesList: [],
            selectedCategory: '',
            selectedCategoryIndex: 0,
            selectedCategory: '',
            childKey: 0
        }
    },
    methods: {
        getSubCategories() {
            // Gets the index of the selected category
            this.selectedCategoryIndex = this.categories.findIndex(x => x.title == this.selectedCategory)

            // Define selected category in store
            categoriesAssetInsert.setSelectedCategory(this.categories[this.selectedCategoryIndex])
            console.log(categoriesAssetInsert.getSelectedCategory())

            // Update child nodes
            this.childKey += 1
        }
    },
    created() {
        var component = this
        this.categories.forEach(function(category) {
            component.categoriesList.push(category.title)
        })
    }
  }
</script>