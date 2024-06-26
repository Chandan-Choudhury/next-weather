import { NextResponse } from "next/server";
import fetchWeatherData from "@/libs/fetchWeatherData";
import { storeWeatherData } from "@/libs/storeWeatherData";

export const dynamic = "force-dynamic";
export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");
    const name = searchParams.get("name");
    const timezone = searchParams.get("timezone");

    const longlat = `${latitude},${longitude}`;

    const response = await fetchWeatherData({ latitude, longitude, timezone });

    const weatherData = {
      lat: latitude,
      long: longitude,
      latlong: longlat,
      name: name,
      timezone: timezone,
      current: response.current,
      hourly: {
        time: response.hourly.time,
        temperature2m: [...response.hourly.temperature2m],
        weatherCode: [...response.hourly.weatherCode],
      },
      daily: {
        time: response.daily.time,
        weatherCode: [...response.daily.weatherCode],
        temperature2mMax: [...response.daily.temperature2mMax],
        temperature2mMin: [...response.daily.temperature2mMin],
        uvIndexMax: [...response.daily.uvIndexMax],
        precipitationProbabilityMax: [
          ...response.daily.precipitationProbabilityMax,
        ],
      },
    };

    const res = await storeWeatherData(weatherData);

    return res;
  } catch (error) {
    console.log(error);
    // return new Response(
    //   JSON.stringify({ message: "Error", error: true, errorMessage: error }),
    //   {
    //     status: 500,
    //   }
    // );
    return NextResponse.json(
      { message: "Something went wrong", error: true },
      { status: 500 }
    );
  }
};
