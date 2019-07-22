<template>
    <v-layout wrap row style="background-color: #7a99bd80;">
        <v-flex md12> <h1 style="color: red;">Object Location</h1></v-flex>
        <v-flex md6 class="category-name">
            <span class="ml">Localização habitual:</span>
        </v-flex>
        <!--USUAL LOCATION-->
        <v-flex md6 v-if="asset.ObjectLocation.usual.istSpace.room" class="category-data">
            <span v-for="(space, key) in istUsualSpacesPath" v-bind:key="key" >{{space}} <span v-if="key < istUsualSpacesPath.length - 1 "> > </span> </span>
        </v-flex>
        <template v-if="asset.ObjectLocation.usual.coordinates.lat">
            <v-flex md3 class="category-data">
                <span> Latitude: {{asset.ObjectLocation.usual.coordinates.lat}} </span>
            </v-flex>
            <v-flex md3 class="category-data">
                <span> Longitude: {{asset.ObjectLocation.usual.coordinates.long}} </span>
            </v-flex>
        </template>
        <v-flex md6 v-if="asset.ObjectLocation.usual.address.name" class="category-data">
            <span> Morada: {{asset.ObjectLocation.usual.address.name}} </span>
        </v-flex>
        <v-flex md6 v-if="!asset.ObjectLocation.usual.istSpace.room && !asset.ObjectLocation.usual.coordinates.lat && !asset.ObjectLocation.usual.address.name" class="category-data">
            <i>Indefinida</i>
        </v-flex>

        <!--CURRENT LOCATION-->
        <v-flex md6 class="category-name">
            <span class="ml">Localização atual:</span>
        </v-flex>
        <v-flex md6 v-if="asset.ObjectLocation.current.istSpace.room" class="category-data">
            <span v-for="(space, key) in istCurrentSpacesPath" v-bind:key="key" >{{space}} <span v-if="key < istCurrentSpacesPath.length - 1 "> > </span> </span>
        </v-flex>
        <template v-if="asset.ObjectLocation.current.coordinates.lat">
            <v-flex md3 class="category-data">
                <span> Latitude: {{asset.ObjectLocation.current.coordinates.lat}} </span>
            </v-flex>
            <v-flex md3 class="category-data">
                <span> Longitude: {{asset.ObjectLocation.current.coordinates.long}} </span>
            </v-flex>
        </template>
        <v-flex md6 v-if="asset.ObjectLocation.current.address.name" class="category-data">
            <span> Morada: {{asset.ObjectLocation.current.address.name}} </span>
        </v-flex>
        <v-flex md6 v-if="!asset.ObjectLocation.current.istSpace.room && !asset.ObjectLocation.current.coordinates.lat && !asset.ObjectLocation.current.address.name" class="category-data">
            <i>Indefinida</i>
        </v-flex>

    </v-layout>
</template>

<script>
import axios from 'axios'

export default {
    name: 'DisplayObjectLocation',
    props: ['asset'],
    data() {
        return {
            istUsualSpacesPath: [],
            istCurrentSpacesPath: []
        }
    },
    methods: {
        async fetchLocationsTree() {
            const spacesUrl = 'https://fenix.tecnico.ulisboa.pt/api/fenix/v1/spaces/'
            var parentId = null
            // USUAL LOCATION
            if(this.asset.ObjectLocation.usual.istSpace.room) {
                var spaceInfo = await axios.get(spacesUrl + this.asset.ObjectLocation.usual.istSpace.room)
                this.istUsualSpacesPath.push(spaceInfo.data.name)
                while(spaceInfo.data.parentSpace) {
                    this.istUsualSpacesPath.push(spaceInfo.data.parentSpace.name)
                    try {
                        parentId = spaceInfo.data.parentSpace.id
                        spaceInfo = await axios.get(spacesUrl + parentId)
                    }
                    catch {
                        //No more parents
                    }
                }
                this.istUsualSpacesPath.reverse()
            }
            // CURRENT LOCATION
            if(this.asset.ObjectLocation.current.istSpace.room) {
                var spaceInfo = await axios.get(spacesUrl + this.asset.ObjectLocation.current.istSpace.room)
                this.istCurrentSpacesPath.push(spaceInfo.data.name)
                while(spaceInfo.data.parentSpace) {
                    this.istCurrentSpacesPath.push(spaceInfo.data.parentSpace.name)
                    try {
                        parentId = spaceInfo.data.parentSpace.id
                        spaceInfo = await axios.get(spacesUrl + parentId)
                    }
                    catch {
                        //No more parents
                    }
                }
                this.istCurrentSpacesPath.reverse()
            }
        }

    },
    created() {
        this.fetchLocationsTree()
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

