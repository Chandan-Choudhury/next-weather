const weatherCategories = {
  clear: [0, 1, 2, 30, 31, 32],
  partlyCloudy: [3, 4, 5, 6, 33, 34, 35, 36],
  mostlyCloudy: [7, 8, 9, 37, 38, 39],
  overcast: [
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 40, 41, 42, 43, 44, 45, 46, 47, 48,
    49,
  ],
  rainShowers: [
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 50, 51, 52, 53, 54, 55, 56, 57, 58,
    59,
  ],
  thunderstorm: [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
  snowShowers: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
  fog: [80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
  windy: [90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
};

/**
 * This function returns the path to a weather icon based on the weather code and daylight.
 *
 * @param {number} weatherCode - The weather code from the API
 * @param {boolean} isDay - Whether it is day or not
 * @returns {string} The path to the weather icon
 */
export const getWeatherIcon = (weatherCode, isDay) => {
  for (const category in weatherCategories) {
    if (weatherCategories[category].includes(weatherCode)) {
      switch (category) {
        case "clear":
          return isDay ? "/assets/icons/Sun.svg" : "/assets/icons/Moon.svg";
        case "partlyCloudy":
          return isDay
            ? "/assets/icons/PartlyCloudyDay.svg"
            : "/assets/icons/PartlyCloudyNight.svg";
        case "mostlyCloudy":
          return isDay
            ? "/assets/icons/PartlyCloudyDay.svg"
            : "/assets/icons/PartlyCloudyNight.svg";
        case "overcast":
          return "/assets/icons/Overcast.svg";
        case "rainShowers":
          return isDay
            ? "/assets/icons/RainShowersDay.svg"
            : "/assets/icons/RainShowersNight.svg";
        case "thunderstorm":
          return isDay
            ? "/assets/icons/ThunderstormDay.svg"
            : "/assets/icons/ThunderstormNight.svg";
        case "snowShowers":
          return isDay
            ? "/assets/icons/SnowDay.svg"
            : "/assets/icons/SnowNight.svg";
        case "fog":
          return isDay
            ? "/assets/icons/FogDay.svg"
            : "/assets/icons/FogNight.svg";
        case "windy":
          return isDay
            ? "/assets/icons/WindyDay.svg"
            : "/assets/icons/WindyNight.svg";
        default:
          return isDay ? "/assets/icons/Sun.svg" : "/assets/icons/Moon.svg";
      }
    }
  }
};

/**
 * This function returns the weather type based on the weather code.
 *
 * @param {number} weatherCode - The weather code from the API
 * @returns {string} The weather type.
 */
export const getWeatherType = (weatherCode) => {
  for (const category in weatherCategories) {
    if (weatherCategories[category].includes(weatherCode)) {
      switch (category) {
        case "clear":
          return "Clear";
        case "partlyCloudy":
          return "Cloudy";
        case "mostlyCloudy":
          return "Cloudy";
        case "overcast":
          return "Overcast";
        case "rainShowers":
          return "Rainy";
        case "thunderstorm":
          return "Lightning";
        case "snowShowers":
          return "Snowy";
        case "fog":
          return "Foggy";
        case "windy":
          return "Windy";
        default:
          return "Clear";
      }
    }
  }
};
