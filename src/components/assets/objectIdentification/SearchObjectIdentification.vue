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
        <!-- MODULE SEARCH INPUTS -->
        <v-layout v-if="active" row wrap>
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
            <!-- OPTIONAL ID -->
            <v-flex sm10 md10 offset-sm1 offset-md1>
                <span>Id opcional</span>
            </v-flex>
            <v-flex sm10 md10 offset-sm1 offset-md1>
                <v-select
                :items="optionalIdArray"
                label="Selecionar id..."
                v-model="objectIdentification.optionalId"
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
    name: 'SearchObjectIdentification',
    props: ['modules'],
    data() {
        return {
            objectIdentification: {
                title: null,
                optionalId: null,
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
                this.currentModuleIndex = this.modules.findIndex(x => x.moduleName === 'objectIdentification')

                // Convert object into array
                this.optionalIdArray = Object.keys(this.modules[this.currentModuleIndex].optionalId.values).map((key) => {
                    return this.modules[this.currentModuleIndex].optionalId.values[key]
                })
                // Making sure these operations are only executed once
                this.dataAlreadyLoaded = true
            }
        },
        updateStore() {
            AssetsSearchParams.setObjectIdentification(this.objectIdentification)
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
