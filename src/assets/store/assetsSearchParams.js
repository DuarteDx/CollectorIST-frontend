var assetsSearchParams = {

    searchParams: {
        objectIdentification: {},
        objectDescription: {},
        objectLocation: {},
        objectHistory: {},
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

    setNResultsPerPage: function(newNResultsPerPage) {
        this.searchParams.nResultsPerPage = newNResultsPerPage
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
            nResultsPerPage: 15,
            currentPage: 1
        }
    }

}

export default assetsSearchParams