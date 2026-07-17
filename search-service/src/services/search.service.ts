import { esClient } from '../config/elasticsearch'
import { redis } from '../config/redis'

const INDEX = 'tracks'
const CACHE_TTL = 60 * 2  // 2 minutes

export const searchTracks = async (q: string, type?: string) => {
  const cacheKey = `search:${q}:${type || 'all'}`

  const cached = await redis.get(cacheKey);

    if (cached) {
        console.log("REDIS HIT");
        return JSON.parse(cached);
    }

    console.log("REDIS MISS");

  const response = await esClient.search({
    index: INDEX,
    query: {
      multi_match: {
        query: q,
        fields: ['title^3', 'artist_name^2', 'album_title'],
        fuzziness: 'AUTO',
      }
    },
    size: 20,
  })

  const results = response.hits.hits.map(hit => ({
    id: hit._id,
    score: hit._score,
    ...hit._source as object,
  }))

  await redis.set(cacheKey, JSON.stringify(results), { EX: CACHE_TTL });

  console.log("Saved to Redis");

  return results
}

export const suggestTracks = async (q: string) => {
  const response = await esClient.search({
    index: INDEX,
    suggest: {
      track_suggest: {
        prefix: q,
        completion: {
          field: 'title.suggest',
          size: 5,
          skip_duplicates: true,
        }
      }
    },
    _source: false,
  })

  const suggestions = response.suggest?.track_suggest?.[0]?.options
  

  if (!suggestions || !Array.isArray(suggestions)) {
    return []
  }
  
  return suggestions.map((s: any) => ({ text: s.text, id: s._id }))
}