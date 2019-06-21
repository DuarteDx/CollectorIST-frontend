var locationAssetInsertion = {

    locations: [],

    getSelectedCategory: function() {
        return this.locations
    },

    setSelectedCategory: function(newLocation) {
        this.locations.push(newLocation)
    }
}

export default locationAssetInsertion