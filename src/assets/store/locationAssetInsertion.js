var locationAssetInsertion = {

    selectedLocationId: null,

    getSelectedLocation: function() {
        return this.selectedLocationId
    },

    setSelectedLocation: function(newLocation) {
        if(newLocation != '')
        this.selectedLocationId = newLocation
    },

    resetSelectedLocation: function() {
        this.selectedLocationId = null
    }
}

export default locationAssetInsertion