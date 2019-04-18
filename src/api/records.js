import client from '@/api/client'

async function get ({ id }) {
  const response = await client.get(`/records/${id}`)
  return { record: response.data }
}

async function list ({ page, perPage, q, sort, templates }) {
  const response = await client.get('/records', {
    params: {
      ...q && { q },
      ...templates && { template: templates },
      skip: (page - 1) * perPage,
      limit: perPage
    }
  })
  return { recordsPage: response.data }
}

async function create ({ id, payload }) {
  const response = await client.post(`/records/${id}`, payload)
  return { record: response.data }
}

async function update ({ id, payload }) {
  const response = await client.put(`/records/${id}`, payload)
  return { record: response.data }
}

async function remove ({ id, payload }) {
  const response = await client.delete(`/records/${id}`)
  return { record: response.data }
}

async function getAttachment ({ recordID, attachmentID }) {
  const response = await client.get(`/records/${recordID}/attachments/${attachmentID}}`)
  return { attachment: response.data }
}

export default {
  get,
  list,
  create,
  update,
  remove,
  getAttachment
}
