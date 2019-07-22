var AssetSearchLocationStore = {

    ObjectLocation: {
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

    getLocation: function() {
        return this.ObjectLocation
    },

    setIstId: function(id) {
        this.ObjectLocation.istSpace.room = id
    },

    setIstSubLocation: function(cabinet, drawer, position) {
        this.ObjectLocation.istSpace.cabinet = cabinet
        this.ObjectLocation.istSpace.drawer = drawer
        this.ObjectLocation.istSpace.position = position
    },

    setAddress: function(address) {
        this.ObjectLocation.address.name = address
    },

    clearLocation: function() {
        this.ObjectLocation.istSpace.room = null
        this.ObjectLocation.istSpace.cabinet = null
        this.ObjectLocation.istSpace.drawer = null
        this.ObjectLocation.istSpace.position = null
        this.ObjectLocation.address.name = null
    },

}

export default AssetSearchLocationStore