<template>
    <div>
        <CategoryGlobal v-bind:category="category"/>
    </div>
</template>

<script>
import CategoryGlobal from '@/components/categories/singleCategory/CategoryGlobal'

import api from '@/api/api'
import Credentials from '@/assets/scripts/login'

export default {
    name: 'Category',
    components: {
        CategoryGlobal
    },
    data() {
        return {
            category: {}
        }
    },
    methods: {
        async fetchCategoryInfo() {
            this.category = await api().get('/category/' + this.$route.params.id)
            this.category = this.category.data
        }
    },
    created() {
        this.fetchCategoryInfo()
    }
}
</script>
