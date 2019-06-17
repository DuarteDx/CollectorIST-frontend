<template>
  <div>
    <v-select
        :items="categoriesList"
        v-model="selectedCategory"
        label="Categorias"
        v-on:change="getSubCategories()"
    ></v-select>

    <CategoriesNode
        v-if="categories[selectedCategoryIndex].subCategories.length > 0"
        :categories="categories[selectedCategoryIndex].subCategories"
    ></CategoriesNode>

  </div>
</template>
<script>
  export default { 
    props: [ 'categories' ],
    name: 'CategoriesNode',
    data() {
        return {
            categoriesList: [],
            selectedCategory: '',
            selectedCategoryIndex: 0,
            selectedCategory: ''
        }
    },
    methods: {
        getSubCategories() {
            // Gets the index of the selected category
            this.selectedCategoryIndex = this.categories.findIndex(x => x.title == this.selectedCategory)
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