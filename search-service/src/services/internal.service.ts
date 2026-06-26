import { esClient } from "../config/elasticsearch";
import { redis } from "../config/redis";

const INDEX = "tracks";
const CACHE_PATTERN = "search:*";

export const addTrackToIndex = async (track: any) => {

  await esClient.index({
    index: INDEX,
    id: track.id,
    document: {
      title: track.title,
      artist_name: track.artist_name,
      album_title: track.album_title,
      duration: track.duration,
      audio_url: track.audio_url
    }
  });

  const keys = await redis.keys(CACHE_PATTERN);

  if (keys.length > 0) {
    await redis.del(keys);
  }

  return track;
};

export const updateTrackIndex = async (
  id: string,
  track: any
) => {

  await esClient.update({
    index: INDEX,
    id,
    doc: {
      title: track.title,
      artist_name: track.artist_name,
      album_title: track.album_title,
      duration: track.duration,
      audio_url: track.audio_url
    }
  });

  const keys = await redis.keys(CACHE_PATTERN);

  if (keys.length > 0) {
    await redis.del(keys);
  }

  return track;
};

export const removeTrackIndex = async (
  id: string
) => {

  await esClient.delete({
    index: INDEX,
    id
  });

  const keys = await redis.keys(CACHE_PATTERN);

  if (keys.length > 0) {
    await redis.del(keys);
  }

  return true;
};