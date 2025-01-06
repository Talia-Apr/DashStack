import React from "react";
import { useLocation } from "react-router-dom";
import LeftSidebar from "../containers/LeftSidebar"; // Ganti dengan lokasi Sidebar
import Header from "../containers/Header"; // Ganti dengan lokasi Header

const HideLayout = ({ children }) => {
  const location = useLocation();

  // Sembunyikan layout jika path adalah '/app/Pos'
  const hideHeader = location.pathname === "/app/pos";

  return (
    <>
    <div className={`${hideHeader ? "hidden" : ""}`}>
      <Header />
    </div>
    <LeftSidebar />
    <main>{children}</main>
    </>
  );
};


export default HideLayout;