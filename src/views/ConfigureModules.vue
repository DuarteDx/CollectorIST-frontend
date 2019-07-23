<template>
    <div>
        <v-layout row wrap justify-center align-center style="margin-top: 30px;">
            <v-flex sm5 md3>
                <v-select
                :items="modules"
                v-model="selectedModule"
                label="Módulo"
                solo
                ></v-select>
            </v-flex>
        </v-layout>
        <v-layout row justify-center>
            <v-flex sm6 md6>
                <v-card>
                    <ConfigObjectDescription v-if="selectedModule === 'Categorias'" style="padding: 40px;"/>
                    <ConfigObjectCollection v-if="selectedModule === 'Coleções'" style="padding: 40px;"/>
                    <ConfigObjectIdentification v-if="selectedModule === 'Ids opcionais'" style="padding: 40px;"/>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import ConfigObjectDescription from '@/components/assets/objectDescription/ConfigObjectDescription'
import ConfigObjectCollection from '@/components/assets/objectCollection/ConfigObjectCollection'
import ConfigObjectIdentification from '@/components/assets/objectIdentification/ConfigObjectIdentification'

export default {
	name: 'ConfigureModules',
	components: {
        ConfigObjectDescription,
        ConfigObjectCollection,
        ConfigObjectIdentification
    },
    data() {
        return {
            selectedModule: 'Ids opcionais',
            modules: ['Ids opcionais', 'Coleções', 'Categorias']
        }
    },
    methods: {
        
    },
    created() {
        
    }
}
</script>

<style scoped>

</style>
