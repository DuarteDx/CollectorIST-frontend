var AssetInsertionStore = {

    newAsset: {
        ObjectIdentification: {},
        ObjectDescription: {},
        ObjectLocation: {},
        ObjectHistory: {},
        ObjectDocumentation: {},
        ObjectCollection: {}
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

    // OBJECT COLLECTION
    setObjectCollection: function(object) {
        this.newAsset.ObjectCollection = object
    },

    getObjectCollection: function() {
        return this.newAsset.ObjectCollection
    },

    clear: function() {
        this.newAsset = {
            ObjectIdentification: {},
            ObjectDescription: {},
            ObjectLocation: {},
            ObjectHistory: {},
            ObjectDocumentation: {}
        }
    },

    // SPECIFIC MODULES

    // Pinturas
    setPinturas: function(object) {
        this.newAsset.pinturas = object
    },

    getPinturas: function() {
        return this.newAsset.pinturas
    },

    // Gravuras
    setGravuras: function(object) {
        this.newAsset.gravuras = object
    },

    getGravuras: function() {
        return this.newAsset.gravuras
    },




    clearSpecificModules: function() {
        delete this.newAsset.pinturas
        delete this.newAsset.gravuras
    }

}

export default AssetInsertionStore