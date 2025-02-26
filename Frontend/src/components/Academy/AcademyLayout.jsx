import React from "react";
import AcademyNavbar from "./Navbar/AcademyNavbar";
import Footer from "../landing page/footer/Footer";
const AcademyLayout = ({ children }) => {
  return (
    <>
      <AcademyNavbar />
      {children}
      <Footer />
    </>
  );
};

export default AcademyLayout;
