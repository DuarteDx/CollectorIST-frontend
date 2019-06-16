<template>
    <form style="margin: 90px;">
        <h2>Inserir nova peça</h2>
    <v-text-field
      v-model="creator"
      label="Autor"
      required
    ></v-text-field>
    <v-text-field
      v-model="title"
      label="Título"
      required
    ></v-text-field>

    <!-- Select category dropdown -->
    <v-select
        :items="mainCategories"
        v-model="mainCategory"
        label="Categorias"
    ></v-select>
    <!--<v-select
        v-if="mainCategory.sub-categories.length > 0"
        :items="mainCategories"
        label="Categorias"
    ></v-select>-->

    <v-btn @click="submit()">submit</v-btn>
    <v-btn @click="clear()">clear</v-btn>

    <p v-if="inserted">New asset inserted!</p>
  </form>


</template>

<script>
import api from '@/api/api'

export default {
    name: 'InsertSingleAsset',
    data() {
        return {
            creator: '',
            title: '',
            inserted: false,
            rawCategories: [],
            mainCategories: [],
            mainCategory: null,
            subCategories: []
        }
    },
    methods: {
        async submit() {
            const response = await api().post('/assets', {
                author: this.creator,
                title: this.title
            })
            console.log(response)
            if(response.status == 200) {
                this.inserted = true
            }
            this.clear;
        },
        clear() {
            this.creator = ''
            this.title = ''
        },
        async fetchCategories() {
            var component = this
            await api().get('/category')
                .then(function(response) {
                    console.log(response)
                    component.rawCategories = response.data
                    component.rawCategories.forEach(function(category) {
                        component.mainCategories.push(category.title)
                    })
                })
        }
    },
    created() {
        this.fetchCategories()
    }
}
</script>


