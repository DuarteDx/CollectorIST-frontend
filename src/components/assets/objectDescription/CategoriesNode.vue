<template>
  <div>
    <v-select
        :items="categoriesList"
        v-model="selectedCategory"
        label="Categoria"
        v-on:change="getSubCategories()"
    ></v-select>

    <CategoriesNode
        v-if="hasChildren"
        :categories="categories[selectedCategoryIndex].subCategories"
        :key="childKey"
    ></CategoriesNode>

  </div>
</template>

<script>
  import categoriesAssetInsert from '@/assets/store/selectedCategoryAssetInsertion.js'
  import assetInsertion from '@/assets/store/assetInsertion'

  export default { 
    props: [ 'categories' ],
    name: 'CategoriesNode',
    data() {
        return {
            categoriesList: [],
            selectedCategory: '',
            selectedCategoryIndex: -1,
            selectedCategory: '',
            childKey: 0,
            hasChildren: false
        }
    },
    methods: {
        getSubCategories() {
            // Gets the index of the selected category
            this.selectedCategoryIndex = this.categories.findIndex(x => x.title == this.selectedCategory)

            // Define selected category in store
            categoriesAssetInsert.setSelectedCategory(this.categories[this.selectedCategoryIndex])
            assetInsertion.setCategory(categoriesAssetInsert.getSelectedCategory())
            console.log(categoriesAssetInsert.getSelectedCategory())

            // Check if there are child nodes
            let component = this
            try {
              if(this.categories[this.selectedCategoryIndex].subCategories.length > 0) {
                this.hasChildren = true
              } else { this.hasChildren = false }
            }
            catch { this.hasChildren = false}

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