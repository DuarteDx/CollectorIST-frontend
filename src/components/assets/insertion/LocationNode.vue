<template>
  <div>
    <v-select
        :items="locationsList"
        v-model="selectedLocation"
        label="Espaço"
        v-on:change="getLocationId()"
    ></v-select>

    <LocationNode
        v-if="selectedLocationId != null"
        :parentId="rawLocations.containedSpaces[selectedLocationId].id"
        :key="childKey"
    ></LocationNode>

  </div>
</template>

<script>
  import axios from 'axios'
  import locationAssetInsertion from '@/assets/store/locationAssetInsertion.js'

  export default { 
    props: [ 'parentId' ],
    name: 'LocationNode',
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

            // Update child node
            this.childKey += 1
        }
    },
    async created() {
        var component = this
        await axios.get('https://fenix.tecnico.ulisboa.pt/api/fenix/v1/spaces/' + this.parentId)
            .then(function(response) {
                component.rawLocations = response.data
                console.log(component.rawLocations)
                component.rawLocations.containedSpaces.forEach(function(subLocation) {
                    component.locationsList.push(subLocation.name)
                })
            })
    }
  }
</script>