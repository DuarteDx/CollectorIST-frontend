<template>
  <div>
    <v-layout row wrap>
        <v-flex sm10 md10 offset-sm1 offset-md1>
            <v-select
                :items="categoriesList"
                v-model="ObjectDescription.category"
                label="Categoria"
                v-on:change="getSubCategories()"
                solo
            ></v-select>
        </v-flex>
    </v-layout>

    <SearchCategoriesNode
        v-if="hasChildren"
        :categories="categories[selectedCategoryIndex].subCategories"
        :selectedCategoriesPath="categoriesPath"
        :key="childKey"
        @updateSidePanelCategory="updateParentComponent"
    ></SearchCategoriesNode>

  </div>
</template>

<script>
  import AssetsSearchParams from '@/assets/store/AssetsSearchParams'

  export default { 
    props: [ 'categories', 'selectedCategoriesPath' ],
    name: 'SearchCategoriesNode',
    data() {
        return {
            categoriesList: [],
            selectedCategoryIndex: -1,
            childKey: 0,
            hasChildren: false,
            categoriesPath: [],
            ObjectDescription: {
              category: ''
            },
            categoryIndex: 0
        }
    },
    methods: {
        getSubCategories() {
            // Define selected category in store
            AssetsSearchParams.setObjectDescription(this.ObjectDescription)

            // Update category in parent SidePanel.vue component
            this.categoriesPath[this.categoryIndex] = this.ObjectDescription.category
            this.categoriesPath.splice(this.categoryIndex + 1, 20)
            this.$emit('updateSidePanelCategory', this.categoriesPath)
            console.log(this.categoriesList)

            // Gets the index of the selected category
            this.selectedCategoryIndex = this.categories.findIndex(x => x.title == this.ObjectDescription.category)

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
        },
        updateParentComponent(categoriesPath) {
          this.$emit('updateSidePanelCategory', categoriesPath)
        }
    },
    created() {
        this.categories.forEach((category) => {
            this.categoriesList.push(category.title)
        })
        this.categoriesPath = this.selectedCategoriesPath
        this.categoryIndex = this.categoriesPath.length
    }
  }
</script>