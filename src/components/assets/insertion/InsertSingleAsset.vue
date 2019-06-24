<template>
    <form style="margin: 90px;">
        <h2>Inserir nova peça</h2>
        <h4>Informação básica</h4>
        <!--TITLE-->
        <v-text-field
        v-model="title"
        label="Título"
        required
        ></v-text-field>

        <!--AUTHOR-->
        <v-text-field
        v-model="creator"
        label="Autor"
        required
        ></v-text-field>

         <!--OLD IDs-->
        <h4>Ids atribuídos à peça anteriormente</h4>
        <v-text-field
        v-model="optionalId"
        label="Id opcional"
        ></v-text-field>

        <!--LOCATION-->
        <h4>Localização da peça</h4>
        <!--Coordinate-->
        <v-layout v-if="locationInputMethod">
            <v-flex md5 style="margin-right: 15px;">
                <v-text-field
                v-model="location.coordinates.lat"
                label="Latitude"
                ></v-text-field>
            </v-flex>
            <v-flex md5>
                <v-text-field
                v-model="location.coordinates.long"
                label="Longitude"
                ></v-text-field>
            </v-flex>
        </v-layout>
        <!--Room-->
        <!--Dropdown-->
        <template v-if="!locationInputMethod">
            <v-select
            :items="locationsList"
            v-model="selectedLocation"
            label="Espaço"
            v-on:change="getLocationId()"
            ></v-select>
            <!--ChildNode-->
            <LocationNode v-if="selectedLocation.length > 0" :parentId="selectedLocationId" :key="locationChildKey"/>
            <!--Cabinet-->
            <template v-if="selectedLocation.length > 0">
                <v-text-field
                v-model="location.cabinet"
                label="Armário"
                ></v-text-field>
                <v-text-field
                v-model="location.drawer"
                label="Prateleira/Gaveta"
                ></v-text-field>
                <v-text-field
                v-model="location.position"
                label="Posição"
                ></v-text-field>
            </template>
        </template>
        <!--Toogle location input mode-->
        <v-btn color="info" @click="toggleLocationInputMethod()">Outras opções de localização</v-btn>

        <!--CATEGORY-->
        <h4>Categoria</h4>
        <!-- Select category dropdown | Recursive component -->
        <CategoriesNode v-if="rawCategories.length > 0" :categories="rawCategories"/>

        <!--DOCUMENTS-->
        <!--User can select multiple files with Ctrl+click-->
        <h4>Anexar documentos</h4>
        <br>
        <input type="file" id="file" ref="file" class="file-input" multiple v-on:change="handleFileUpload()"/>
        <div v-for="(document, index) in rawDocuments" v-bind:key="index">
            {{ document.name }}
        </div>
        <br>

        <v-btn @click="submit()">submit</v-btn>
        <v-btn @click="clear()">clear</v-btn>

        <p v-if="inserted">New asset inserted!</p>
    </form>


</template>

<script>
import api from '@/api/api'
import axios from 'axios'
import Credentials from '@/assets/scripts/login.js'
import CategoriesNode from './CategoriesNode'
import categoriesAssetInsert from '@/assets/store/selectedCategoryAssetInsertion.js'
import LocationNode from './LocationNode'
import locationAssetInsertion from '@/assets/store/locationAssetInsertion.js'

export default {
    name: 'InsertSingleAsset',
    components: {
        CategoriesNode,
        LocationNode
    },
    data() {
        return {
            creator: '',
            title: '',
            inserted: false,
            rawCategories: [],
            optionalId: '',
            location: {
                coordinates: {
                    lat: null,
                    long: null
                },
                room: null,
                cabinet: null,
                drawer: null,
                position: null
            },
            locationInputMethod: false,
            rawDocuments: [],
            formDocuments: [],
            rawLocations: [],
            locationsList: [],
            selectedLocation: '',
            selectedLocationId: null,
            locationChildKey: 0
            
        }
    },
    methods: {
        async submit() {
            this.formDocuments = new FormData()
            for(var i=0; i<this.rawDocuments.length; i++) {
                this.formDocuments.append("file" + i, this.rawDocuments[i])
            }
            const response = await api().post('/assets/' + Credentials.getToken() , {
                author: this.creator,
                title: this.title,
                category: categoriesAssetInsert.getSelectedCategory(),
                optionalId: this.optionalId,
                location: {
                    coordinates: {
                        lat: this.location.coordinates.lat,
                        long: this.location.coordinates.long
                    },
                    room: locationAssetInsertion.getSelectedLocation(),
                    cabinet: this.location.cabinet,
                    drawer: this.location.drawer,
                    position: this.location.position
                },
                files: this.formDocuments
            })
            console.log(response)
            if(response.status == 200) {
                this.inserted = true
                this.clear()
            }
        },
        clear() {
            // Reset all form variables
            this.creator = ''
            this.title = ''
            this.subCategoriesBoolean = false
            this.location.coordinates.lat = null
            this.location.coordinates.long = null
            this.location.room = null
            this.optionalId = '',
            locationAssetInsertion.resetSelectedLocation()
        },
        async fetchCategories() {
            var component = this
            await api().get('/category')
                .then(function(response) {
                    console.log(response)
                    component.rawCategories = response.data
                })
        },
        toggleLocationInputMethod() {
            this.locationInputMethod = !this.locationInputMethod
            this.location.coordinates.lat = null
            this.location.coordinates.long = null
            this.location.room = null
        },
        handleFileUpload() {
            this.rawDocuments = this.$refs.file.files
            console.log(this.rawDocuments)
        },
        async getLocations() {
            var component = this
            await axios.get('https://fenix.tecnico.ulisboa.pt/api/fenix/v1/spaces')
                .then(function(response) {
                    component.rawLocations = response.data
                    console.log(component.rawLocations)
                    component.rawLocations.forEach(function(subLocation) {
                        component.locationsList.push(subLocation.name)
                    })
                })
        },
        getLocationId() {
            // Get id of selected location
            var selectedLocationIndex = this.rawLocations.findIndex(x => x.name == this.selectedLocation)
            console.log(selectedLocationIndex)
            this.selectedLocationId = this.rawLocations[selectedLocationIndex].id
            console.log(this.selectedLocationId)

            // Update children
            this.locationChildKey += 1
            console.log(this.locationChildKey)
        }
    },
    created() {
        this.fetchCategories()
        this.getLocations()
    }
}
</script>


<style scoped>

.file-input {
    margin-bottom: 20px;
}

</style>
