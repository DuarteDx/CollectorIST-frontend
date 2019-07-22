<template>
  <div>
    <v-select
        v-if="locationsList.length > 0"
        :items="locationsList"
        v-model="selectedLocation"
        label="Sub-espaço"
        v-on:change="getLocationId()"
        solo
    ></v-select>

    <CurrentLocationNode
        v-if="selectedLocationId != null"
        :parentId="rawLocations.containedSpaces[selectedLocationId].id"
        :key="childKey"
    ></CurrentLocationNode>

  </div>
</template>

<script>
    // Api
    import axios from 'axios'
    // Store
    import AssetInsertionLocationStore from '../store/AssetInsertionLocationStore.js'
    import AssetInsertionStore from '@/assets/store/AssetInsertionStore'

    export default { 
        props: [ 'parentId' ],
        name: 'CurrentLocationNode',
        data() {
            return {
                rawLocations: [],
                locationsList: [],
                selectedLocation: '',
                selectedLocationId: null,
                childKey: 0
            }
        },
        methods: {
            getLocationId() {
                // Get id of selected location
                this.selectedLocationId = this.rawLocations.containedSpaces.findIndex(x => x.name == this.selectedLocation)

                // Set current location in store
                AssetInsertionLocationStore.setCurrentIstId(this.rawLocations.containedSpaces[this.selectedLocationId].id)
                AssetInsertionStore.setObjectLocation(AssetInsertionLocationStore.getLocation())

                // Update child node
                this.childKey += 1
            }
        },
        async created() {
            await axios.get('https://fenix.tecnico.ulisboa.pt/api/fenix/v1/spaces/' + this.parentId)
                .then((response) => {
                    this.rawLocations = response.data
                    this.rawLocations.containedSpaces.forEach(function(subLocation) {
                        if(subLocation.name != '') {
                            this.locationsList.push(subLocation.name)
                        }
                    })
                })
        }
    }
</script>