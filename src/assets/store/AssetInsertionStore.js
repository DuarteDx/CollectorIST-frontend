var AssetInsertionStore = {

    newAsset: {
        ObjectIdentification: {},
        ObjectDescription: {},
        ObjectLocation: {},
        ObjectHistory: {},
        ObjectDocumentation: {}
    },

    getNewAsset: function() {
        return this.newAsset
    },

    setObjectIdentification: function(object) {
        this.newAsset.ObjectIdentification = object
    },

    setObjectDescription: function(object) {
        this.newAsset.ObjectDescription = object
    },

    setObjectLocation: function(object) {
        this.newAsset.ObjectLocation = object
    },

    setObjectHistory: function(object) {
        this.newAsset.ObjectHistory = object
    },

    setObjectDocumentation: function(object) {
        this.newAsset.ObjectDocumentation = object
    },

    clear: function() {
        this.newAsset = {
            ObjectIdentification: {},
            ObjectDescription: {},
            ObjectLocation: {},
            ObjectHistory: {},
            ObjectDocumentation: {}
        }
    }

}

export default AssetInsertionStore