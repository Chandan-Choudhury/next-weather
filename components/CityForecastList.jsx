import CityForcastCard from "./CityForcastCard";

const CityForecastList = ({
  cities,
  selectedCityFn,
  selectedCity,
  // onDelete,
}) => {
  const handleSelectCity = (city) => {
    selectedCityFn(city);
  };

  return (
    <>
      {cities
        .slice()
        .sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0))
        .map((city) => (
          <div
            key={city._id}
            onClick={() => handleSelectCity(city)}
            role="button"
          >
            <CityForcastCard city={city} selectedCity={selectedCity} />
          </div>
        ))}
    </>
  );
};

export default CityForecastList;
