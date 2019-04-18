import axios from 'axios'
import Qs from 'qs'

const client = axios.create({
  baseURL: '/api/v1/',
  paramsSerializer: function (params) {
    return Qs.stringify(params, {
      encodeValuesOnly: true,
      arrayFormat: 'repeat'
    })
  }
})

export default client
