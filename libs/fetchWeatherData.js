import { fetchWeatherApi } from "openmeteo";

/**
 * Fetches the weather data from the OpenMeteo API
 *
 * @param {number} latitude - The latitude of the location
 * @param {number} longitude - The longitude of the location
 * @param {string} timezone - The timezone of the location
 * @returns {object} The weather data
 */
export default async ({ latitude, longitude, timezone }) => {
  const params = {
    latitude: latitude,
    longitude: longitude,
    timezone: timezone,
    current: [
      "temperature_2m",
      "apparent_temperature",
      "is_day",
      "precipitation",
      "rain",
      "weather_code",
      "wind_speed_10m",
    ],
    hourly: ["temperature_2m", "weather_code"],
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "uv_index_max",
      "precipitation_probability_max",
    ],
  };

  const url = "https://api.open-meteo.com/v1/forecast";

  try {
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();

    const current = response.current();
    const hourly = response.hourly();
    const daily = response.daily();

    const weatherData = {
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature2m: current.variables(0).value(),
        apparentTemperature: current.variables(1).value(),
        isDay: current.variables(2).value(),
        precipitation: current.variables(3).value(),
        rain: current.variables(4).value(),
        weatherCode: current.variables(5).value(),
        windSpeed10m: current.variables(6).value(),
      },
      hourly: {
        time: range(
          Number(hourly.time()),
          Number(hourly.timeEnd()),
          hourly.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        temperature2m: hourly.variables(0).valuesArray(),
        weatherCode: hourly.variables(1).valuesArray(),
      },
      daily: {
        time: range(
          Number(daily.time()),
          Number(daily.timeEnd()),
          daily.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        weatherCode: daily.variables(0).valuesArray(),
        temperature2mMax: daily.variables(1).valuesArray(),
        temperature2mMin: daily.variables(2).valuesArray(),
        uvIndexMax: daily.variables(3).valuesArray(),
        precipitationProbabilityMax: daily.variables(4).valuesArray(),
      },
    };

    return weatherData;
  } catch (error) {
    return { error: error.message };
  }
};

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
