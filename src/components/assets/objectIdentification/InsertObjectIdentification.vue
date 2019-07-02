<template>
    <div>
        <h2>Informação do objecto</h2>
        <!--TITLE-->
        <v-text-field
        v-model="title"
        label="Título"
        required
        v-on:input="updateTitle()"
        ></v-text-field>

        <!--OLD IDs-->
         <div>
            <h3>Ids atribuídos à peça anteriormente</h3>
            <v-text-field
            v-model="optionalId"
            label="Id opcional"
            v-on:input="updateOptionalId()"
            ></v-text-field>
         </div>
    </div>
</template>

<script>
import assetInsertion from '@/assets/store/assetInsertion'

export default {
    name: 'InsertObjectIdentification',
    data() {
        return {
            title: '',
            optionalId: ''
        }
    },
    methods: {
        updateTitle() {
            assetInsertion.setTitle(this.title)
        },
        updateOptionalId() {
            assetInsertion.setOptionalId(this.optionalId)
        }
    },
    created() {

    }
}
</script>

<style scoped>

</style>

