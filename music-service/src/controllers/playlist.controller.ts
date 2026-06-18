import type { Request, Response } from "express";

import {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  addTrackToPlaylist
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

    const playlist = await getPlaylistById(Array.isArray(id) ? id[0] : id);

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

