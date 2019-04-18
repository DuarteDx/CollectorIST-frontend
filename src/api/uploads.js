import client from '@/api/client'

async function createRecordUploadSession ({ checksum, fileSize }) {
  const response = await client.post('/file-upload-handlers/records/upload-sessions', {
    checksum,
    fileSize
  })
  return response.data
}

async function uploadRecordFile ({ session, formData }) {
  const response = await client.post(`/file-upload-handlers/records/upload-sessions/${session}/files`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  return response.data
}

async function resolveRecordUploadChallenges ({ session, challenges }) {
  const response = await client.post(`/file-upload-handlers/records/upload-sessions/${session}/challenges`, {
    challenges
  })
  return response.data
}

export default {
  createRecordUploadSession,
  uploadRecordFile,
  resolveRecordUploadChallenges
}
