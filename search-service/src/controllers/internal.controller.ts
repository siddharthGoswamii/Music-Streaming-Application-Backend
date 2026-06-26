import { Request, Response } from "express";

import {
    addTrackToIndex,
    updateTrackIndex,
    removeTrackIndex
} from "../services/internal.service";

export const indexTrack = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const track = await addTrackToIndex(req.body);

        res.status(201).json({
            success: true,
            track
        });

    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const updateTrack = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const { id } = req.params;

        const track = await updateTrackIndex(
            id,
            req.body
        );

        res.status(200).json({
            success: true,
            track
        });

    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const deleteTrack = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const { id } = req.params;

        await removeTrackIndex(id);

        res.status(200).json({
            success: true,
            message: "Track removed from Elasticsearch"
        });

    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};