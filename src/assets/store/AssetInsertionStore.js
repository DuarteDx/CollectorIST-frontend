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

    // OBJECT IDENTIFICATION
    setObjectIdentification: function(object) {
        this.newAsset.ObjectIdentification = object
    },

    getObjectIdentification: function() {
        return this.newAsset.ObjectIdentification
    },

    // OBJECT DESCRIPTION
    setObjectDescription: function(object) {
        this.newAsset.ObjectDescription = object
    },

    getObjectDescription: function() {
        return this.newAsset.ObjectDescription
    },

    // OBJECT LOCATION
    setObjectLocation: function(object) {
        this.newAsset.ObjectLocation = object
    },

    getObjectLocation: function() {
        return this.newAsset.ObjectLocation
    },

    // OBJECT HISTORY
    setObjectHistory: function(object) {
        this.newAsset.ObjectHistory = object
    },

    getObjectHistory: function() {
        return this.newAsset.ObjectHistory
    },

    // OBJECT DOCUMENTATION
    setObjectDocumentation: function(object) {
        this.newAsset.ObjectDocumentation = object
    },

    getObjectDocumentation: function() {
        return this.newAsset.ObjectDocumentation
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