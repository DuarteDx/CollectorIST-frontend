<template>
  <div>
    <v-select
        v-if="locationsList"
        :items="locationsList"
        v-model="selectedLocation"
        label="Sub-espaço"
        v-on:change="getLocationId()"
    ></v-select>

    <SearchLocationNode
        v-if="selectedLocationId"
        :parentId="selectedLocationId"
        :key="childKey"
    ></SearchLocationNode>

  </div>
</template>

<script>
    // Api
    import axios from 'axios'
    // Store
    import AssetsSearchParams from '@/assets/store/AssetsSearchParams'
    import AssetSearchLocationStore from '@/components/assets/objectLocation/store/AssetSearchLocationStore'

    export default { 
        props: [ 'parentId' ],
        name: 'SearchLocationNode',
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
                let selectedLocationIndex = this.rawLocations.containedSpaces.findIndex(x => x.name == this.selectedLocation)
                
                // Set current location in store
                this.selectedLocationId = this.rawLocations.containedSpaces[selectedLocationIndex].id
                AssetSearchLocationStore.setIstId(this.selectedLocationId)
                AssetsSearchParams.setObjectLocation(AssetSearchLocationStore.getLocation())

                // Update child node
                this.childKey += 1
            }
        },
        async created() {
            await axios.get('https://fenix.tecnico.ulisboa.pt/api/fenix/v1/spaces/' + this.parentId)
                .then((response) => {
                    this.rawLocations = response.data
                    this.rawLocations.containedSpaces.forEach((subLocation) => {
                        if(subLocation.name) {
                            this.locationsList.push(subLocation.name)
                        }
                    })
                })
        }
    }
</script>