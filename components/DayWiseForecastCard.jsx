import { getWeatherIcon, getWeatherType } from "@/libs/getWeatherDetails";
import moment from "moment";
import "@/styles/daywiseforecastcard.scss";
import Image from "next/image";

const DayWiseForecastCard = ({ date, weatherCode, maxTemp, minTemp }) => {
  const formattedDate = moment(date).format("ddd");
  const today = moment().format("ddd");
  const weatherIcon = getWeatherIcon(weatherCode, true);
  const minimumTemp = Math.round(minTemp);
  const maximumTemp = Math.round(maxTemp);
  const weatherType = getWeatherType(weatherCode);
  return (
    <div className="day-wise-forecast-card my-4">
      <p>{formattedDate === today ? "Today" : formattedDate}</p>
      <div className="d-flex align-items-center justify-content-evenly">
        <Image src={weatherIcon} alt="Weather" width={50} height={50} />
        <p className="mb-0 fw-bold text-dark px-1">{weatherType}</p>
      </div>

      <p className="high-low">
        <span>{maximumTemp}°</span>/{minimumTemp}°
      </p>
    </div>
  );
};

export default DayWiseForecastCard;
