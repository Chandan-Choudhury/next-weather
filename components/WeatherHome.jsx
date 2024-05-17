"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
// import { fetchSavedDefaultCity } from "@/libs/requests";
import Searchbar from "@/components/Searchbar";
import HeroWeatherForecast from "@/components/HeroWeatherForecast";
import TodayForecast from "@/components/TodayForecast";
import AirConditions from "@/components/AirConditions";
import DayWiseForecast from "@/components/DayWiseForecast";
import Loader from "./Loader";
import apiClient from "@/libs/api";

const WeatherHome = () => {
  const [defaultCity, setDefaultCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [reload, setReload] = useState(false);
  const [isRefreshLoading, setIsRefreshLoading] = useState(false);

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
      // const data = await fetchSavedDefaultCity();
      const data = await apiClient.get("/default-city");
      setDefaultCity(data);
      setLoading(false);
    };

    fetchData();
  }, [refresh, reload]);

  const refreshData = async () => {
    try {
      setIsRefreshLoading(true);
      const latitude = defaultCity.lat;
      const longitude = defaultCity.long;
      const name = defaultCity.name;
      const timezone = defaultCity.timezone;
      await axios.get(
        `/api/search?latitude=${latitude}&longitude=${longitude}&name=${name}&timezone=${timezone}`
      );
      Toast.fire({
        icon: "success",
        title: `Weather data updated for ${name}.`,
      });
      setRefresh((prev) => !prev);
      setIsRefreshLoading(false);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Something went wrong. Please try again.",
      });
    }
  };

  const targetHours = new Set(["06", "09", "12", "15", "18", "21"]);

  const length = 7;

  const updateCitiesHandler = () => {
    setReload((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-12 col-md-6 col-lg-8">
        <Searchbar updateCities={updateCitiesHandler} />
        <HeroWeatherForecast defaultCity={defaultCity} length={length} />
        <span className="px-4">
          <button
            className="btn btn-primary p-2"
            onClick={refreshData}
            disabled={isRefreshLoading}
          >
            {isRefreshLoading ? "Loading" : "Refresh"}
          </button>
        </span>
        <TodayForecast defaultCity={defaultCity} targetHours={targetHours} />
        <AirConditions defaultCity={defaultCity} />
      </div>
      <div className=" col-12 col-md-6 col-lg-4">
        <DayWiseForecast defaultCity={defaultCity} length={length} />
      </div>
    </div>
  );
};

export default WeatherHome;
