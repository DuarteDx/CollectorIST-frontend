var AssetsSearchParams = {

    searchParams: {
        objectIdentification: {},
        objectDescription: {},
        objectLocation: {},
        objectHistory: {},
        objectCollection: {},
        nResultsPerPage: 15,
        currentPage: 1
    },

    getSearchParams: function() {
        return this.searchParams
    },

    setObjectIdentification: function(newObjectIdentification) {
        this.searchParams.objectIdentification = newObjectIdentification
    },

    setObjectDescription: function(newObjectDescription) {
        this.searchParams.objectDescription = newObjectDescription
    },

    setObjectLocation: function(newObjectLocation) {
        this.searchParams.objectLocation = newObjectLocation
    },

    setObjectHistory: function(newObjectHistory) {
        this.searchParams.objectHistory = newObjectHistory
    },

    setObjectCollection: function(newObjectCollection) {
        this.searchParams.objectCollection = newObjectCollection
    },

    setNResultsPerPage: function(newNResultsPerPage) {
        this.searchParams.nResultsPerPage = newNResultsPerPage
    },

    getCurrentPage: function() {
        return this.searchParams.currentPage
    },

    setCurrentPage: function(newCurrentPage) {
        this.searchParams.currentPage = newCurrentPage
    },

    clear: function() {
        this.searchParams = {
            objectIdentification: {},
            objectDescription: {},
            objectLocation: {},
            objectHistory: {},
            objectCollection: {}
        }
    }

}

export default AssetsSearchParams