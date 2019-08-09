<template>
  <div>
    <v-select
        :items="listOfCategoriesStrings"
        v-model="selectedCategory"
        label="Categoria"
        v-on:change="getSubCategories()"
        solo
    ></v-select>

    <CategoriesNode
        v-if="hasChildren"
        :categories="categories[selectedCategoryIndex].subCategories"
        :nodeIndex="nodeIndex+1"
        :resultArray="resultArray"
        :key="childKey"
        @categoriesChange="categoriesChange"
    ></CategoriesNode>

  </div>
</template>

<script>
  import AssetInsertionStore from '@/assets/store/AssetInsertionStore'

  export default { 
    props: [ 'categories', 'nodeIndex', 'resultArray' ],
    name: 'CategoriesNode',
    data() {
        return {
            selectedCategoryIndex: -1,
            childKey: 0,
            hasChildren: false,
            listOfCategoriesStrings: [],
            selectedCategory: null
        }
    },
    methods: {
        getSubCategories() {
            // Clear child nodes (20 just to guarantee it removes all children)
            this.resultArray.splice(this.nodeIndex+1, 20)

            // Add selected category to final array
            this.resultArray[this.nodeIndex] = this.selectedCategory

            // Define category path in store
            AssetInsertionStore.setObjectDescription({category: this.resultArray})

            // Gets the index of the selected category
            this.selectedCategoryIndex = this.categories.findIndex(x => x.title == this.selectedCategory)

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

            // Update categories in parent insert component
            this.categoriesChange()
        },
        categoriesChange() {
            this.$emit('categoriesChange')
        }
    },
    created() {
      this.categories.forEach((category) => {
        this.listOfCategoriesStrings.push(category.title)
      })
    }
  }
</script>