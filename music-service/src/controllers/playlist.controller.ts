import type { Request, Response } from "express";

import {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  addTrackToPlaylist,
  updatePlaylist
} from "../services/playlist.service";

export const addPlaylist = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const {
      user_id,
      name,
      description
    } = req.body;

    const playlist = await createPlaylist(
      user_id,
      name,
      description
    );

    res.status(201).json({
      success: true,
      playlist
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const fetchPlaylists = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const playlists = await getAllPlaylists();

    res.json({
      success: true,
      playlists
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
    
export const fetchPlaylistById = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: "Playlist ID is required"
      });
      return;
    }

    const rows = await getPlaylistById(Array.isArray(id) ? id[0] : id);


    if (rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Playlist not found"
      });
      return;
    }

    const playlist = {
      id: rows[0].playlist_id,
      name: rows[0].playlist_name,
      description: rows[0].description,

      tracks: rows
        .filter(row => row.track_id)
        .map(row => ({
          id: row.track_id,
          title: row.title,
          duration: row.duration,
          audio_url: row.audio_url
        }))
    };

    res.status(200).json({
      success: true,
      playlist
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const addTrack = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { playlistId } = req.params;

    const { trackId } = req.body;

    // Ensure playlistId is a string (Express params can be string | string[])
    const playlistIdStr = Array.isArray(playlistId) ? playlistId[0] : playlistId;

    const result = await addTrackToPlaylist(
      playlistIdStr,
      trackId
    );

    res.status(201).json({
      success: true,
      result
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// UPDATE PLAYLIST

export const editPlaylist = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const { id } = req.params;

    const {
      name,
      description
    } = req.body;

    const playlist = await updatePlaylist(
      id as string,
      name,
      description
    );

    if (!playlist) {
      res.status(404).json({
        success: false,
        message: "Playlist not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      playlist
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};