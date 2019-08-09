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
                <SearchObjectDescription v-bind:modules="modules" @updateSidePanelCategory="updateCategory"/>
                <div :key="updateSpecificModules">
                    <template v-for="(component, index) in selectedCategoriesPath">
                        <component :is="component.toLowerCase()+'Search'" v-bind:modules="modules" v-bind:key="index" v-if="Object.keys($options.components).includes(component.toLowerCase()+'Search')"/>
                    </template>
                </div>
                <SearchObjectLocation v-bind:modules="modules"/>
                <SearchObjectHistory v-bind:modules="modules"/>
            </v-list>
            <v-flex md12>
                <v-btn color="warning" @click="clear()">Limpar filtros</v-btn>
            </v-flex>
            <v-flex md12>
                <v-btn color="info" @click="$emit('sideBarParams')">Pesquisar</v-btn>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
// Store
import AssetsSearchParams from '@/assets/store/AssetsSearchParams'
// General modules
import SearchObjectIdentification from '@/components/assets/objectIdentification/SearchObjectIdentification'
import SearchObjectCollection from '@/components/assets/objectCollection/SearchObjectCollection'
import SearchObjectDescription from '@/components/assets/objectDescription/SearchObjectDescription'
import SearchObjectLocation from '@/components/assets/objectLocation/SearchObjectLocation'
import SearchObjectHistory from '@/components/assets/objectHistory/SearchObjectHistory'
// Specific modules
import pinturasSearch from '@/components/assets/specificModules/pinturas/pinturasSearch'
import gravurasSearch from '@/components/assets/specificModules/pinturas/gravuras/gravurasSearch'

export default {
    name: 'SidePanel',
    props: ['modules'],
    components: {
        // General modules
        SearchObjectIdentification,
        SearchObjectCollection,
        SearchObjectDescription,
        SearchObjectLocation,
        SearchObjectHistory,
        // Specific modules
        pinturasSearch,
        gravurasSearch
    },
    data() {
        return {
            selectedCategoriesPath: [],
            updateSpecificModules: 0
        }
    },
    methods: {
        clear() {
            AssetsSearchParams.clear()
        },
        updateCategory(selectedCategoriesPath) {
            this.selectedCategoriesPath = selectedCategoriesPath
            console.log(selectedCategoriesPath)
            this.updateSpecificModules += 1
        }
    },
    created() {
    }
}
</script>

<style scoped>

    .template {
        margin: 60px 0 10px 20px;
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
