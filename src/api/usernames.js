import client from '@/api/client'

async function getUserIdFromUsername ({ username }) {
  const response = await client.get('/usernames', {
    params: {
      username
    }
  })
  return response.data
}

async function associateUsername ({ username }) {
  const response = await client.post(`/usernames/${username}`)
  return response.data
}

export default {
  getUserIdFromUsername,
  associateUsername
}
