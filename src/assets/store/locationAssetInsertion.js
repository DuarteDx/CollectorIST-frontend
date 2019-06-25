var locationAssetInsertion = {

    // Usual Location
    selectedUsualLocationId: null,

    getUsualSelectedLocation: function() {
        return this.selectedUsualLocationId
    },

    setUsualSelectedLocation: function(newLocation) {
        if(newLocation != '')
        this.selectedUsualLocationId = newLocation
    },

    resetUsualSelectedLocation: function() {
        this.selectedUsualLocationId = null
    },

    // Current Location
    selectedCurrentLocationId: null,

    getCurrentSelectedLocation: function() {
        return this.selectedCurrentLocationId
    },

    setCurrentSelectedLocation: function(newLocation) {
        if(newLocation != '')
        this.selectedCurrentLocationId = newLocation
    },

    resetCurrentSelectedLocation: function() {
        this.selectedCurrentLocationId = null
    }
}

export default locationAssetInsertion