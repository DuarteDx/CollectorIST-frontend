import client from '@/api/client'

async function get ({ unitID }) {
  const response = await client.get(`/units/${unitID}`)
  return { unit: response.data }
}

async function create ({ payload }) {
  const response = await client.post(`/units`, payload)
  return { unit: response.data }
}

async function update ({ unitID, unit }) {
  const response = await client.put(`/units/${unitID}`, unit)
  return { unit: response.data }
}

async function list ({ page, perPage, sort, q, ignored }) {
  const params = {
    ...q && { q },
    ...sort && { sort }
  }
  if (perPage) {
    params.limit = perPage
    if (page) {
      params.skip = (page - 1) * perPage
    }
  }
  if (ignored) {
    params.ignored = ignored
  }
  const response = await client.get('/units', {
    params
  })
  return { unitsPage: response.data }
}

async function listTypes () {
  const response = await client.get('/units/types')
  return response.data
}

async function getRecords ({ unitID, page, perPage, sort, q }) {
  const response = await client.get(`/units/${unitID}/records`, {
    params: {
      ...q && { q },
      skip: (page - 1) * perPage,
      limit: perPage
    }
  })
  return { recordsPage: response.data }
}

async function getMembers ({ unitID, page, perPage, sort, q, verified, ended }) {
  const response = await client.get(`/units/${unitID}/members`, {
    params: {
      skip: (page - 1) * perPage,
      limit: perPage,
      ...sort && { sort },
      verified,
      ended
    }
  })
  return { membersPage: response.data }
}

async function addMember ({ unitID, memberId, start, end }) {
  const response = await client.post(`/units/${unitID}/members`, {
    memberId,
    start,
    end
  })
  return response.data
}

async function updateMember ({ unitID, memberId, verified }) {
  const response = await client.put(`/units/${unitID}/members/${memberId}`, {
    verified
  })
  return response.data
}

async function removeMember ({ unitID, memberId }) {
  const response = await client.delete(`/units/${unitID}/members/${memberId}`)
  return response.data
}

async function getManagers ({ unitID, page, perPage, sort, q }) {
  const response = await client.get(`/units/${unitID}/managers`, {
    params: {
      skip: (page - 1) * perPage,
      limit: perPage,
      ...sort && { sort }
    }
  })
  return { managersPage: response.data }
}

async function getSubUnits ({ unitID, page, perPage, sort, q }) {
  const response = await client.get(`/units`, {
    params: {
      parentID: unitID,
      skip: (page - 1) * perPage,
      limit: perPage,
      ...sort && { sort }
    }
  })
  return { subUnitsPage: response.data }
}

export default {
  create,
  update,
  get,
  list,
  listTypes,
  getRecords,
  getMembers,
  addMember,
  updateMember,
  removeMember,
  getManagers,
  getSubUnits
}
