import connectDB from "@/config/database";
import Place from "@/models/Place";

/**
 * Stores the weather data in the database.
 *
 * @param {object} weatherData - The weather data to be stored
 * @returns {string} The status of the operation in console.
 */
export const storeWeatherData = async (weatherData) => {
  try {
    await connectDB();
    const place = await Place.findOne({ latlong: weatherData.latlong });

    if (place) {
      await Place.findOneAndUpdate(
        { latlong: weatherData.latlong },
        weatherData
      );
      console.log("Weather data updated.");
    } else {
      const newPlace = await Place(weatherData);
      await newPlace.save();
      console.log("Weather data stored successfully.");
    }
  } catch (error) {
    console.error("Error storing weather data:", error);
    throw error;
  }
};
