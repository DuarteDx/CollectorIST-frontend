<template>
    <v-layout wrap row style="background-color: #7a99bd80;">
        <v-flex md12> <h1 style="color: red;">Object Location</h1></v-flex>
        <!--USUAL LOCATION-->
        <v-flex md6 class="category-name">
            <span class="ml">Localização habitual:</span>
        </v-flex>
        <v-flex md6 v-if="asset.usual.istSpace.room" class="category-data">
            <span v-for="(space, key) in istUsualSpacesPath" v-bind:key="key" >{{space}} <span v-if="key < istUsualSpacesPath.length - 1 "> > </span> </span>
        </v-flex>
        <template v-if="asset.usual.coordinates.lat">
            <v-flex md3 class="category-data">
                <span> Latitude: {{asset.usual.coordinates.lat}} </span>
            </v-flex>
            <v-flex md3 class="category-data">
                <span> Longitude: {{asset.usual.coordinates.long}} </span>
            </v-flex>
        </template>
        <v-flex md6 v-if="asset.usual.address.name" class="category-data">
            <span> Morada: {{asset.usual.address.name}} </span>
        </v-flex>
        <v-flex md6 v-if="!asset.usual.istSpace.room && !asset.usual.coordinates.lat && !asset.usual.address.name" class="category-data">
            <i>Indefinida</i>
        </v-flex>
        <!--NEW USUAL LOCATION-->
        <v-flex md6 class="category-name">
            <span class="ml">Nova Localização habitual:</span>
        </v-flex>
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
                v-on:input="updateStoreUsualLocation()"
                ></v-text-field>
                <v-text-field
                v-model="location.usual.istSpace.drawer"
                label="Prateleira/Gaveta"
                v-on:input="updateStoreUsualLocation()"
                ></v-text-field>
                <v-text-field
                v-model="location.usual.istSpace.position"
                label="Posição"
                v-on:input="updateStoreUsualLocation()"
                ></v-text-field>
            </template>
        </template>
        <!--Coordinates-->
        <v-layout v-if="usualLocationSelectedButton == 1">
            <v-flex md5 style="margin-right: 15px;">
                <v-text-field
                v-model="location.usual.coordinates.lat"
                label="Latitude"
                v-on:input="updateStoreUsualLocation()"
                ></v-text-field>
            </v-flex>
            <v-flex md5>
                <v-text-field
                v-model="location.usual.coordinates.long"
                label="Longitude"
                v-on:input="updateStoreUsualLocation()"
                ></v-text-field>
            </v-flex>
        </v-layout>
        <!--Address-->
        <template v-if="usualLocationSelectedButton == 2">
            <v-text-field
            v-model="location.usual.address.name"
            label="Morada"
            v-on:input="updateStoreUsualLocation()"
            ></v-text-field>
        </template>
        <v-flex md12>
            <v-btn :color="usualLocationSelectedButton == 0 ? 'success' : 'info'" style="margin-left: 0px;" @click="toggleUsualLocationButton(0)">Localização IST</v-btn>
            <v-btn :color="usualLocationSelectedButton == 1 ? 'success' : 'info'" style="margin-left: 0px;" @click="toggleUsualLocationButton(1)">Coordenadas</v-btn>
            <v-btn :color="usualLocationSelectedButton == 2 ? 'success' : 'info'" style="margin-left: 0px;" @click="toggleUsualLocationButton(2)">Outra Localização</v-btn>
        </v-flex>
        
        <!--CURRENT LOCATION-->
        <v-flex md6 class="category-name">
            <span class="ml">Localização atual:</span>
        </v-flex>
        <v-flex md6 v-if="asset.current.istSpace.room" class="category-data">
            <span v-for="(space, key) in istCurrentSpacesPath" v-bind:key="key" >{{space}} <span v-if="key < istCurrentSpacesPath.length - 1 "> > </span> </span>
        </v-flex>
        <template v-if="asset.current.coordinates.lat">
            <v-flex md3 class="category-data">
                <span> Latitude: {{asset.current.coordinates.lat}} </span>
            </v-flex>
            <v-flex md3 class="category-data">
                <span> Longitude: {{asset.current.coordinates.long}} </span>
            </v-flex>
        </template>
        <v-flex md6 v-if="asset.current.address.name" class="category-data">
            <span> Morada: {{asset.current.address.name}} </span>
        </v-flex>
        <v-flex md6 v-if="!asset.current.istSpace.room && !asset.current.coordinates.lat && !asset.current.address.name" class="category-data">
            <i>Indefinida</i>
        </v-flex>
        <!--NEW CURRENT LOCATION-->
        <v-flex md6 class="category-name">
            <span class="ml">Nova Localização habitual:</span>
        </v-flex>
        <!--Room-->
        <template v-if="currentLocationSelectedButton == 0">
            <!--Dropdown-->
            <v-select
            :items="locationsList"
            v-model="currentSelectedLocation"
            label="Espaço"
            v-on:change="getCurrentLocationId()"
            ></v-select>
            <!--ChildNode-->
            <CurrentLocationNode v-if="currentSelectedLocation.length > 0" :parentId="currentSelectedLocationId" :key="currentLocationChildKey"/>
            <!--Cabinet-->
            <template v-if="currentSelectedLocation.length > 0">
                <v-text-field
                v-model="location.current.istSpace.cabinet"
                label="Armário"
                v-on:input="updateStoreCurrentLocation()"
                ></v-text-field>
                <v-text-field
                v-model="location.current.istSpace.drawer"
                label="Prateleira/Gaveta"
                v-on:input="updateStoreCurrentLocation()"
                ></v-text-field>
                <v-text-field
                v-model="location.current.istSpace.position"
                label="Posição"
                v-on:input="updateStoreCurrentLocation()"
                ></v-text-field>
            </template>
        </template>
        <!--Coordinates-->
        <v-layout v-if="currentLocationSelectedButton == 1">
            <v-flex md5 style="margin-right: 15px;">
                <v-text-field
                v-model="location.current.coordinates.lat"
                label="Latitude"
                v-on:input="updateStoreCurrentLocation()"
                ></v-text-field>
            </v-flex>
            <v-flex md5>
                <v-text-field
                v-model="location.current.coordinates.long"
                label="Longitude"
                v-on:input="updateStoreCurrentLocation()"
                ></v-text-field>
            </v-flex>
        </v-layout>
        <!--Address-->
        <template v-if="currentLocationSelectedButton == 2">
            <v-text-field
            v-model="location.current.address.name"
            label="Morada"
            v-on:input="updateStoreCurrentLocation()"
            ></v-text-field>
        </template>
        <v-flex md12>
            <v-btn :color="currentLocationSelectedButton == 0 ? 'success' : 'info'" style="margin-left: 0px;" @click="toggleCurrentLocationButton(0)">Localização habitual</v-btn>
            <v-btn :color="currentLocationSelectedButton == 1 ? 'success' : 'info'" style="margin-left: 0px;" @click="toggleCurrentLocationButton(1)">Localização IST</v-btn>
            <v-btn :color="currentLocationSelectedButton == 2 ? 'success' : 'info'" style="margin-left: 0px;" @click="toggleCurrentLocationButton(2)">Coordenadas</v-btn>
            <v-btn :color="currentLocationSelectedButton == 3 ? 'success' : 'info'" style="margin-left: 0px;" @click="toggleCurrentLocationButton(3)">Outra Localização</v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    name: 'EditObjectLocation',
    props: ['asset'],
    data() {
        return {
            rawLocations: [],
            locationsList: [],
            usualSelectedLocation: '',
            currentSelectedLocation: '',
            usualSelectedLocationId: null,
            currentSelectedLocationId: null,
            usualLocationChildKey: 0,
            currentLocationChildKey: 0,
            usualLocationSelectedButton: 0,
            currentLocationSelectedButton: 1,
            selectedButton: 1,
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
            }
        }
    },
    methods: {
            async getLocations() {
                var component = this
                await axios.get('https://fenix.tecnico.ulisboa.pt/api/fenix/v1/spaces')
                    .then((response) => {
                        this.rawLocations = response.data
                        this.rawLocations.forEach((subLocation) => {
                            this.locationsList.push(subLocation.name)
                        })
                    })
            },
            getUsualLocationId() {
                // Get id of selected location
                let selectedLocationIndex = this.rawLocations.findIndex(x => x.name == this.usualSelectedLocation)
                this.usualSelectedLocationId = this.rawLocations[selectedLocationIndex].id

                // Update usual location in store
                AssetInsertionLocationStore.setUsualIstId(this.usualSelectedLocationId)
                AssetInsertionStore.setObjectLocation(AssetInsertionLocationStore.getLocation())

                // Update children
                this.usualLocationChildKey += 1
            },
            getCurrentLocationId() {
                // Get id of selected location
                let selectedLocationIndex = this.rawLocations.findIndex(x => x.name == this.currentSelectedLocation)
                this.currentSelectedLocationId = this.rawLocations[selectedLocationIndex].id

                // Update current location in store
                AssetInsertionLocationStore.setCurrentIstId(this.currentSelectedLocationId)
                AssetInsertionStore.setObjectLocation(AssetInsertionLocationStore.getLocation())

                // Update children
                this.currentLocationChildKey += 1
            },
            toggleUsualLocationButton(selectedButton) {
                this.selectedButton = selectedButton
                this.usualLocationSelectedButton = selectedButton
                this.location.usual.coordinates.lat = null
                this.location.usual.coordinates.long = null
                this.location.usual.istSpace.room = null
                this.usualSelectedLocation = ''
                this.location.usual.istSpace.cabinet = null
                this.location.usual.istSpace.drawer = null
                this.location.usual.istSpace.position = null
                this.location.usual.address.name = null
                this.updateStoreUsualLocation()
                this.updateMainStore()
            },
            toggleCurrentLocationButton(selectedButton) {
                this.selectedButton = selectedButton
                this.currentLocationSelectedButton = selectedButton
                this.location.current.coordinates.lat = null
                this.location.current.coordinates.long = null
                this.location.current.istSpace.room = null
                this.currentSelectedLocation = ''
                this.location.current.istSpace.cabinet = null
                this.location.current.istSpace.drawer = null
                this.location.current.istSpace.position = null
                this.location.current.address.name = null
                this.updateStoreCurrentLocation()
                this.updateMainStore()
            },
            updateStoreUsualLocation() {
                AssetInsertionLocationStore.setUsualCoordinates(this.location.usual.coordinates.lat, this.location.usual.coordinates.long)
                AssetInsertionLocationStore.setUsualIstSubLocation(this.location.usual.istSpace.cabinet, this.location.usual.istSpace.drawer, this.location.usual.istSpace.position)
                AssetInsertionLocationStore.setUsualAddress(this.location.usual.address.name)
            },
            updateStoreCurrentLocation() {
                if(this.selectedButton === 0) {
                    let usualLocation = AssetInsertionLocationStore.getUsualLocation()
                    AssetInsertionLocationStore.setCurrentCoordinates(usualLocation.coordinates.lat, usualLocation.coordinates.long)
                    AssetInsertionLocationStore.setCurrentIstSubLocation(usualLocation.istSpace.cabinet, usualLocation.istSpace.drawer, usualLocation.istSpace.position)
                    AssetInsertionLocationStore.setCurrentAddress(usualLocation.address.name)
                }
                else {
                    AssetInsertionLocationStore.setCurrentCoordinates(this.location.current.coordinates.lat, this.location.current.coordinates.long)
                    AssetInsertionLocationStore.setCurrentIstSubLocation(this.location.current.istSpace.cabinet, this.location.current.istSpace.drawer, this.location.current.istSpace.position)
                    AssetInsertionLocationStore.setCurrentAddress(this.location.current.address.name)
                }
            },
            updateMainStore() {
                AssetInsertionStore.setObjectLocation(AssetInsertionLocationStore.getLocation())
            }
    },
    created() {

    }
}
</script>

<style scoped>

    .category-name {
        margin: 20px 0 20px 0;
        margin-left: 0 !important;
        font-size: 20px;
    }

    .category-data {
        margin: 20px 0 20px 0;
        font-size: 20px;
        color: #898989;
    }

</style>

