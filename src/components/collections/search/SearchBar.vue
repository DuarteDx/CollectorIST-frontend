<template>
    <v-container my-0 class="size--max-width-1500">
        <v-layout fill-height align-center justify-center :class="{ 'pl-4' : $vuetify.breakpoint.smOnly}" row wrap>
            <v-flex xs8 sm8 md8 pl-4>
                <v-text-field hide-details outline label="Pesquisa por título" @keypress="handleEnter" v-model="params.title" />
            </v-flex>
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
