import "@/styles/heroweather.scss";
import { getWeatherIcon } from "@/libs/getWeatherDetails";
import moment from "moment-timezone";
import Image from "next/image";

const HeroWeatherForecast = ({ defaultCity, length }) => {
  const temperature = Math.round(defaultCity.current.temperature2m);
  const precipitation = defaultCity.daily.precipitationProbabilityMax[0];
  const weatherCode = defaultCity.current.weatherCode;
  const isDay = defaultCity.current.isDay;
  const weatherIcon = getWeatherIcon(weatherCode, isDay);
  const lastUpdatedAt = moment(defaultCity.updatedAt)
    .tz(defaultCity.timezone)
    .format("DD/MM/YYYY h:mm A z");
  const shortCityName = defaultCity.name.split(",")[0].trim();
  return (
    <section id="weather">
      <div className="weather-hero">
        <div className="row p-4">
          <div className="col-6">
            <h3 className="mb-0">
              {length === 3 ? shortCityName : defaultCity.name}
            </h3>
            <p>Chances of rain: {precipitation}%</p>
            <h1>{temperature}° C</h1>
          </div>
          <div className="col-6 d-flex justify-content-center align-items-center">
            <Image src={weatherIcon} alt="Weather" width={100} height={100} />
          </div>
        </div>
        <div className="ps-4">
          <p>Last Updated: {lastUpdatedAt}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroWeatherForecast;
