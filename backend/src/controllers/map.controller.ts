import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import * as mapService from "../services/maps.service";

export const getCoordinates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query as { address: string };

  try {
    const coordinates = await mapService.getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: "Coordinates not found" });
  }
};

export const getDistanceTime = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query as {
      origin: string;
      destination: string;
    };
    const distanceTime = await mapService.getDistanceTime(origin, destination);

    res.status(200).json(distanceTime);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAutoCompleteSuggestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query as { input: string };
    const suggestions = await mapService.getAutoCompleteSuggestions(input);

    res.status(200).json(suggestions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
