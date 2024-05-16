import "bootstrap/dist/css/bootstrap.css";
import { Inter } from "next/font/google";
import BootstrapClient from "@/components/BootstrapClient";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const revalidate = 0;

export const metadata = {
  title: "Next Weather - by Chandan",
  description: "A weather app built with Next.js and OpenWeatherMap API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} container`}>
        <div className="row">
          <div className="col-2 p-4 d-flex justify-content-center">
            <Sidebar />
          </div>
          <div className="col-10 col-md-10 p-4">{children}</div>
        </div>
        <Footer />
        <BootstrapClient />
      </body>
    </html>
  );
}
