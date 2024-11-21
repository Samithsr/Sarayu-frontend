import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setLoading } from "../redux/slices/UniversalLoader";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { setUserDetails } from "../redux/slices/UserDetailsSlice";
import apiClient from "../api/apiClient";
import { IoSearch } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { RiDashboard2Line } from "react-icons/ri";
import { IoKey } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { HiInformationCircle } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import "./style.css";
import { handleWarningModel } from "../redux/slices/UserSlice";

const Manager = () => {
  const { user } = useSelector((state) => state.userSlice);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [activeNavBtn, setActiveNavBtn] = useState("home");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id) {
      fetchUserDetails();
    }
  }, []);

  const fetchUserDetails = async () => {
    try {
      dispatch(setLoading(true));
      const res = await apiClient.post(`/auth/manager/${user.id}`);
      setLoggedInUser(res?.data?.data);
      dispatch(setUserDetails(res?.data?.data));
      dispatch(setLoading(false));
    } catch (error) {
      toast.error("Something went wrong!");
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="manager_dashboard_main_container">
      <div className="manager_navbar_container">
        <nav className="manager_navbar_nav">
          <div>
            <p>
              {loggedInUser?.company?.name.length >= 10
                ? loggedInUser?.company?.name.slice(0, 10) + "..."
                : loggedInUser?.company?.name.slice(0, 10)}
            </p>
          </div>
          <div className="manager_navbar_nav_desktop_view_links">
            <p className="manager_navbar_nav_desktop_view_links_active">
              Dashboard
            </p>
            <p>Contact Us</p>
            <p>Logout</p>
          </div>
          <div className="manager_navbar_nav_mobile_view_open_btn">
            <HiInformationCircle
              onClick={() => setShowUserDetails(true)}
              style={{ cursor: "pointer" }}
              size={"24px"}
            />
          </div>
        </nav>
      </div>
      <section className="user_section_body_container">
        {showUserDetails && (
          <div className="user_details_card_container">
            <div
              data-aos="fade-out"
              data-aos-duration="300"
              data-aos-once="true"
            >
              <div>
                <FaRegUser /> {loggedInUser?.name}
              </div>
              <div>
                <MdEmail /> {loggedInUser?.email}
              </div>
              <div>
                <FaPhoneAlt />
                {loggedInUser?.phonenumber
                  ? loggedInUser?.phonenumber
                  : "+xx xxxxxxxxxx"}
              </div>
              <hr />
              <div>{loggedInUser?.company?.name}</div>
              <div>{loggedInUser?.company?.email}</div>
              <div>{loggedInUser?.company?.address}</div>
              <hr />
              <button>
                <IoClose onClick={() => setShowUserDetails(false)} />
              </button>
            </div>
          </div>
        )}
      </section>
      <div className="footer_navigationbar_mobile_view">
        <div
          className={
            activeNavBtn === "home" && `footer_navigationbar_mobile_view_active`
          }
        >
          <FaHome onClick={() => setActiveNavBtn("home")} />
          {activeNavBtn === "home" && <span>Home</span>}
        </div>
        <div
          className={
            activeNavBtn === "graph" &&
            `footer_navigationbar_mobile_view_active`
          }
        >
          <RiDashboard2Line onClick={() => setActiveNavBtn("graph")} />
          {activeNavBtn === "graph" && <span>Graph</span>}
        </div>
        <div
          className={
            activeNavBtn === "search" &&
            `footer_navigationbar_mobile_view_active`
          }
        >
          <IoSearch onClick={() => setActiveNavBtn("search")} />
          {activeNavBtn === "search" && <span>Search</span>}
        </div>
        <div
          className={
            activeNavBtn === "office" &&
            `footer_navigationbar_mobile_view_active`
          }
        >
          <IoKey onClick={() => setActiveNavBtn("office")} />
          {activeNavBtn === "office" && <span>Password</span>}
        </div>
        <div>
          <MdLogout onClick={() => dispatch(handleWarningModel())} />
        </div>
      </div>
    </div>
  );
};

export default Manager;
