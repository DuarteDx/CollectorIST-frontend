<template>
  <div>
    <v-select
        :items="categoriesList"
        v-model="ObjectDescription.category"
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
  import AssetInsertionStore from '@/assets/store/AssetInsertionStore'

  export default { 
    props: [ 'categories' ],
    name: 'CategoriesNode',
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
            AssetInsertionStore.setObjectDescription(this.ObjectDescription)

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