<template>
    <div>
        <!-- MODULE NAME -->
        <v-layout align-center justify-start row fill-height @click="loadData()" class="pointer">
            <v-flex sm2 md2>
                <v-icon v-if="!active" large>keyboard_arrow_right</v-icon>
                <v-icon v-if="active" large>keyboard_arrow_down</v-icon>
            </v-flex>
            <v-flex sm10 md10>
                <h3>Identificação</h3>
            </v-flex>
        </v-layout>
        <div v-if="active">
            <!-- MODULE SEARCH INPUTS -->
            <v-layout row wrap>
                <!-- TITLE -->
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <span>Título</span>
                </v-flex>
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <v-text-field
                    label="Inserir título..."
                    v-model="objectIdentification.title"
                    v-on:input="updateStore()"
                    solo
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <!-- OPTIONAL ID -->
            <v-layout>
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <span>Ids opcionais</span>
                </v-flex>
            </v-layout>
            <v-layout v-for="(object, index) in objectIdentification.optionalIds" v-bind:key="index">
                <v-flex sm5 md5 offset-md1>
                    <v-select
                    :items="listOfOptionalIds"
                    v-model="idsKeys[index]"
                    label="Id opcional..."
                    v-on:input="updateListOfSelectedOptionalIds(index)"
                    solo
                    ></v-select>
                </v-flex>
                <v-flex sm5 md4 offset-md1>
                    <v-text-field
                    v-model="idsValues[index]"
                    label="Valor"
                    required
                    v-on:input="updateListOfSelectedOptionalIds(index)"
                    solo
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex sm12 md11 offset-md1>
                    <v-icon large @click="addOptionalIdInput()">add_circle_outline</v-icon>
                    <v-icon large @click="removeOptionalIdInput()">remove_circle_outline</v-icon>
                </v-flex>
            </v-layout>
        </div>
    </div>
</template>

<script>
import AssetsSearchParams from '@/assets/store/AssetsSearchParams'

export default {
    name: 'SearchObjectIdentification',
    props: ['modules'],
    data() {
        return {
            objectIdentification: {
                title: null,
                optionalIds: [],
            },
            active: false,
            currentModuleIndex: -1,
            dataAlreadyLoaded: false,
            listOfOptionalIds: [],
            idsKeys: [],
            idsValues: []
        }
    },
    methods: {
        loadData() {
            this.active = !this.active
            if(!this.dataAlreadyLoaded) {
                // Get index of current module
                this.currentModuleIndex = this.modules.findIndex(x => x.moduleName === 'objectIdentification')

                // Get list of optional ids
                this.listOfOptionalIds = this.modules[this.currentModuleIndex].optionalId.values

                // Making sure these operations are only executed once
                this.dataAlreadyLoaded = true
            }
        },
        updateStore() {
            AssetsSearchParams.setObjectIdentification(this.objectIdentification)
        },
        async fetchOptionalIds() {
            let response = await api().get('/assets/object-identification/optional-id')
            this.listOfOptionalIds = response.data
            this.listOfNonPickedOptionalIds = response.data
        },
        addOptionalIdInput() {
            this.objectIdentification.optionalIds.push({})
        },
        removeOptionalIdInput() {
            this.objectIdentification.optionalIds[this.objectIdentification.optionalIds.length-1] = {}
            this.idsKeys[this.objectIdentification.optionalIds.length-1] = null
            this.idsValues[this.objectIdentification.optionalIds.length-1] = null
            this.objectIdentification.optionalIds.splice(this.objectIdentification.optionalIds.length-1, 1)
        },
        updateListOfSelectedOptionalIds(idIndex) {
            this.objectIdentification.optionalIds[idIndex][this.idsKeys[idIndex]] = this.idsValues[idIndex]
            this.updateStore()
        },
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
