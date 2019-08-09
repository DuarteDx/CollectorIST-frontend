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
            <!-- AUTHOR -->
            <v-layout row wrap>
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <span>Autor</span>
                </v-flex>
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <v-text-field
                    label="Inserir autor..."
                    v-model="pinturas.author"
                    v-on:input="updateStore()"
                    solo
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <!-- YEAR -->
            <v-layout row wrap>
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <span>Ano</span>
                </v-flex>
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <v-text-field
                    label="Inserir ano..."
                    v-model="pinturas.year"
                    v-on:input="updateStore()"
                    solo
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <!-- MATERIAL -->
            <v-layout row wrap>
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <span>Matéria</span>
                </v-flex>
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <v-text-field
                    label="Inserir matéria..."
                    v-model="pinturas.materia"
                    v-on:input="updateStore()"
                    solo
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <!-- SUPPORT -->
            <v-layout row wrap>
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <span>Suporte</span>
                </v-flex>
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <v-text-field
                    label="Inserir suporte..."
                    v-model="pinturas.suporte"
                    v-on:input="updateStore()"
                    solo
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <!-- TECHNIQUE -->
            <v-layout row wrap>
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <span>Técnica</span>
                </v-flex>
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <v-text-field
                    label="Inserir técnica..."
                    v-model="pinturas.tecnica"
                    v-on:input="updateStore()"
                    solo
                    ></v-text-field>
                </v-flex>
            </v-layout>
        </template>
    </div>
</template>

<script>
import AssetsSearchParams from '@/assets/store/AssetsSearchParams'

export default {
    name: 'pinturasSearch',
    props: ['modules'],
    components: {
    },
    data() {
        return {
            pinturas: {
                author: null,
                year: null,
                materia: [],
                suporte: null,
                tecnica: null
            },
            active: false,
            currentModuleIndex: -1,
            dataAlreadyLoaded: false
        }
    },
    methods: {
        loadData() {
            this.active = !this.active
            if(!this.dataAlreadyLoaded) {
                // Get index of current module
                this.currentModuleIndex = this.modules.findIndex(x => x.moduleName === 'pinturas')

                // Making sure this operation is only executed once
                this.dataAlreadyLoaded = true
            }
        },
        updateStore() {
            AssetsSearchParams.setPinturas(this.pinturas)
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
