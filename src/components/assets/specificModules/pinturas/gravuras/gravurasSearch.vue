<template>
    <div>
        <!-- MODULE NAME -->
        <v-layout align-center justify-start row fill-height @click="loadData()" class="pointer">
            <v-flex sm2 md2>
                <v-icon v-if="!active" large>keyboard_arrow_right</v-icon>
                <v-icon v-if="active" large>keyboard_arrow_down</v-icon>
            </v-flex>
            <v-flex sm10 md10>
                <h3>Gravuras</h3>
            </v-flex>
        </v-layout>
        <!-- MODULE SEARCH INPUTS -->
        <template v-if="active">
            <!-- QUANTITY OF COPIES -->
            <v-layout row wrap>
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <span>Quantidade de cópias</span>
                </v-flex>
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <v-text-field
                    label="Inserir valor..."
                    v-model="gravuras.amountOfCopies"
                    v-on:input="updateStore()"
                    solo
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <!-- COPY NUMBER -->
            <v-layout row wrap>
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <span>Número da cópia</span>
                </v-flex>
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <v-text-field
                    label="Inserir valor..."
                    v-model="gravuras.copyNumber"
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
    name: 'gravurasSearch',
    props: ['modules'],
    components: {
    },
    data() {
        return {
            gravuras: {
                amountOfCopies: null,
                copyNumber: null
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
                this.currentModuleIndex = this.modules.findIndex(x => x.moduleName === 'gravuras')

                // Making sure this operation is only executed once
                this.dataAlreadyLoaded = true
            }
        },
        updateStore() {
            AssetsSearchParams.setGravuras(this.gravuras)
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
