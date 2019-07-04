var assetInsertion = {

    newAsset: {
        title: '',
        category: {},
        optionalId: '',
        location: {
            usual: {
                coordinates: {
                    lat: '',
                    long: ''
                },
                istSpace: {
                    room: '',
                    cabinet: '',
                    drawer: '',
                    position: '',
                },
                address: {
                    name: ''
                }
            },
            current: {
                coordinates: {
                    lat: '',
                    long: ''
                },
                istSpace: {
                    room: '',
                    cabinet: '',
                    drawer: '',
                    position: '',
                },
                address: {
                    name: ''
                }
            },
        }
    },

    getNewAsset: function() {
        return this.newAsset
    },

    setTitle: function(item) {
        this.newAsset.title = item
    },

    setCategory: function(item) {
        this.newAsset.category = item
    },

    setOptionalId: function(item) {
        this.newAsset.optionalId = item
    },

    setUsualCoordinates: function(lat, long) {
        this.newAsset.location.usual.coordinates.lat = lat
        this.newAsset.location.usual.coordinates.long = long
    },

    setUsualIstRoom: function(room) {
        this.newAsset.location.usual.istSpace.room = room
    },

    setUsualIstSpace: function(cabinet, drawer, position) {
        this.newAsset.location.usual.istSpace.cabinet = cabinet
        this.newAsset.location.usual.istSpace.drawer = drawer
        this.newAsset.location.usual.istSpace.position = position
    },

    setUsualAddress: function(item) {
        this.newAsset.location.usual.address.name = item
    },

    setCurrentCoordinates: function(lat, long) {
        this.newAsset.location.current.coordinates.lat = lat
        this.newAsset.location.current.coordinates.long = long
    },

    setCurrentIstRoom: function(room) {
        this.newAsset.location.current.istSpace.room = room
    },

    setCurrentIstSpace: function(cabinet, drawer, position) {
        this.newAsset.location.current.istSpace.cabinet = cabinet
        this.newAsset.location.current.istSpace.drawer = drawer
        this.newAsset.location.current.istSpace.position = position
    },

    setCurrentAddress: function(item) {
        this.newAsset.location.current.address.name = item
    },

    clear: function() {
        this.newAsset = {
            title: '',
            category: '',
            optionalId: '',
            location: {
                usual: {
                    coordinates: {
                        lat: '',
                        long: ''
                    },
                    istSpace: {
                        room: '',
                        cabinet: '',
                        drawer: '',
                        position: '',
                    },
                    address: {
                        name: ''
                    }
                },
                current: {
                    coordinates: {
                        lat: '',
                        long: ''
                    },
                    istSpace: {
                        room: '',
                        cabinet: '',
                        drawer: '',
                        position: '',
                    },
                    address: {
                        name: ''
                    }
                },
            }
        }
    }

}

export default assetInsertion