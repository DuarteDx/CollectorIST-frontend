<template>
    <v-container my-0 class="size--max-width-1500">
        <v-layout fill-height align-center justify-center :class="{ 'pl-4' : $vuetify.breakpoint.smOnly}" row wrap>
            <v-flex xs1 hidden-md-and-up>
                <v-icon @click="toggleDrawer">menu</v-icon>
            </v-flex>
            <v-flex xs8 sm8 md8 pl-4>
                <v-text-field append-icon="arrow_drop_down" hide-details outline label="Pesquisa por título" @keypress="handleEnter" v-model="params.title" @click:append="toggleAdvanced" />
            </v-flex>
                <v-container fluid grid-list-lg>
                    <v-form v-if="advancedSearch" ref="form" @submit.prevent="search()" class="font--raleway">
                        <v-layout row justify-center >
                            <v-flex xs12 md8 >
                                <v-text-field label="ID da obra (ex: E5b4r0cYOBS_0g9ca3yvQ)" v-model="params.id"  @keypress="handleEnter" return-masked-value mask="###-#####" ></v-text-field>
                                <v-text-field label="Título da coleção" v-model="params.collection_id"  @keypress="handleEnter" type="number" ></v-text-field>
                                <v-text-field label="Nome do autor" v-model="params.creator_first_name" @keypress="handleEnter" ></v-text-field>
                                <v-text-field label="Categoria" v-model="params.creator_first_name" @keypress="handleEnter" ></v-text-field>
                                <br>
                            </v-flex>
                        </v-layout>
                        <v-layout row justify-center>
                            <v-flex sm8 md8>
                                <button type="submit" class="submit-advanced border--green">Pesquisar</button>
                            </v-flex>
                        </v-layout>
                    </v-form>
                </v-container>
        </v-layout>
    </v-container>
</template>

<script>
//import saveState from 'vue-save-state'

export default {
    name: 'SearchBar',
    props: [
        'displayMode'
    ],
    /*mixins: [saveState],*/
    data() {
        return {
            params: {
                title: "",
                creator_first_name: "",
                creator_last_name: "",
                date: [],
                id: "",
                collection_id: null
            },
            advancedSearch: false
        }
    },
    methods: {
        setDisplayMode(value) {
            this.$emit('setDisplayMode', value)
        },
        isWhite(value) {
            return value === this.displayMode ? 'white' : 'rgba(0,0,0,.54)';
        },
        search() {
            this.$route.params.id = this.params.collection_id
            this.$emit('updateParams', this.params)
        },
        handleEnter(event) {
            if (event.keyCode === 13) {
                this.search()
            }
        },
        toggleDrawer() {
            this.$emit('toggleDrawer')
        },
        toggleAdvanced(){
            this.advancedSearch = !this.advancedSearch
        },
        getSaveStateConfig() {
            return {
                'cacheKey': 'WorkSearchComponent',
            };
        },
    },
    created() {
        this.params.date[1] = '';
        if(this.$route.params.id)
            this.params.collection_id = this.$route.params.id;
    }
}
</script>

<style scoped>

    .submit-advanced {
        width: 130px;
        height: 40px;
        background-color: #41a1e6;
        color: white;
        border-radius: 4px;
        font-family: Raleway;
        font-size: 20px;
        font-weight: 500;
    }

    .slider-title {
        color: grey;
        font-size: 16px;
    }

</style>
