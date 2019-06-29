<template>
    <form class="asset-insert-form">
        <h2>Inserir nova peça</h2>

        <div class="basic-info">
            <h3>Informação básica</h3>
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
        </div>

         <!--OLD IDs-->
         <div class="old-id">
            <h3>Ids atribuídos à peça anteriormente</h3>
            <v-text-field
            v-model="optionalId"
            label="Id opcional"
            ></v-text-field>
         </div>

        <!--LOCATION-->
        <div class="location">
            <h3>Localização da peça</h3>
            <!--USUAL LOCATION-->
            <h4>Localização Habitual</h4>
            <v-btn :color="usualLocationSelectedButton == 0 ? 'success' : 'info'" style="margin-left: 0px;" @click="toggleUsualLocationButton(0)">Localização IST</v-btn>
                <v-btn :color="usualLocationSelectedButton == 1 ? 'success' : 'info'" style="margin-left: 0px;" @click="toggleUsualLocationButton(1)">Coordenadas</v-btn>
                <v-btn :color="usualLocationSelectedButton == 2 ? 'success' : 'info'" style="margin-left: 0px;" @click="toggleUsualLocationButton(2)">Outra Localização</v-btn>
            <!--Coordinate-->
            <v-layout v-if="usualLocationSelectedButton == 1">
                <v-flex md5 style="margin-right: 15px;">
                    <v-text-field
                    v-model="location.usual.coordinates.lat"
                    label="Latitude"
                    ></v-text-field>
                </v-flex>
                <v-flex md5>
                    <v-text-field
                    v-model="location.usual.coordinates.long"
                    label="Longitude"
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <!--Room-->
            <template v-if="usualLocationSelectedButton == 0">
                <!--Dropdown-->
                <v-select
                :items="locationsList"
                v-model="usualSelectedLocation"
                label="Espaço"
                v-on:change="getUsualLocationId()"
                ></v-select>
                <!--ChildNode-->
                <UsualLocationNode v-if="usualSelectedLocation.length > 0" :parentId="usualSelectedLocationId" :key="currentLocationChildKey"/>
                <!--Cabinet-->
                <template v-if="usualSelectedLocation.length > 0">
                    <v-text-field
                    v-model="location.usual.istSpace.cabinet"
                    label="Armário"
                    ></v-text-field>
                    <v-text-field
                    v-model="location.usual.istSpace.drawer"
                    label="Prateleira/Gaveta"
                    ></v-text-field>
                    <v-text-field
                    v-model="location.usual.istSpace.position"
                    label="Posição"
                    ></v-text-field>
                </template>
            </template>
            <template v-if="usualLocationSelectedButton == 2">
                <v-text-field
                v-model="location.usual.address.name"
                label="Morada"
                ></v-text-field>
            </template>
            <!--CURRENT LOCATION-->
            <h4>Localização atual</h4>
            <v-btn :color="currentLocationSelectedButton == 0 ? 'success' : 'info'" style="margin-left: 0px;" @click="toggleCurrentLocationButton(0)">Localização habitual</v-btn>
            <v-btn :color="currentLocationSelectedButton == 1 ? 'success' : 'info'" style="margin-left: 0px;" @click="toggleCurrentLocationButton(1)">Localização IST</v-btn>
            <v-btn :color="currentLocationSelectedButton == 2 ? 'success' : 'info'" style="margin-left: 0px;" @click="toggleCurrentLocationButton(2)">Coordenadas</v-btn>
            <v-btn :color="currentLocationSelectedButton == 3 ? 'success' : 'info'" style="margin-left: 0px;" @click="toggleCurrentLocationButton(3)">Outra Localização</v-btn>
            <template v-if="currentLocationSelectedButton == 1">
                <!--Dropdown-->
                <v-select
                :items="locationsList"
                v-model="currentSelectedLocation"
                label="Espaço"
                v-on:change="getCurrentLocationId()"
                ></v-select>
                <!--Recursive ist current location-->
                <CurrentLocationNode v-if="currentSelectedLocation.length > 0" :parentId="currentSelectedLocationId" :key="usualLocationChildKey"/>
                <!--Cabinet-->
                <template v-if="currentSelectedLocation.length > 0">
                    <v-text-field
                    v-model="location.current.istSpace.cabinet"
                    label="Armário"
                    ></v-text-field>
                    <v-text-field
                    v-model="location.current.istSpace.drawer"
                    label="Prateleira/Gaveta"
                    ></v-text-field>
                    <v-text-field
                    v-model="location.current.istSpace.position"
                    label="Posição"
                    ></v-text-field>
                </template>
            </template>
            <!--Coordinate-->
            <v-layout v-if="currentLocationSelectedButton == 2">
                <v-flex md5 style="margin-right: 15px;">
                    <v-text-field
                    v-model="location.current.coordinates.lat"
                    label="Latitude"
                    ></v-text-field>
                </v-flex>
                <v-flex md5>
                    <v-text-field
                    v-model="location.current.coordinates.long"
                    label="Longitude"
                    ></v-text-field>
                </v-flex>
            </v-layout>
            <template v-if="currentLocationSelectedButton == 3">
                <v-text-field
                v-model="location.current.address.name"
                label="Morada"
                ></v-text-field>
            </template>
        </div>

        <!--CATEGORY-->
        <div class="category">
            <h3>Categoria</h3>
            <!-- Select category dropdown | Recursive component -->
            <CategoriesNode v-if="rawCategories.length > 0" :categories="rawCategories"/>
        </div>

        <!--DOCUMENTS-->
        <div class="documents">
            <!--User can select multiple files with Ctrl+click-->
            <h3>Anexar documentos</h3>
            <br>
            <input type="file" id="file" ref="file" class="file-input" multiple v-on:change="handleFileUpload()"/>
            <div v-for="(document, index) in rawDocuments" v-bind:key="index">
                {{ document.name }}
                <v-text-field
                v-model="documentDescription[index]"
                label="Descrição do documento"
                required
                ></v-text-field>
            </div>
        </div>

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
import UsualLocationNode from './UsualLocationNode'
import CurrentLocationNode from './CurrentLocationNode'
import locationAssetInsertion from '@/assets/store/locationAssetInsertion.js'

export default {
    name: 'InsertSingleAsset',
    components: {
        CategoriesNode,
        UsualLocationNode,
        CurrentLocationNode
    },
    data() {
        return {
            creator: '',
            title: '',
            inserted: false,
            rawCategories: [],
            optionalId: '',
            location: {
                usual: {
                    coordinates: {
                        lat: null,
                        long: null
                    },
                    istSpace: {
                        room: null,
                        cabinet: null,
                        drawer: null,
                        position: null,
                    },
                    address: {
                        name: null
                    }
                },
                current: {
                    coordinates: {
                        lat: null,
                        long: null
                    },
                    istSpace: {
                        room: null,
                        cabinet: null,
                        drawer: null,
                        position: null,
                    },
                    address: {
                        name: null
                    }
                }
            },
            rawDocuments: [],
            formDocuments: [],
            rawLocations: [],
            locationsList: [],
            usualSelectedLocation: '',
            currentSelectedLocation: '',
            usualSelectedLocationId: null,
            currentSelectedLocationId: null,
            usualLocationChildKey: 0,
            currentLocationChildKey: 0,
            documentDescription: [],
            usualLocationSelectedButton: 0,
            currentLocationSelectedButton: 0
            
        }
    },
    methods: {
        async submit() {
            // If user decides to clone usual location into current location
            if(this.currentLocationSelectedButton === 0) {
                this.location.current.istSpace.room = locationAssetInsertion.getUsualSelectedLocation()
                this.location.current.istSpace.cabinet = this.location.usual.istSpace.cabinet
                this.location.current.istSpace.drawer = this.location.usual.istSpace.drawer
                this.location.current.istSpace.position = this.location.usual.istSpace.position
            }

            // Set asset parameters to send
            var newAsset = {
                author: this.creator,
                title: this.title,
                category: categoriesAssetInsert.getSelectedCategory(),
                optionalId: this.optionalId,
                location: {
                    usual: {
                        coordinates: {
                            lat: this.location.usual.coordinates.lat,
                            long: this.location.usual.coordinates.long
                        },
                        istSpace: {
                            room: locationAssetInsertion.getUsualSelectedLocation(),
                            cabinet: this.location.usual.cabinet,
                            drawer: this.location.usual.drawer,
                            position: this.location.usual.position,
                        },
                        address: {
                            name: this.location.usual.address.name
                        }
                    },
                    current: {
                        coordinates: {
                            lat: this.location.current.coordinates.lat,
                            long: this.location.current.coordinates.long
                        },
                        istSpace: {
                            room: this.location.current.istSpace.room,
                            cabinet: this.location.current.cabinet,
                            drawer: this.location.current.drawer,
                            position: this.location.current.position,
                        },
                        address: {
                            name: this.location.current.address.name
                        }
                    },
                },
                documents: {
                        size: this.rawDocuments.length,
                        descriptions: this.documentDescription
                    }
            }

            newAsset = JSON.stringify(newAsset)
            const blob = new Blob([newAsset], {
                type: 'application/json'
            })

            // Get all asset information into formData
            var formData = new FormData()
            // Documents
            for(var i=0; i<this.rawDocuments.length; i++) {
                formData.append("document" + i, this.rawDocuments[i])
            }
            // Other parameters
            formData.append("assetInfo", blob)

            const response = await api().post('/assets/' + Credentials.getToken(), formData)
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
            this.location.usual.coordinates.lat = null
            this.location.usual.coordinates.long = null
            this.location.current.coordinates.lat = null
            this.location.current.coordinates.long = null
            this.location.usual.istSpace.room = null
            this.location.current.istSpace.room = null
            this.optionalId = '',
            locationAssetInsertion.resetUsualSelectedLocation()
            locationAssetInsertion.resetCurrentSelectedLocation()
        },
        async fetchCategories() {
            var component = this
            await api().get('/category')
                .then(function(response) {
                    component.rawCategories = response.data
                })
        },
        toggleLocationInputMethod() {
            this.locationInputMethod = !this.locationInputMethod
            this.location.usual.coordinates.lat = null
            this.location.usual.coordinates.long = null
            this.location.current.coordinates.lat = null
            this.location.current.coordinates.long = null
            this.location.usual.istSpace.room = null
            this.location.current.istSpace.room = null
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
                    component.rawLocations.forEach(function(subLocation) {
                        component.locationsList.push(subLocation.name)
                    })
                })
        },
        getUsualLocationId() {
            // Get id of selected location
            var selectedLocationIndex = this.rawLocations.findIndex(x => x.name == this.usualSelectedLocation)
            this.usualSelectedLocationId = this.rawLocations[selectedLocationIndex].id

            // Update usual location in store
            locationAssetInsertion.setUsualSelectedLocation(this.usualSelectedLocationId)

            // Update children
            this.usualLocationChildKey += 1
        },
        getCurrentLocationId() {
            // Get id of selected location
            var selectedLocationIndex = this.rawLocations.findIndex(x => x.name == this.currentSelectedLocation)
            this.currentSelectedLocationId = this.rawLocations[selectedLocationIndex].id

            // Update current location in store
            locationAssetInsertion.setCurrentSelectedLocation(this.currentSelectedLocationId)

            // Update children
            this.currentLocationChildKey += 1
        },
        toggleUsualLocationButton(selectedButton) {
            this.usualLocationSelectedButton = selectedButton
            this.location.usual.coordinates.lat = null
            this.location.usual.coordinates.long = null
            this.location.usual.istSpace.room = null
            this.location.usual.istSpace.cabinet = null
            this.location.usual.istSpace.drawer = null
            this.location.usual.istSpace.position = null
            this.location.usual.address.name = null
        },
        toggleCurrentLocationButton(selectedButton) {
            this.currentLocationSelectedButton = selectedButton
            this.location.current.coordinates.lat = null
            this.location.current.coordinates.long = null
            this.location.current.istSpace.room = null
            this.location.current.istSpace.cabinet = null
            this.location.current.istSpace.drawer = null
            this.location.current.istSpace.position = null
            this.location.current.address.name = null
        }
    },
    created() {
        this.fetchCategories()
        this.getLocations()
    }
}
</script>


<style scoped>

.asset-insert-form {
    margin: 90px;
    background-color: rgba(128, 128, 128, 0.068);
    padding: 20px;
    border-radius: 5px;
}

.basic-info {
    margin-bottom: 40px;
}

.old-id {
    margin-bottom: 40px;
}

.location {
    margin-bottom: 40px;
}

.category {
    margin-bottom: 40px;
}

.documents {
    margin-bottom: 40px;
}

.file-input {
    margin-bottom: 20px;
}

</style>
