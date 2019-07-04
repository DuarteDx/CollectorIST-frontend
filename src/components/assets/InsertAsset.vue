<template>
    <form class="asset-insert-form">
        <h1>Inserir nova peça</h1>

        <InsertObjectIdentification/>
        <br>
        <InsertObjectDescription/>
        <br>
        <InsertObjectLocation/>
        <br>
        <InsertObjectHistory/>

        <v-btn @click="submit()">submit</v-btn>
        <v-btn @click="clear()">clear</v-btn>

        <p v-if="inserted">New asset inserted!</p>
    </form>


</template>

<script>
// Api
import api from '@/api/api'
import axios from 'axios'
// Stores
import Credentials from '@/assets/scripts/login.js'
import AssetInsertionStore from '@/assets/store/AssetInsertionStore'
// Components
import InsertObjectIdentification from '@/components/assets/objectIdentification/InsertObjectIdentification'
import InsertObjectDescription from '@/components/assets/objectDescription/InsertObjectDescription'
import InsertObjectLocation from '@/components/assets/objectLocation/InsertObjectLocation'
import InsertObjectHistory from '@/components/assets/objectHistory/InsertObjectHistory'


export default {
    name: 'InsertAsset',
    components: {
        InsertObjectIdentification,
        InsertObjectDescription,
        InsertObjectLocation,
        InsertObjectHistory
    },
    data() {
        return {
            inserted: false
        }
    },
    methods: {
        async submit() {

            let newAsset = AssetInsertionStore.getNewAsset()

            const response = await api().post('/assets/' + Credentials.getToken(), newAsset)
            console.log(response)
            if(response.status == 200) {
                this.inserted = true
                AssetInsertionStore.clear()
            }
        }
    },
    created() {
    }
}
</script>


<style scoped>

.asset-insert-form {
    margin: 90px;
    background-color: rgba(128, 128, 128, 0.068);
    padding: 20px;
    border-radius: 5px;
}

.mb {
    margin-bottom: 40px;
}

.file-input {
    margin-bottom: 20px;
}

</style>
