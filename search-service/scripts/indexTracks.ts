import 'dotenv/config'
import { Client } from '@elastic/elasticsearch'
import { Pool } from 'pg'

const es = new Client({ node: process.env.ELASTICSEARCH_URL! })
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const INDEX = 'tracks'

async function createIndex() {
  const exists = await es.indices.exists({ index: INDEX })
  if (exists) await es.indices.delete({ index: INDEX })

  await es.indices.create({
    index: INDEX,
    mappings: {
      properties: {
        title: {
          type: 'text',
          fields: { suggest: { type: 'completion' } }
        },
        artist_name: { type: 'text' },
        album_title:  { type: 'text' },
        duration:     { type: 'integer' },
        audio_url:    { type: 'keyword' },
      }
    }
  })
  console.log('Index created')
}

async function seedFromPostgres() {
  const result = await pool.query(`
    SELECT 
      t.id, t.title, t.duration, t.audio_url,
      ar.name AS artist_name,
      al.title AS album_title
    FROM tracks t
    JOIN artists ar ON ar.id = t.artist_id
    JOIN albums al ON al.id = t.album_id
  `)

  if (result.rows.length === 0) {
    console.log('No tracks found in DB to seed')
    await pool.end()
    return
  }

  const operations = result.rows.flatMap(track => [
    { index: { _index: INDEX, _id: track.id } },
    {
      title:       track.title,
      artist_name: track.artist_name,
      album_title: track.album_title,
      duration:    track.duration,
      audio_url:   track.audio_url,
    }
  ])

  const response = await es.bulk({ operations })
  console.log(`Indexed ${result.rows.length} tracks, errors: ${response.errors}`)
  await pool.end()
}

async function main() {
  await createIndex()
  await seedFromPostgres()
  console.log('Done!')
}

main().catch(console.error)