import client from '@/api/client'

async function get () {
  const response = await client.get(`/configuration`)
  return { configuration: response.data }
}
export default {
  get
}
