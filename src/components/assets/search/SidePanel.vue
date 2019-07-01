<template>
    <v-card class="template bg">
        <v-layout row wrap>
            <v-flex md12>
                <h2 class="title">Pesquisar por:</h2>
            </v-flex>
            <v-flex offset-md2 md8>
                <v-select
                    :items="searchOptions"
                    v-model="selectedSearchOption"
                ></v-select>
            </v-flex>
            <!--CATEGORIES-->
            <v-list v-if="selectedSearchOption === 'Categoria'" class="bg full-width">
            <v-list-tile v-for="(category, key) in categories" @click="true" v-bind:key="key">
                <v-list-tile-action>
                    <v-checkbox v-model="sound"></v-checkbox>
                </v-list-tile-action>

                <v-list-tile-content @click="sound = !sound">
                    <v-list-tile-title>{{category.title}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            </v-list>
            <!--COLLECTIONS-->
            <v-list v-if="selectedSearchOption === 'Coleção'" class="bg full-width">
            <v-list-tile v-for="(collection, key) in collections" @click="true" v-bind:key="key">
                <v-list-tile-action>
                    <v-checkbox v-model="sound"></v-checkbox>
                </v-list-tile-action>

                <v-list-tile-content @click="sound = !sound">
                    <v-list-tile-title>{{collection.title}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            </v-list>
        </v-layout>
    </v-card>
</template>

<script>
export default {
    name: 'SidePanel',
    props: ['categories', 'collections'],
    data() {
        return {
            searchOptions: ['Categoria', 'Coleção'],
            selectedSearchOption: 'Categoria'
        }
    },
    created() {
        console.log(this.categories)
        console.log(this.collections)
    }
}
</script>

<style scoped>

    .template {
        height: 900px;
        margin: 60px 0 80px 20px;
    }

    .title {
        text-align: center;
        margin-top: 20px;
    }

    .bg {
        background-color: rgb(240, 209, 138);
    }

    .full-width {
        width: 100%;
    }

</style>
