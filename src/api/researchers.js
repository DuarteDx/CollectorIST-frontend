import client from '@/api/client'

async function get ({ userId }) {
  const response = await client.get(`/researchers/${userId}`)
  return { researcher: response.data }
}

async function list ({ users, page, perPage, sort, q }) {
  let params
  if (users && users.length) {
    params = { users }
  } else {
    params = {
      ...q && { q },
      skip: (page - 1) * perPage,
      limit: perPage
    }
  }
  const response = await client.get('/researchers', { params })
  return { researchersPage: response.data }
}

async function getRecords ({ userId, page, perPage, sort, q }) {
  const response = await client.get(`/researchers/${userId}/records`, {
    params: {
      ...q && { q },
      skip: (page - 1) * perPage,
      limit: perPage
    }
  })
  return { recordsPage: response.data }
}

async function getAffiliations ({ userId, page, perPage, sort }) {
  const response = await client.get(`/researchers/${userId}/affiliations`, {
    params: {
      skip: (page - 1) * perPage,
      limit: perPage,
      ...sort && { sort }
    }
  })
  return { affiliationsPage: response.data }
}

async function getCoAuthors ({ userId, page, perPage, sort, q }) {
  const response = await client.get(`/researchers/${userId}/co-authors`, {
    params: {
      skip: (page - 1) * perPage,
      limit: perPage,
      ...sort && { sort }
    }
  })
  return { coAuthorsPage: response.data }
}

async function getFundings ({ userId, page, perPage, sort }) {
  const response = await client.get(`/researchers/${userId}/fundings`, {
    params: {
      skip: (page - 1) * perPage,
      limit: perPage,
      ...sort && { sort }
    }
  })
  return { fundingsPage: response.data }
}

async function getSupervisions ({ userId, page, perPage, sort, q }) {
  const response = await client.get(`/researchers/${userId}/supervisions`, {
    params: {
      skip: (page - 1) * perPage,
      limit: perPage,
      ...sort && { sort },
      ...q && { q }
    }
  })
  return { supervisionsPage: response.data }
}

async function getBio ({ userId }) {
  const response = await client.get(`/researchers/${userId}/bio`)
  return { bio: response.data }
}

export default {
  get,
  list,
  getRecords,
  getSupervisions,
  getAffiliations,
  getCoAuthors,
  getFundings,
  getBio
}
