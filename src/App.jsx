import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { applyTheme } from "./config/theme";

const App = () => {
  useEffect(() => {
    applyTheme();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
