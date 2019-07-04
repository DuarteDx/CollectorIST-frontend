<template>
    <form style="margin: 90px;">
        <h2>Inserir nova coleção</h2>
    <v-text-field
      v-model="title"
      label="Título"
      required
    ></v-text-field>
    <v-text-field
      v-model="responsible"
      label="Responsável"
      required
    ></v-text-field>
    <v-textarea
        v-model="description"
        label="Descrição"
    ></v-textarea>

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
            title: '',
            responsible: '',
            description: ''
        }
    },
    methods: {
        async submit() {
            const response = await api().post('/collection/' + Credentials.getToken(), {
                title: this.title,
                responsible: this.responsible,
                description: this.description
                })
            console.log(response)
            if(response.status == 200) {
                this.inserted = true
            }
            this.clear();
        },
        clear() {
            this.title = '',
            this.responsible = '',
            this.description = ''
        }
    }
}
</script>


