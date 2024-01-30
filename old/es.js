const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'https://...', // Elasticsearch endpoint (trouvable à my_deployement)
  auth: {
    apiKey: { // API key ID and secret (Management/security/api_key)
      id: 'foo',
      api_key: 'bar',
    }
  }
}) // détail connection ici : https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-connecting.html

//recherche
await client.search({
    query: {
      //query content
    }
  })