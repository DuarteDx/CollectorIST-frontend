<template>
  <div>
    <v-select
        :items="categoriesList"
        v-model="ObjectDescription.category"
        label="Categoria"
        v-on:change="getSubCategories()"
    ></v-select>

    <SearchCategoriesNode
        v-if="hasChildren"
        :categories="categories[selectedCategoryIndex].subCategories"
        :key="childKey"
    ></SearchCategoriesNode>

  </div>
</template>

<script>
  import AssetsSearchParams from '@/assets/store/AssetsSearchParams'

  export default { 
    props: [ 'categories' ],
    name: 'SearchCategoriesNode',
    data() {
        return {
            categoriesList: [],
            selectedCategoryIndex: -1,
            childKey: 0,
            hasChildren: false,
            ObjectDescription: {
              category: ''
            }
        }
    },
    methods: {
        getSubCategories() {
            // Define selected category in store
            AssetsSearchParams.setObjectDescription(this.ObjectDescription)

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
        }
    },
    created() {
        this.categories.forEach((category) => {
            this.categoriesList.push(category.title)
        })
    }
  }
</script>