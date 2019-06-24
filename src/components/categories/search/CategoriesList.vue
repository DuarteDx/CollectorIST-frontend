<template>
    <div>
        <v-card v-for="category in categoriesList" v-bind:key="category._id" class="single-category">
                <v-layout align-center>

                    <v-flex sm12 md12>
                        <router-link :to="'categories/' + category._id" class="single-category-link">
                            <v-layout wrap>
                                <template v-for="(value, key, index) in category">
                                    <v-flex sm1 md1 offset-sm1 offset-md1 v-bind:key="index">
                                        <p>{{ key }}</p>
                                    </v-flex>
                                    <v-flex sm10 md10 v-bind:key="index + 1000">
                                        <p>{{ value }}</p>
                                    </v-flex>
                                </template>
                            </v-layout>
                        </router-link>
                    </v-flex>

                </v-layout>
        </v-card>
    </div>
</template>

<script>
import api from '@/api/api'
import Credentials from '@/assets/scripts/login.js'

export default {
    name: 'CategoriesList',
    data() {
        return {
            categoriesList: []
        }
    },
    methods: {
        async fetchListOfCategories() {
            const response = await api().get('/category')
            this.categoriesList = response.data
        }
    },
    created() {
        this.fetchListOfCategories()
    }
}
</script>

<style>

    .single-category {
        margin: 10px 40px 10px 40px;
    }

    .single-category:hover {
        padding: 5px;
    }

    .single-category-link {
        text-decoration: none;
        color: black;
    }

</style>