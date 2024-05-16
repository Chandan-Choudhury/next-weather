"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "./Loader";
import { fetchAllSavedCities } from "@/libs/requests";
import Searchbar from "./Searchbar";
import CityForecast from "./CityForecast";
import CityForecastList from "./CityForecastList";

const CitiesHome = () => {
  const [cities, setCities] = useState(null);
  const [city, setCity] = useState(null);
  const [updatedCity, setUpdatedCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [reload, setReload] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllSavedCities();
      setCities(data);
      // setCity(
      //   !city
      //     ? data.find((city) => city.isDefault === true)
      //     : data.find((city) => city.name === updatedCity.name)
      // );
      if (updatedCity) {
        setCity(data.find((city) => city.name === updatedCity.name));
      } else {
        setCity(data.find((city) => city.isDefault === true));
      }
      setLoading(false);
    };

    fetchData();
  }, [refresh, reload]);

  const refreshData = async () => {
    try {
      const refreshCity = !city
        ? cities.find((city) => city.isDefault === true)
        : city;
      const latitude = refreshCity.lat;
      const longitude = refreshCity.long;
      const name = refreshCity.name;
      const timezone = refreshCity.timezone;
      await axios.get(
        `/api/search?latitude=${latitude}&longitude=${longitude}&name=${name}&timezone=${timezone}`
      );
      setRefresh((prev) => !prev);
      setUpdatedCity(refreshCity);
      Toast.fire({
        icon: "success",
        title: `Weather data updated for ${name}.`,
      });
    } catch (error) {
      console.log("error :", error);
      Toast.fire({
        icon: "error",
        title: "Something went wrong. Please try again.",
      });
    }
  };

  const setSelectedCity = (city) => {
    setCity(city);
  };

  const updateCitiesHandler = () => {
    setReload((prev) => !prev);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="row">
      <div className="col-12 col-md-6 col-lg-8">
        <Searchbar updateCities={updateCitiesHandler} />
        <CityForecastList
          cities={cities}
          selectedCityFn={setSelectedCity}
          selectedCity={city}
        />
      </div>
      <div className=" col-12 col-md-6 col-lg-4">
        <CityForecast
          city={city}
          refreshData={refreshData}
          updateCities={updateCitiesHandler}
        />
      </div>
    </div>
  );
};

export default CitiesHome;
