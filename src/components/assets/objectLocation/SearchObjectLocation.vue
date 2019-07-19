<template>
    <div>
        <!-- MODULE NAME -->
        <v-layout align-center justify-start row fill-height @click="loadData()" class="pointer">
            <v-flex sm2 md2>
                <v-icon v-if="!active" large>keyboard_arrow_right</v-icon>
                <v-icon v-if="active" large>keyboard_arrow_down</v-icon>
            </v-flex>
            <v-flex sm10 md10>
                <h3>Localização</h3>
            </v-flex>
        </v-layout>
        <!-- MODULE SEARCH INPUTS -->
        <v-layout v-if="active" row wrap>
            <!-- IST SPACE -->
            <template v-if="selectedInputMethod === 0">
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <span>Localização IST:</span>
                </v-flex>
                <!-- Dropdown -->
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <v-select
                    :items="locationsList"
                    v-model="selectedLocation"
                    label="Espaço"
                    v-on:change="getLocationId()"
                    solo
                    ></v-select>
                </v-flex>
                <!-- Tree Node -->
                <SearchLocationNode v-if="selectedLocation" :parentId="selectedLocationId" :key="locationChildKey"/>
                <!-- Cabinet/Drawer/Position -->
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <span>Localização específica:</span>
                </v-flex>
                <!-- Cabinet -->
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <v-text-field
                    v-model="objectLocation.istSpace.cabinet"
                    label="Armário"
                    v-on:input="updateStoreLocation()"
                    solo
                    ></v-text-field>
                </v-flex>
                <!-- Drawer -->
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <v-text-field
                    v-model="objectLocation.istSpace.drawer"
                    label="Gaveta"
                    v-on:input="updateStoreLocation()"
                    solo
                    ></v-text-field>
                </v-flex>
                <!-- Position -->
                <v-flex sm10 md10 offset-sm1 offset-md1>
                    <v-text-field
                    v-model="objectLocation.istSpace.position"
                    label="Posição"
                    v-on:input="updateStoreLocation()"
                    solo
                    ></v-text-field>
                </v-flex>
            </template>
            <!-- ADDRESS -->
            <template v-if="selectedInputMethod === 1">
                <v-layout row wrap>
                    <v-flex sm10 md10 offset-sm1 offset-md1>
                        <span>Morada:</span>
                    </v-flex>
                    <v-flex sm10 md10 offset-sm1 offset-md1>
                        <v-text-field
                        v-model="objectLocation.address.name"
                        label="Morada"
                        v-on:input="updateStoreLocation()"
                        solo
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </template>
            <v-layout row wrap>
                <v-flex sm12 md6>
                    <v-btn :color="selectedInputMethod === 0 ? 'success' : 'info'" @click="updateLocationInputMethod(0)">Localização IST</v-btn>
                </v-flex>
                <v-flex sm12 md6>
                    <v-btn :color="selectedInputMethod === 1 ? 'success' : 'info'" @click="updateLocationInputMethod(1)">Morada</v-btn>
                </v-flex>
            </v-layout>
        </v-layout>
    </div>
</template>

<script>
// Api
import axios from 'axios'
// Store
import AssetsSearchParams from '@/assets/store/AssetsSearchParams'
import AssetSearchLocationStore from '@/components/assets/objectLocation/store/AssetSearchLocationStore'
// Recursive components
import SearchLocationNode from '@/components/assets/objectLocation/treeNodes/SearchLocationNode'

export default {
    name: 'SearchObjectLocation',
    props: ['modules'],
    components: {
        SearchLocationNode
    },
    data() {
        return {
            objectLocation: {
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
            active: false,
            selectedInputMethod: 0,
            dataAlreadyLoaded: false,
            rawLocations: [],
            locationsList: [],
            selectedLocation: null,
            selectedLocationId: null,
            locationChildKey: null
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
        loadData() {
            this.active = !this.active
            if(!this.dataAlreadyLoaded) {
                this.getLocations()
                this.dataAlreadyLoaded = true
            }

        },
        getLocationId() {
            // Get id of selected location
            let selectedLocationIndex = this.rawLocations.findIndex(x => x.name == this.selectedLocation)
            this.selectedLocationId = this.rawLocations[selectedLocationIndex].id

            // Update location in store
            AssetSearchLocationStore.setIstId(this.selectedLocationId)
            AssetsSearchParams.setObjectLocation(AssetSearchLocationStore.getLocation())

            // Update children
            this.locationChildKey += 1
        },
        updateLocationInputMethod(method) {
            this.selectedInputMethod = method
            this.objectLocation.istSpace.room = null
            this.selectedLocation = null
            this.selectedLocationId = null
            this.objectLocation.istSpace.cabinet = null
            this.objectLocation.istSpace.drawer = null
            this.objectLocation.istSpace.position = null
            this.objectLocation.address.name = null

            // Update location in store
            AssetSearchLocationStore.setIstId(this.selectedLocationId)
            AssetSearchLocationStore.setIstSubLocation(this.objectLocation.istSpace.cabinet, this.objectLocation.istSpace.drawer, this.objectLocation.istSpace.position)
            AssetSearchLocationStore.setAddress(this.objectLocation.address.name)
            AssetsSearchParams.setObjectLocation(AssetSearchLocationStore.getLocation())

        },
        updateStoreLocation() {
            AssetSearchLocationStore.setIstSubLocation(this.objectLocation.istSpace.cabinet, this.objectLocation.istSpace.drawer, this.objectLocation.istSpace.position)
            AssetSearchLocationStore.setAddress(this.objectLocation.address.name)
        }
    },
    created() {
        this.getLocations()
    }
}
</script>

<style scoped>

    .pointer {
        cursor: pointer;
    }

</style>
