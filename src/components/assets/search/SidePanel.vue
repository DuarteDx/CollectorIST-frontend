<template>
    <v-card class="template bg">
        <v-layout row wrap>
            <v-flex md12>
                <h2 class="title">Pesquisar por:</h2>
            </v-flex>
            <!--MODULES-->
            <v-list class="bg full-width">
                <SearchObjectIdentification v-bind:modules="modules"/>
                <SearchObjectCollection v-bind:modules="modules"/>
                <SearchObjectDescription v-bind:modules="modules"/>
                <SearchObjectLocation v-bind:modules="modules"/>
                <SearchObjectHistory v-bind:modules="modules"/>
            </v-list>
            <v-flex md6>
                <v-btn color="warning" @click="clear()">Limpar filtros</v-btn>
            </v-flex>
            <v-flex md6>
                <v-btn color="info" @click="$emit('sideBarParams')">Pesquisar</v-btn>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
// Store
import AssetsSearchParams from '@/assets/store/AssetsSearchParams'
// Modules
import SearchObjectIdentification from '@/components/assets/objectIdentification/SearchObjectIdentification'
import SearchObjectCollection from '@/components/assets/objectCollection/SearchObjectCollection'
import SearchObjectDescription from '@/components/assets/objectDescription/SearchObjectDescription'
import SearchObjectLocation from '@/components/assets/objectLocation/SearchObjectLocation'
import SearchObjectHistory from '@/components/assets/objectHistory/SearchObjectHistory'

export default {
    name: 'SidePanel',
    props: ['modules'],
    components: {
        SearchObjectIdentification,
        SearchObjectCollection,
        SearchObjectDescription,
        SearchObjectLocation,
        SearchObjectHistory
    },
    data() {
        return {

        }
    },
    methods: {
        clear() {
            AssetsSearchParams.clear()
        }
    },
    created() {
    }
}
</script>

<style scoped>

    .template {
        margin: 60px 0 80px 20px;
    }

    .title {
        text-align: center;
        margin-top: 20px;
    }

    .bg {
        background-color: rgb(221,221,221);
    }

    .full-width {
        width: 100%;
    }

</style>
