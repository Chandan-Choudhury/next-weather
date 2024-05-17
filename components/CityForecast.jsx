"use client";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import HeroWeatherForecast from "./HeroWeatherForecast";
import DayWiseForecast from "./DayWiseForecast";
import TodayForecast from "./TodayForecast";
// import Loader from "./Loader";

const CityForecast = ({ city, refreshData, refreshState, updateCities }) => {
  const [isLoading, setIsLoading] = useState(false);

  const selectedCity = city;

  const isDefault = city.isDefault;

  const targetHours = new Set(["06", "09", "12"]);
  const length = 3;

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

  const handleDeleteCity = async (city) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/saved-cities/delete/${city._id}`);
      updateCities();
      Toast.fire({
        icon: "success",
        title: `${city.name} deleted successfully.`,
      });
      setIsLoading(false);
    } catch (error) {
      // console.error("Error deleting city:", error);
      Toast.fire({
        icon: "error",
        title: "Error deleting city.",
      });
    }
  };

  const handleMakeDefault = async (city) => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/saved-cities/update/${city._id}`);
      updateCities();
      Toast.fire({
        icon: "success",
        title: `${city.name} is now the default city.`,
      });
      setIsLoading(false);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Error setting default city.",
      });
    }
  };

  // const loaderSize = "small";

  return (
    <div>
      <HeroWeatherForecast defaultCity={selectedCity} length={length} />
      <div className=" d-flex justify-content-start align-items-center">
        <button
          className="btn btn-success btn-sm py-2 px-3"
          onClick={refreshData}
          disabled={isLoading || refreshState}
        >
          {isLoading || refreshState ? "Loading" : "Refresh"}
        </button>
        {!isDefault && (
          <>
            <button
              className="btn btn-danger btn-sm py-2 px-3 ms-2"
              onClick={() => handleDeleteCity(city)}
              disabled={isLoading}
            >
              {isLoading ? "Loading" : "Delete"}
            </button>
            <button
              className="btn btn-primary btn-sm py-2 px-3 ms-2"
              onClick={() => handleMakeDefault(city)}
            >
              {isLoading ? "Loading" : "Default"}
            </button>
          </>
        )}
      </div>
      <TodayForecast defaultCity={selectedCity} targetHours={targetHours} />
      <DayWiseForecast defaultCity={selectedCity} length={length} />
    </div>
  );
};

export default CityForecast;
