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
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import ConfigObjectDescription from '@/components/assets/objectDescription/ConfigObjectDescription'
import ConfigObjectCollection from '@/components/assets/objectCollection/ConfigObjectCollection'

export default {
	name: 'ConfigureModules',
	components: {
        ConfigObjectDescription,
        ConfigObjectCollection
    },
    data() {
        return {
            selectedModule: 'Coleções',
            modules: ['Categorias', 'Coleções']
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
