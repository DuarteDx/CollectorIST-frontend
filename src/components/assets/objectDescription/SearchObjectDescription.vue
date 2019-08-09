<template>
    <div>
        <!-- MODULE NAME -->
        <v-layout align-center justify-start row fill-height @click="loadData()" class="pointer">
            <v-flex sm2 md2>
                <v-icon v-if="!active" large>keyboard_arrow_right</v-icon>
                <v-icon v-if="active" large>keyboard_arrow_down</v-icon>
            </v-flex>
            <v-flex sm10 md10>
                <h3>Descrição</h3>
            </v-flex>
        </v-layout>
        <!-- MODULE SEARCH INPUTS -->
        <template v-if="active">
            <v-layout row wrap>
                <!-- CATEGORY -->
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <span>Categoria</span>
                </v-flex>
            </v-layout>
            <SearchCategoriesNode v-if="dataAlreadyLoaded" :categories="modules[currentModuleIndex].categories.value" :selectedCategoriesPath="[]" @updateSidePanelCategory="updateSidePanelCategory"/>
        </template>
    </div>
</template>

<script>
import AssetsSearchParams from '@/assets/store/AssetsSearchParams'
import SearchCategoriesNode from './treeNodes/SearchCategoriesNode'

export default {
    name: 'SearchObjectDescription',
    props: ['modules'],
    components: {
        SearchCategoriesNode
    },
    data() {
        return {
            objectDescription: {
                category: null
            },
            active: false,
            currentModuleIndex: -1,
            dataAlreadyLoaded: false,
            optionalIdArray: []
        }
    },
    methods: {
        loadData() {
            this.active = !this.active
            if(!this.dataAlreadyLoaded) {
                // Get index of current module
                this.currentModuleIndex = this.modules.findIndex(x => x.moduleName === 'objectDescription')

                // Making sure this operation is only executed once
                this.dataAlreadyLoaded = true
            }
        },
        updateStore() {
            AssetsSearchParams.setObjectDescription(this.objectDescription)
        },
        updateSidePanelCategory(selectedCategoriesPath) {
            this.$emit('updateSidePanelCategory', selectedCategoriesPath)
            console.log(selectedCategoriesPath)
        }
    },
    created() {

    }
}
</script>

<style scoped>

    .pointer {
        cursor: pointer;
    }

</style>
