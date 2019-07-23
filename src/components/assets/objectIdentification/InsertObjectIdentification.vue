<template>
    <div>
        <h1 style="color: red;">Object Identification</h1>
        <h2>Informação do objecto</h2>
        <!--TITLE-->
        <v-text-field
        v-model="ObjectIdentification.title"
        label="Título"
        required
        v-on:input="updateStore()"
        solo
        ></v-text-field>

        <!--OLD IDs-->
         <div>
            <h3>Ids atribuídos à peça anteriormente</h3>
            <v-text-field
            v-model="ObjectIdentification.optionalId"
            label="Id opcional"
            v-on:input="updateStore()"
            solo
            ></v-text-field>
         </div>
    </div>
</template>

<script>
import AssetInsertionStore from '@/assets/store/AssetInsertionStore'

export default {
    name: 'InsertObjectIdentification',
    data() {
        return {
            ObjectIdentification: {
                title: '',
                optionalId: ''
            }
        }
    },
    methods: {
        updateStore() {
            AssetInsertionStore.setObjectIdentification(this.ObjectIdentification)
        }
    },
    created() {

    }
}
</script>
