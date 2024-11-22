import React from "react";
import "../index.css";
import { IoLocationSharp } from "react-icons/io5";
import { MdDevices } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { GrLogout } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { handleWarningModel } from "../../redux/slices/UserSlice";
import SidebarBtn from "../common/SidebarBtn";

const Sidebar = () => {
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(handleWarningModel());
  };
  return (
    <div
      className="sidebar_container"
      data-aos="fade-right"
      data-aos-duration="1000"
      data-aos-once="true"
    >
      <section>
        <div className="sidebar_title_container">
          <div className="sidebar_title_second_container py-1">
            <h3 className="sidebar_title">SARAYU</h3>
            <h6 className="admin_panel_title">
              <MdAdminPanelSettings size={"20"} /> ADMIN PANEL
            </h6>
          </div>
          <div className="sidebar_hr_container">
            <div className="hr_alternative"></div>
          </div>
        </div>
        <div className="sidebar_buttons_container">
          {/* <SidebarBtn
            path="/dashboard/live"
            icon={<IoLocationSharp />}
            title="Live"
          /> */}
          <SidebarBtn
            path="/dashboard/dashboard"
            icon={<MdSpaceDashboard />}
            title="Dashboard"
          />
          {/* <SidebarBtn
            path="/dashboard/devices"
            icon={<MdDevices />}
            title="Devices"
          /> */}
          {/* <SidebarBtn
            path="/dashboard/reports"
            icon={<BiSolidReport />}
            title="Reports"
          /> */}
          <SidebarBtn
            path="/dashboard/users"
            icon={<FaUsersCog />}
            title="Users"
          />
          <SidebarBtn
            path="/dashboard/inbox"
            icon={<MdEmail />}
            title="Inbox"
          />
        </div>
      </section>
      <section>
        <div className="sidebar_lastsection">
          <div class="tooltip-container">
            <span class="tooltip">Logout</span>
            <div class="notification" onClick={handleLogout}>
              <div class="notiglow"></div>
              <div class="notiborderglow"></div>
              <div class="notititle">
                <span>Logout</span>
                <span style={{ transform: "translateY(-2px)" }}>
                  <GrLogout />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
