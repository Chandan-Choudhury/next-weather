import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import Place from "@/models/Place";

/**
 * Stores the weather data in the database.
 *
 * @param {object} weatherData - The weather data to be stored
 * @returns {object} HTTP Resoponse.
 */
export const storeWeatherData = async (weatherData) => {
  await connectDB();

  try {
    const place = await Place.findOne({ latlong: weatherData.latlong });

    if (place) {
      await Place.findOneAndUpdate(
        { latlong: weatherData.latlong },
        weatherData
      );
      // console.log("Weather data updated.");
      return NextResponse.json(
        { message: "Weather data updated." },
        { status: 200 }
      );
    } else {
      const newPlace = await Place(weatherData);
      await newPlace.save();
      // console.log("Weather data stored successfully.");
      return NextResponse.json(
        { message: "Weather data stored successfully." },
        {
          status: 201,
        }
      );
    }
  } catch (error) {
    // console.error("Error storing weather data:", error);
    return NextResponse.json("Something went wrong", { status: 500 });
  }
};
