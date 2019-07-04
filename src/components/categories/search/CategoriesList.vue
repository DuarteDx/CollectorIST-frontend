<template>
    <div>
        <v-card v-for="category in categoriesList" v-bind:key="category._id" class="single-category">
                <v-layout align-center>

                    <v-flex sm11 md11>
                        <router-link :to="'/categories/' + category._id" class="text--no-decoration single-category-link">
                            <v-layout wrap>
                                <v-flex md2>
                                   <v-img width="150px" :src="require('@/assets/images/image-placeholder.jpg')"></v-img> 
                                </v-flex>
                                <v-flex md9>
                                    <v-layout row wrap>
                                        <v-flex class="category-title" xs12 sm12 md12>
                                            <p>{{ category.title }}</p>
                                        </v-flex>
                                        <v-flex class="category-category" sx12 sm12 md12>
                                            <p>{{ category.category }}</p>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
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
    props: ['categoriesList'],
    data() {
        return {
        }
    },
    methods: {
    },
    created() {
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

    .category-title {
        font-size: 27px;
        margin-top: 30px;
    }

    .category-category {
        font-size: 21px;
    }

</style>