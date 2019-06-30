<template>
    <CollectionGlobal v-bind:collection="collection"/>
</template>

<script>
import CollectionGlobal from '@/components/collections/singleCollection/CollectionGlobal'

import api from '@/api/api'
import Credentials from '@/assets/scripts/login'

export default {
    name: 'Collection',
    components: {
        CollectionGlobal
    },
    data() {
        return {
            collection: {}
        }
    },
    methods: {
        async fetchCollectionInfo() {
            this.collection = await api().get('/collection/' + this.$route.params.id)
            this.collection = this.collection.data
        }
    },
    created() {
        this.fetchCollectionInfo()
    }
}
</script>
