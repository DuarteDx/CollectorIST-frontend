<template>
    <form style="margin: 90px;">
        <h2>Importar ficheiro com árvore de categorias</h2>
        <input type="file" id="file" ref="file" class="file-input" v-on:change="handleFileUpload()"/>
        <br>
        <v-btn @click="uploadFile()">Submeter</v-btn>
    </form>
</template>

<script>
import api from '@/api/api'
import Credentials from '@/assets/scripts/login.js'

export default {
    name: 'UploadCategoriesFile',
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
        await api().post('/category/' + Credentials.getToken(), formData, {
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
