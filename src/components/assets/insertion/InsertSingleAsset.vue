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
            inserted: false
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
        }
    }
}
</script>


