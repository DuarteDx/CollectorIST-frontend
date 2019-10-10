<template>
    <div>
        <!-- MODULE NAME -->
        <v-layout align-center justify-start row fill-height @click="active = !active" class="pointer">
            <v-flex sm2 md2>
                <v-icon v-if="!active" large>keyboard_arrow_right</v-icon>
                <v-icon v-if="active" large>keyboard_arrow_down</v-icon>
            </v-flex>
            <v-flex sm10 md10>
                <h3>História</h3>
            </v-flex>
        </v-layout>
        <!-- MODULE SEARCH INPUTS -->
        <v-layout v-if="active" wrap>
            <v-layout row wrap>
                <!-- TITLE -->
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <span>Data inicio</span>
                </v-flex>
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <v-text-field
                    label="Inserir data inicio..."
                    v-model="objectHistory.initial"
                    v-on:input="updateStore()"
                    solo
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <!-- TITLE -->
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <span>Data fim</span>
                </v-flex>
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <v-text-field
                    label="Inserir data fim..."
                    v-model="objectHistory.end"
                    v-on:input="updateStore()"
                    solo
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <!-- TITLE -->
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <span>Local</span>
                </v-flex>
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <v-text-field
                    label="Inserir Local..."
                    v-model="objectHistory.local"
                    v-on:input="updateStore()"
                    solo
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <!-- TITLE -->
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <span>Atividade</span>
                </v-flex>
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <v-text-field
                    label="Inserir Atividade..."
                    v-model="objectHistory.activity"
                    v-on:input="updateStore()"
                    solo
                    ></v-text-field>
                </v-flex>
            </v-layout>
        </v-layout>
    </div>
</template>

<script>
import AssetsSearchParams from '@/assets/store/AssetsSearchParams'

export default {
    name: 'SearchObjectHistory',
    props: ['modules'],
    data() {
        return {
            objectHistory: {
                initial: null,
                end: null,
                local: null,
                activity: null
            },
            active: false,
        }
    },
    methods: {
        loadData() {
            this.active = !this.active
            if(!this.dataAlreadyLoaded) {
                // Get index of current module
                this.currentModuleIndex = this.modules.findIndex(x => x.moduleName === 'objectHistory')
                
                // Making sure these operations are only executed once
                this.dataAlreadyLoaded = true
            }
        },
        updateStore() {
            AssetsSearchParams.setObjectHistory(this.objectHistory)
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
