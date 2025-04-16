import React, { useContext } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Routers from "../routes/Routers";
import { ThemeContext } from "../context/ThemeContext"; // Import ThemeContext

const Layout = () => {
  const { darkMode } = useContext(ThemeContext); // Consume ThemeContext

  return (
    <div className={darkMode ? "dark" : ""}>
      {" "}
      {/* Add a wrapping div and apply 'dark' class conditionally */}
      <Header />
      <main>
        <Routers />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
