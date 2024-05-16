import "@/styles/cityforecastcard.scss";
import Image from "next/image";
import moment from "moment-timezone";
import { getWeatherIcon } from "@/libs/getWeatherDetails";

const CityForcastCard = ({ city, selectedCity }) => {
  const cityName = city.name.split(",")[0].trim();
  const selectedCityName = selectedCity.name.split(",")[0].trim();
  const isCitySelected = cityName === selectedCityName;
  const time = moment(city.updatedAt).tz(city.timezone).format("h:mm A z");
  const temp = Math.round(city.current.temperature2m);
  const icon = getWeatherIcon(city.current.weatherCode, city.current.isDay);
  return (
    <>
      <div
        className={`city-forecast-card ${
          isCitySelected ? "selected-city" : ""
        }`}
      >
        <div className="d-inline-flex align-items-center card-main-div">
          <Image src={icon} alt="weather" width={50} height={50} />
          <div className="card-div d-flex flex-column">
            <h3 className="m-auto ms-0">{cityName}</h3>
            <p className="m-auto ms-0">{time}</p>
          </div>
        </div>
        <h2>{temp}° C</h2>
      </div>
    </>
  );
};

export default CityForcastCard;
