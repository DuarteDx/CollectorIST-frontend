<template>
    <div>
        <v-card v-for="collection in collectionsList" v-bind:key="collection._id" class="single-collection">
            <v-layout align-center>
                <v-flex sm11 md11>
                    <v-layout wrap>
                    <template v-for="(value, key) in collection">
                        <v-flex sm1 md1 offset-sm1 offset-md1 v-bind:key="key">
                            <p>{{ key }}</p>
                        </v-flex>
                        <v-flex sm10 md10 v-bind:key="value">
                            <p>{{ value }}</p>
                        </v-flex>
                    </template>
                </v-layout>
                </v-flex>

                <v-flex md1 style="font-size: 25px;">
                    <font-awesome-icon @click.stop="deleteCollection(collection._id)" icon="trash" style="cursor: pointer;"/>
                </v-flex>
            </v-layout>
        </v-card>
    </div>
</template>

<script>
import api from '@/api/api'

export default {
    name: 'CollectionsList',
    data() {
        return {
            collectionsList: []
        }
    },
    methods: {
        async fetchListOfCollections() {
            const response = await api().get('/collection/all')
            this.collectionsList = response.data
        },
        async deleteCollection(collectionId) {
            console.log(collectionId)
            /*const response = await api().delete('/collection', {data: {
                id: collectionId
            }})
            console.log(response)*/
            var deletedIndex = this.collectionsList.findIndex(x => x == collectionId)
            this.collectionsList.splice(deletedIndex, 1)
            console.log(deletedIndex)
        }
    },
    created() {
        this.fetchListOfCollections()
    }
}
</script>
