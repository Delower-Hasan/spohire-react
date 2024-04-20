import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

const Layout = () => {
  return (
    <>
      <div className="bgBanner">
        <Header />
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
