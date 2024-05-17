import "@/styles/airconditions.scss";
import { FaTemperatureHalf, FaDroplet, FaWind, FaSun } from "react-icons/fa6";

const AirConditions = ({ defaultCity }) => {
  const time = defaultCity.daily.time;
  const realFeel = Math.round(defaultCity.current.apparentTemperature);
  const windSpeed = Math.round(defaultCity.current.windSpeed10m);
  const precipitation = defaultCity.current.precipitation;
  const uvIndexMaxArray = defaultCity.daily.uvIndexMax;
  const today = new Date().toISOString().split("T")[0];

  const todayIndex = time.findIndex((timeStamp) => {
    return timeStamp.includes(today);
  });

  const uvIndexMax = Math.round(uvIndexMaxArray[todayIndex]);

  const columnsData = [
    { icon: FaTemperatureHalf, label: "Real Feel", value: `${realFeel}°C` },
    { icon: FaWind, label: "Wind", value: `${windSpeed} km/h` },
    {
      icon: FaDroplet,
      label: "Precipitation",
      value: `${precipitation.toFixed(2)} mm`,
    },
    { icon: FaSun, label: "UV Index", value: uvIndexMax },
  ];

  return (
    <section id="air-conditions">
      <div className="aircondition-hero">
        <div className="row ps-4 pt-4">
          <p>AIR CONDITIONS</p>
        </div>
        <div className="row p-4">
          {columnsData.map((column, index) => (
            <div key={index} className="col-6 my-4">
              <div className="d-inline-flex align-items-center">
                <column.icon className="icon" />
                <p>{column.label}</p>
              </div>
              <h3>{column.value}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AirConditions;
