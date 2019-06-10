<template>
    <form style="margin: 90px;">
        <h2>Inserir nova coleção</h2>
    <v-text-field
      v-model="title"
      label="Título"
      required
    ></v-text-field>

    <v-btn @click="submit()">submit</v-btn>
    <v-btn @click="clear()">clear</v-btn>

    <p v-if="inserted">New collection inserted!</p>
  </form>


</template>

<script>
import api from '@/api/api'
import Credentials from '@/assets/scripts/login.js'

export default {
    name: 'InsertSingleCollection',
    data() {
        return {
            collectionName: '',
            inserted: false,
            title: ''
        }
    },
    methods: {
        async submit() {
            const response = await api().post('/collection/' + Credentials.getToken(), { title: this.title })
            console.log(response)
            if(response.status == 200) {
                this.inserted = true
            }
            this.clear();
        },
        clear() {
            this.title = ''
        }
    }
}
</script>


