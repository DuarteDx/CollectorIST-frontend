<template>
    <div>
        <v-card v-for="collection in collectionsList" v-bind:key="collection._id" class="single-collection">
                <v-layout align-center>

                    <v-flex sm11 md11>
                        <router-link :to="'/collections/' + collection._id" class="text--no-decoration single-collection-link">
                            <v-layout wrap>
                                <v-flex md2>
                                   <v-img width="150px" :src="require('@/assets/images/image-placeholder.jpg')"></v-img> 
                                </v-flex>
                                <v-flex md9>
                                    <v-layout row wrap>
                                        <v-flex class="collection-title" xs12 sm12 md12>
                                            <p v-if="collection.title.length > 0">{{ collection.title }}</p>
                                            <p v-else><i>Coleção sem título</i></p>
                                        </v-flex>
                                        <v-flex class="collection-responsible" sx12 sm12 md12>
                                            <p><u>Responsável:</u> {{ collection.responsible }}</p>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </router-link>
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
import Credentials from '@/assets/scripts/login.js'

export default {
    name: 'CollectionsList',
    props: ['collectionsList'],
    data() {
        return {
        }
    },
    methods: {
        async deleteCollection(collectionId) {
            if(this.confirmDeletion()){
                console.log(collectionId)
                const response = await api().delete('/collection/' + collectionId + '/' + Credentials.getToken())
                console.log(response)
                var deletedIndex = this.collectionsList.findIndex(x => x._id == collectionId)
                this.collectionsList.splice(deletedIndex, 1)
                console.log(deletedIndex)
            }
        },
        confirmDeletion() {
            if (confirm('Tem a certeza que pretende apagar esta coleção?')) {
                    return true
                } else {
                    return false
                }
            }
    }
}
</script>

<style>

    .single-collection {
        margin: 10px 40px 10px 40px;
    }

    .single-collection:hover {
        padding: 5px;
    }

    .single-collection-link {
        text-decoration: none;
        color: black;
    }

    .collection-title {
        font-size: 27px;
        margin-top: 30px;
    }

    .collection-responsible {
        font-size: 21px;
    }

</style>