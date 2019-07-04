var assetsSearchParams = {

    searchParams: {
        title: '',
        id: '',
        creator: '',
        category: '',
        collection: '',
        nResultsPerPage: 15,
        currentPage: 1
    },

    getSearchParams: function() {
        return this.searchParams
    },

    setTitle: function(newTitle) {
        this.searchParams.title = newTitle
    },

    setId: function(newId) {
        this.searchParams.id = newId
    },

    setCreator: function(newCreator) {
        this.searchParams.creator = newCreator
    },

    setCategory: function(newCategory) {
        this.searchParams.category = newCategory
    },

    setCollection: function(newCollection) {
        this.searchParams.collection = newCollection
    },

    setNResultsPerPage: function(newNResultsPerPage) {
        this.searchParams.nResultsPerPage = newNResultsPerPage
    },

    setCurrentPage: function(newCurrentPage) {
        this.searchParams.currentPage = newCurrentPage
    },

    clear: function() {
        this.searchParams = {
            title: '',
            id: '',
            creator: '',
            category: '',
            collection: '',
            nResultsPerPage: 15,
            currentPage: 1
        }
    }

}

export default assetsSearchParams