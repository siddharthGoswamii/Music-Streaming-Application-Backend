// import { Client } from '@elastic/elasticsearch'

// export const esClient = new Client({
//   node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
// })

// export const connectES = async () => {
//   const health = await esClient.cluster.health()
//   console.log('Elasticsearch connected, status:', health.status)
// }

import { Client } from "@elastic/elasticsearch";

export const esClient = new Client({
  node: process.env.ELASTICSEARCH_URL || "https://localhost:9200",

  auth: {
    username: process.env.ELASTICSEARCH_USERNAME || "elastic",
    password: process.env.ELASTICSEARCH_PASSWORD || "",
  },

  tls: {
    rejectUnauthorized: false,
  },
});

export const connectES = async () => {
  try {
    const health = await esClient.cluster.health();

    console.log(
      "Elasticsearch connected, status:",
      health.status
    );
  } catch (error) {
    console.error("Elasticsearch connection failed:");
    console.error(error);
  }
};