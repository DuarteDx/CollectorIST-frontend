<template>
    <v-container my-0 class="size--max-width-1500">
        <v-layout fill-height align-center justify-center :class="{ 'pl-4' : $vuetify.breakpoint.smOnly}" row wrap>
            <v-flex xs8 sm8 md8 pl-4>
                <v-text-field append-icon="arrow_drop_down" hide-details outline label="Pesquisa por título" @keypress="handleEnter" v-model="params.title" @click:append="toggleAdvanced" />
            </v-flex>
                <v-container v-if="advancedSearch" fluid grid-list-lg>
                    <v-form ref="form" @submit.prevent="search()" class="font--raleway">
                        <v-layout row justify-center >
                            <v-flex xs12 md8 >
                                <v-text-field label="ID da obra (ex: E5b4r0cYOBS_0g9ca3yvQ)" v-model="params.id"  @keypress="handleEnter" ></v-text-field>
                                <v-text-field label="Nome do autor" v-model="params.creator" @keypress="handleEnter" ></v-text-field>
                                <br>
                            </v-flex>
                        </v-layout>
                        <v-layout row justify-center>
                            <v-flex sm8 md8>
                                <v-btn color="info" @click="clear()">Limpar</v-btn>
                                <v-btn color="info" type="submit" style="margin-left: 20px;">Pesquisar</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-container>
        </v-layout>
    </v-container>
</template>

<script>
import AssetsSearchParams from '@/assets/store/AssetsSearchParams'

export default {
    name: 'SearchBar',
    props: [],
    data() {
        return {
            params: {
                title: '',
                id: '',
                creator: ''
            },
            advancedSearch: false
        }
    },
    methods: {
        search() {
            AssetsSearchParams.setTitle(this.params.title)
            AssetsSearchParams.setId(this.params.id)
            AssetsSearchParams.setCreator(this.params.creator)
            this.$emit('searchBarParams')
        },
        handleEnter(event) {
            if (event.keyCode === 13) {
                this.search()
            }
        },
        toggleAdvanced(){
            this.advancedSearch = !this.advancedSearch
        },
        updateParams() {
            let storedParams = AssetsSearchParams.getSearchParams()
            this.params.title = storedParams.title
            this.params.id = storedParams.id
            this.params.creator = storedParams.creator
        },
        clear() {
            AssetsSearchParams.clear()
            this.updateParams()
            this.$emit('searchBarParams')
        }
    },
    created() {
        this.updateParams()
    }
}
</script>

<style scoped>

    .slider-title {
        color: grey;
        font-size: 16px;
    }

</style>
