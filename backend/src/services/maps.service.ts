import axios from "axios";
import captainModel from "../models/captain.model";

type Coordinates = {
  ltd: number;
  lng: number;
};

type DistanceTimeResponse = {
  distance: { text: string; value: number };
  duration: { text: string; value: number };
};

export const getAddressCoordinate = async (address: string): Promise<Coordinates> => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  if (!apiKey) throw new Error("Google Maps API key is missing");

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return { ltd: location.lat, lng: location.lng };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDistanceTime = async (origin: string, destination: string): Promise<DistanceTimeResponse> => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  if (!apiKey) throw new Error("Google Maps API key is missing");

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const element = response.data.rows[0].elements[0];
      if (element.status === "ZERO_RESULTS") {
        throw new Error("No routes found");
      }
      return element;
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAutoCompleteSuggestions = async (input: string): Promise<string[]> => {
  if (!input) {
    throw new Error("Query is required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  if (!apiKey) throw new Error("Google Maps API key is missing");

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions
        .map((prediction: { description: string }) => prediction.description)
        .filter((value: string) => value);
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCaptainsInTheRadius = async (ltd: number, lng: number, radius: number) => {
  // radius in km
  return await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371],
      },
    },
  });
};
