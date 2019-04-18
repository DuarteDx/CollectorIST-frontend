export default {
  methods: {
    generateExternalProfileURL ({ type, id }) {
      switch (type.trim().toLowerCase()) {
        case 'orcid':
          return `https://orcid.org/${id}`
        case 'scopus':
          return `https://www.scopus.com/authid/detail.uri?authorId=${id}`
        case 'dblp':
          return `https://dblp.org/pid/${id.replace('homepages/', '')}`
      }
    }
  }
}
