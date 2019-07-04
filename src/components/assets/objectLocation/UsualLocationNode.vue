<template>
  <div>
    <v-select
        v-if="locationsList.length > 0"
        :items="locationsList"
        v-model="selectedLocation"
        label="Sub-espaço"
        v-on:change="getLocationId()"
    ></v-select>

    <UsualLocationNode
        v-if="selectedLocationId != null"
        :parentId="rawLocations.containedSpaces[selectedLocationId].id"
        :key="childKey"
    ></UsualLocationNode>

  </div>
</template>

<script>
  import axios from 'axios'
  import locationAssetInsertion from '@/assets/store/locationAssetInsertion.js'
  import assetInsertion from '@/assets/store/assetInsertion'

  export default { 
    props: [ 'parentId' ],
    name: 'UsualLocationNode',
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

            // Set usual location in store
            locationAssetInsertion.setUsualSelectedLocation(this.rawLocations.containedSpaces[this.selectedLocationId].id)
            assetInsertion.setUsualIstRoom(locationAssetInsertion.getUsualSelectedLocation())

            // Update child node
            this.childKey += 1
        }
    },
    async created() {
        var component = this
        await axios.get('https://fenix.tecnico.ulisboa.pt/api/fenix/v1/spaces/' + this.parentId)
            .then(function(response) {
                component.rawLocations = response.data
                component.rawLocations.containedSpaces.forEach(function(subLocation) {
                    if(subLocation.name != '') {
                        component.locationsList.push(subLocation.name)
                    }
                })
            })
    }
  }
</script>