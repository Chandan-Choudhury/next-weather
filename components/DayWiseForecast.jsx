import "@/styles/daywiseforecast.scss";
import DayWiseForecastCard from "./DayWiseForecastCard";

const DayWiseForecast = ({ defaultCity, length }) => {
  const data = defaultCity.daily;

  return (
    <section id="day-wise-forecast">
      <div className="daywiseforecast-hero p-4">
        <p>{length}-DAY FORECAST</p>
        {data.time
          .map((date, index) => (
            <DayWiseForecastCard
              key={index}
              date={date}
              weatherCode={data.weatherCode[index]}
              maxTemp={data.temperature2mMax[index]}
              minTemp={data.temperature2mMin[index]}
            />
          ))
          .slice(0, length)}
      </div>
    </section>
  );
};

export default DayWiseForecast;
