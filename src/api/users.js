import client from '@/api/client'

async function list ({ page, perPage, q, sort, templates, roles }) {
  const response = await client.get('/users', {
    params: {
      ...q && { q },
      ...templates && { template: templates },
      skip: (page - 1) * perPage,
      limit: perPage,
      roles
    }
  })
  return { usersPage: response.data }
}

async function getUserIdFromUsername ({ username }) {
  const response = await client.get('/users', {
    params: {
      username
    }
  })
  return response.data
}

export default {
  list,
  getUserIdFromUsername
}
