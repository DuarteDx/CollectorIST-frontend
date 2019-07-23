<template>
    <div>
        <!-- MODULE NAME -->
        <v-layout align-center justify-start row fill-height @click="loadData()" class="pointer">
            <v-flex sm2 md2>
                <v-icon v-if="!active" large>keyboard_arrow_right</v-icon>
                <v-icon v-if="active" large>keyboard_arrow_down</v-icon>
            </v-flex>
            <v-flex sm10 md10>
                <h3>Coleção</h3>
            </v-flex>
        </v-layout>
        <!-- MODULE SEARCH INPUTS -->
        <v-layout v-if="active" row wrap>
            <!-- COLLECTION -->
            <v-flex sm10 md10 offset-sm1 offset-md1>
                <span>Coleção</span>
            </v-flex>
            <v-flex sm10 md10 offset-sm1 offset-md1>
                <v-select
                :items="listOfCollections"
                label="Selecionar id..."
                v-model="objectCollection.collection"
                v-on:input="updateStore()"
                solo
                ></v-select>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import AssetsSearchParams from '@/assets/store/AssetsSearchParams'

export default {
    name: 'SearchObjectCollection',
    props: ['modules'],
    data() {
        return {
            objectCollection: {
                collection: null
            },
            active: false,
            currentModuleIndex: -1,
            dataAlreadyLoaded: false,
            listOfCollections: []
        }
    },
    methods: {
        loadData() {
            this.active = !this.active
            if(!this.dataAlreadyLoaded) {
                // Get index of current module
                this.currentModuleIndex = this.modules.findIndex(x => x.moduleName === 'objectCollection')

                // Get list of collections in database
                this.modules[this.currentModuleIndex].collection.values.forEach((collection) => {
                    this.listOfCollections.push(collection.title)
                })

                // Making sure these operations are only executed once
                this.dataAlreadyLoaded = true
            }
        },
        updateStore() {
            AssetsSearchParams.setObjectCollection(this.objectCollection)
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
