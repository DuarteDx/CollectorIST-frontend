<template>
    <form style="margin: 90px;">
        <v-layout row justify-center>
            <v-flex sm12 md12>
                <h2 class="text-md-center">Importar ficheiro com árvore de categorias</h2>
                <br>
            </v-flex>
        </v-layout>
        <v-layout row justify-center>
            <v-flex md12 class="text-md-center">
                <input type="file" id="file" ref="file" class="file-input" v-on:change="handleFileUpload()"/>
            </v-flex>
        </v-layout>
        <v-layout row justify-center>
            <v-flex sm4 md3>
                <v-btn @click="uploadFile()">Submeter</v-btn>
            </v-flex>
        </v-layout>
    </form>
</template>

<script>
import api from '@/api/api'
import Credentials from '@/assets/scripts/login.js'

export default {
    name: 'ConfigObjectDescription',
    data() {
        return {
            file: null
        }
    },
    methods: {
    handleFileUpload(event){
        this.file = this.$refs.file.files[0]
        console.log(this.file)
      },
    async uploadFile() {
        let formData = new FormData()
        formData.append("categories", this.file)
        await api().put('/assets/config/object-description/' + Credentials.getToken(), formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }})
            .then(function(response) {
                console.log(response)
            })
    }
    }
}
</script>

<style scoped>

.file-input {
    margin: 20px 0 20px 8px;
}

</style>
