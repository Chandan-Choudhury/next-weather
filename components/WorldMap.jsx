"use client";

import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldIndiaLow from "@amcharts/amcharts5-geodata/worldIndiaLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import apiClient from "@/libs/api";
import Loader from "./Loader";

const WorldMap = () => {
  const [cities, setCities] = useState(null);
  const [loading, setLoading] = useState(true);

  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await apiClient.get("/saved-cities");
      setCities(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  useLayoutEffect(() => {
    if (cities) {
      let root = am5.Root.new("chartdiv");
      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5map.MapChart.new(root, {
          panX: "translateX",
          panY: "translateY",
          projection: am5map.geoMercator(),
        })
      );

      let polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_worldIndiaLow,
          exclude: ["AQ"],
        })
      );

      //   polygonSeries.mapPolygons.template.setAll({
      // tooltipText: "{name}",
      // interactive: true,
      //   });

      let pointSeries = chart.series.push(
        am5map.MapPointSeries.new(root, {
          latitudeField: "lat",
          longitudeField: "long",
        })
      );

      pointSeries.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: am5.color(0xffba00),
            tooltipText: `{name} - {temperature}°C`,
          }),
        });
      });

      pointSeries.data.setAll(
        cities.map((city) => ({
          long: city.long,
          lat: city.lat,
          name: city.name.split(",")[0].trim(),
          temperature: Math.round(city.current.temperature2m),
        }))
      );

      chartRef.current = chart;

      return () => {
        root.dispose();
      };
    }
  }, [cities]);

  if (loading) {
    return (
      <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  }

  return <div id="chartdiv" className="mapchartdiv"></div>;
};

export default WorldMap;
