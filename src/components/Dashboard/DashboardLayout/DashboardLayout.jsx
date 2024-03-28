/* eslint-disable no-unused-vars */
import "./DashboardLayout.css";
import Topbar from "../topbar/Topbar";
import { Outlet } from "react-router-dom";
import DashbordSidebar from "../dashbordSidebar/DashbordSidebar";
import MobileTopbar from "../topbar/MobileTopbar";
import { useSelector } from "react-redux";
const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div className="dashobard_layout">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2 p-0">
              <DashbordSidebar user={user} />
            </div>
            <div className="col-lg-10 p-0">
              <Topbar className="deskTopbar" user={user} />
              <MobileTopbar user={user} />
              {/* <div className=""> */}
              <div className="dashbord_content">
                <Outlet />
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
