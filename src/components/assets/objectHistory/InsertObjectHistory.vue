<template>
  <div>
    <h1 style="color: red;">Object History</h1>
    <!--TITLE-->
    <h2>Data de início</h2>
    <v-text-field
      v-model="ObjectHistory.initial"
      label="Data de início"
      required
      v-on:input="updateStore()"
      solo
    ></v-text-field>

    <!--OPTIONAL IDs-->
    <h2>Data de fim</h2>
    <v-text-field
        v-model="ObjectHistory.end"
        label="Data de fim"
        required
        v-on:input="updateStore()"
        solo
        >
    </v-text-field>

    <h2>Local</h2>
    <v-text-field
        v-model="ObjectHistory.local"
        label="Local"
        required
        v-on:input="updateStore()"
        solo
        >
    </v-text-field>

    <h2>Atividade</h2>
    <v-text-field
        v-model="ObjectHistory.activity"
        label="Atividade"
        required
        v-on:input="updateStore()"
        solo
        >
    </v-text-field>

  </div>
</template>

<script>
import AssetInsertionStore from '@/assets/store/AssetInsertionStore'
import api from '@/api/api'

export default {
  name: "InsertObjectHistory",
  data() {
    return {
        ObjectHistory: {
            initial: '',
            end: '',
            local: '',
            activity: ''

        }
    };
  },
  methods: {
    updateStore() {
      AssetInsertionStore.setObjectHistory(this.ObjectHistory);
    }
  },
  created() {}
};
</script>

<style scoped>
</style>

