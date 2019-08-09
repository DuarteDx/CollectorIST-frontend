<template>
    <div>
        <h1 style="color: red;">Object Description</h1>
        <!--CATEGORY-->
        <div class="mb">
            <h3>Categoria</h3>
            <!-- Select category dropdown | Recursive component -->
            <CategoriesNode v-if="rawCategories.length > 0" :categories="rawCategories" :nodeIndex="0" :resultArray="[]" @categoriesChange="categoriesChange"/>
        </div>
    </div>
</template>

<script>
// Api
import api from '@/api/api'
// Components
import CategoriesNode from './treeNodes/CategoriesNode'
// Stores
import Credentials from '@/assets/scripts/login.js'


export default {
    name: 'InsertObjectDescription',
    components: {
        CategoriesNode
    },
    data() {
        return {
            rawCategories: []
        }
    },
    methods: {
        async fetchCategories() {
            this.rawCategories = await api().get('/assets/object-description')
            this.rawCategories = this.rawCategories.data
        },
        categoriesChange() {
            this.$emit('categoriesChange')
        }
    },
    created() {
        this.fetchCategories()
    }
}
</script>
