"use client";
import "@/styles/sidebar.scss";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import weather from "@/assets/images/weather.svg";
import { FaCloudSunRain, FaList, FaMap, FaSlidersH } from "react-icons/fa";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <nav className="sidebar">
      <div className="d-flex justify-content-center mb-5">
        <Image src={weather} alt="weather" width={30} height={30} priority />
      </div>
      <ul className="list-unstyled">
        <li>
          <Link
            href="/"
            className={`${
              pathname === "/" ? "text-primary" : "text-dark"
            } sidebar-link`}
          >
            <FaCloudSunRain className="sidebar-icon" />
            <p>Weather</p>
          </Link>
        </li>
        <li>
          <Link
            href="/cities"
            className={`${
              pathname === "/cities" ? "text-primary" : "text-dark"
            } sidebar-link`}
          >
            <FaList className="sidebar-icon" />
            <p>Cities</p>
          </Link>
        </li>
        <li>
          <FaMap className="sidebar-icon text-dark" />
          <p>Map</p>
        </li>
        <li>
          <FaSlidersH className="sidebar-icon text-dark" />
          <p>Settings</p>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
