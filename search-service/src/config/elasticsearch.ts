import { Client } from '@elastic/elasticsearch'

export const esClient = new Client({
  node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
})

export const connectES = async () => {
  const health = await esClient.cluster.health()
  console.log('Elasticsearch connected, status:', health.status)
}