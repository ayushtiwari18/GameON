import React from "react";
import AcademyNavbar from "./Navbar/AcademyNavbar";
import Footer from "../Player/Footer/Footer";
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
