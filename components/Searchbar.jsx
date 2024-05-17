"use client";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "@/styles/searchbar.scss";

const Searchbar = ({ updateCities }) => {
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const coordinates = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${address}&count=1&language=en&format=json`
      );
      if (!coordinates.data.results || coordinates.data.results.length === 0) {
        Toast.fire({
          icon: "error",
          title: "City not found. Please enter correct city name.",
        });
        setAddress("");
        return;
      }
      const latitude = coordinates.data.results[0].latitude;
      const longitude = coordinates.data.results[0].longitude;
      const name = `${coordinates.data.results[0].name}, ${coordinates.data.results[0].admin1}, ${coordinates.data.results[0].country}`;
      const timezone = coordinates.data.results[0].timezone;
      const response = await axios.get(
        `/api/search?latitude=${latitude}&longitude=${longitude}&name=${name}&timezone=${timezone}`
      );
      setAddress("");
      Toast.fire({
        icon: "success",
        title: `${response.data.message} for ${coordinates.data.results[0].name}.`,
      });
      updateCities();
      setIsLoading(false);
    } catch (error) {
      console.log("error :", error);
      Toast.fire({
        icon: "error",
        title: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        className="form-control"
        placeholder="Search for cities"
        value={address}
        onChange={handleInputChange}
      />
      <button
        className="btn btn-primary ms-4"
        onClick={fetchData}
        disabled={!address.trim() & (address === "") || isLoading}
      >
        Search
      </button>
    </div>
  );
};

export default Searchbar;
