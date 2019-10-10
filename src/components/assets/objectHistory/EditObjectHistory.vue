<template>
    <div style="background-color: rgba(0, 108, 0, 0.226)">
        <v-layout>
            <v-flex xs12 md12>
                <h1 style="color: red;">Object History</h1>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 sm12 md5 class="category-name">
                <span class="ml">Data início:</span>
            </v-flex>
            <v-flex xs12 sm12 md6>
                <v-text-field
                v-model="initial"
                solo
                :placeholder="asset.initial"
                ></v-text-field>
            </v-flex>
        </v-layout>
                <v-layout>
            <v-flex xs12 sm12 md5 class="category-name">
                <span class="ml">Data fim:</span>
            </v-flex>
            <v-flex xs12 sm12 md6>
                <v-text-field
                v-model="end"
                solo
                :placeholder="asset.end"
                ></v-text-field>
            </v-flex>
        </v-layout>
                <v-layout>
            <v-flex xs12 sm12 md5 class="category-name">
                <span class="ml">Local:</span>
            </v-flex>
            <v-flex xs12 sm12 md6>
                <v-text-field
                v-model="local"
                solo
                :placeholder="asset.local"
                ></v-text-field>
            </v-flex>
        </v-layout>
                <v-layout>
            <v-flex xs12 sm12 md5 class="category-name">
                <span class="ml">Atividade:</span>
            </v-flex>
            <v-flex xs12 sm12 md6>
                <v-text-field
                v-model="activity"
                solo
                :placeholder="asset.activity"
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex>
                <v-btn color="info" @click="submit()">Editar</v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
// Api
import api from '@/api/api'
// Stores
import Credentials from '@/assets/scripts/login.js'

export default {
    name: 'EditObjectHistory',
    props: ['asset'],
    data() {
        return {

        }
    },
    methods: {
        async submit() {
            console.log("PIça")
            await api().put('/assets/' + this.$route.params.id + '/object-history/edit/' + Credentials.getToken(), {
                initial: this.initial,
                end: this.end,
                local: this.initial,
                activity: this.activity
            })
        },
        initializeVariables() {
            // Title
            this.initial = this.asset.initial
            this.end = this.asset.end
            this.local = this.asset.local
            this.activity = this.asset.activity
        }
    },
    created() {
        this.initializeVariables()
    }
}
</script>

<style scoped>

</style>

