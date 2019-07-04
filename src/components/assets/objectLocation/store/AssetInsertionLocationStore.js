var AssetInsertionLocationStore = {

    ObjectLocation: {
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

    getLocation: function() {
        return this.ObjectLocation
    },

    // USUAL LOCATION
    getUsualLocation: function() {
        return this.ObjectLocation.usual
    },

    setUsualCoordinates: function(lat, long) {
        this.ObjectLocation.usual.coordinates.lat = lat
        this.ObjectLocation.usual.coordinates.long = long
    },

    setUsualIstId: function(id) {
        this.ObjectLocation.usual.istSpace.room = id
    },

    setUsualIstSubLocation: function(cabinet, drawer, position) {
        this.ObjectLocation.usual.istSpace.cabinet = cabinet
        this.ObjectLocation.usual.istSpace.drawer = drawer
        this.ObjectLocation.usual.istSpace.position = position
    },

    setUsualAddress: function(address) {
        this.ObjectLocation.usual.address.name = address
    },

    clearUsualLocation: function() {
        this.ObjectLocation.usual.coordinates.lat = null
        this.ObjectLocation.usual.coordinates.long = null
        this.ObjectLocation.usual.istSpace.room = null
        this.ObjectLocation.usual.istSpace.cabinet = null
        this.ObjectLocation.usual.istSpace.drawer = null
        this.ObjectLocation.usual.istSpace.position = null
        this.ObjectLocation.usual.address.name = null
    },

    // CURRENT LOCATION
    getCurrentLocation: function() {
        return this.ObjectLocation.current
    },

    setCurrentCoordinates: function(lat, long) {
        this.ObjectLocation.current.coordinates.lat = lat
        this.ObjectLocation.current.coordinates.long = long
    },

    setCurrentIstId: function(id) {
        this.ObjectLocation.current.istSpace.room = id
    },

    setCurrentIstSubLocation: function(cabinet, drawer, position) {
        this.ObjectLocation.current.istSpace.cabinet = cabinet
        this.ObjectLocation.current.istSpace.drawer = drawer
        this.ObjectLocation.current.istSpace.position = position
    },

    setCurrentAddress: function(address) {
        this.ObjectLocation.current.address.name = address
    },

    clearCurrentLocation: function() {
        this.ObjectLocation.current.coordinates.lat = null
        this.ObjectLocation.current.coordinates.long = null
        this.ObjectLocation.current.istSpace.room = null
        this.ObjectLocation.current.istSpace.cabinet = null
        this.ObjectLocation.current.istSpace.drawer = null
        this.ObjectLocation.current.istSpace.position = null
        this.ObjectLocation.current.address.name = null
    }
}

export default AssetInsertionLocationStore