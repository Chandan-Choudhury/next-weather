import moment from "moment";
import "@/styles/todayforecast.scss";
import Image from "next/image";
import { getWeatherIcon } from "@/libs/getWeatherDetails";

const TodayForecast = ({ defaultCity, targetHours }) => {
  const time = defaultCity.hourly.time;
  const weatherCodes = defaultCity.hourly.weatherCode;
  const temperature = defaultCity.hourly.temperature2m;

  const today = new Date().toISOString().split("T")[0];

  // const targetHours = new Set(["06", "09", "12", "15", "18", "21"]);

  const filteredIndices = time
    .map((time, index) => ({ time, index }))
    .filter(({ time }) => {
      const currentTime = new Date(time)
        .toISOString()
        .split("T")[1]
        .split(":")[0];
      return time.includes(today) && targetHours.has(currentTime);
    })
    .map(({ index }) => index);

  const todayForecast = filteredIndices.map((index) => {
    const timeValue = time[index];
    const weatherCodeValue = weatherCodes[index];
    const tempValue = temperature[index];
    return {
      time: moment.utc(timeValue).format("h:mm A"),
      temp: tempValue,
      weatherCode: weatherCodeValue,
      icon: getWeatherIcon(
        weatherCodeValue,
        moment.utc(timeValue).format("h:mm A") === "9:00 PM" ? false : true
      ),
    };
  });

  return (
    <section id="today-forecast">
      <div className="today-hero">
        <div className="row ps-4 pt-4">
          <p>TODAY'S FORECAST</p>
        </div>
        {/* <div className="row p-4">
          {todayForecast.map((forecast, index) => (
            <div className="col-4 col-lg-2 mb-4" key={index}>
              <p className="text-center text-nowrap">{forecast.time}</p>
              <div className="d-flex justify-content-center align-items-center">
                <Image
                  src={forecast.icon}
                  alt={forecast.icon.substring(
                    forecast.icon.lastIndexOf("/") + 1,
                    forecast.icon.lastIndexOf(".svg")
                  )}
                  width={50}
                  height={50}
                  className="today-weather-icon"
                />
              </div>
              <h3 className="mb-0 ms-2 text-center">
                {Math.round(forecast.temp)}°
              </h3>
            </div>
          ))}
        </div> */}
        <div className="d-flex flex-wrap justify-content-around p-4">
          {todayForecast.map((forecast, index) => (
            <div
              className="d-flex flex-column align-items-center mb-4 mx-2 my-4 weather-content"
              key={index}
            >
              <p className="text-center text-nowrap">{forecast.time}</p>
              <div className="d-flex justify-content-center align-items-center">
                <Image
                  src={forecast.icon}
                  alt={forecast.icon.substring(
                    forecast.icon.lastIndexOf("/") + 1,
                    forecast.icon.lastIndexOf(".svg")
                  )}
                  width={50}
                  height={50}
                  className="today-weather-icon"
                />
              </div>
              <h3 className="mb-0 ms-2 text-center">
                {Math.round(forecast.temp)}°
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TodayForecast;
