import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setLoading } from "../redux/slices/UniversalLoader";
import { IoCloseSharp } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { setUserDetails } from "../redux/slices/UserDetailsSlice";
import apiClient from "../api/apiClient";
import "./style.css";
import { handleWarningModel } from "../redux/slices/UserSlice";

const Employee = () => {
  const { user } = useSelector((state) => state.userSlice);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id) {
      fetchUserDetails();
    }
  }, []);

  const fetchUserDetails = async () => {
    try {
      dispatch(setLoading(true));
      const res = await apiClient.get(`/auth/employee/${user.id}`);
      setLoggedInUser(res?.data?.data);
      dispatch(setUserDetails(res?.data?.data));
      dispatch(setLoading(false));
    } catch (error) {
      toast.error(error?.response?.data?.error);
      dispatch(setLoading(false));
    }
  };

  return (
    <>
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
            <p className="manager_navbar_nav_desktop_view_links_active">Dashboard</p>
            <p>Contact Us</p>
            <p>Logout</p>
          </div>
          <div className="manager_navbar_nav_mobile_view_open_btn">
            <IoMdMenu
              onClick={() => setShowMenu(true)}
              style={{ cursor: "pointer" }}
              size={"25px"}
            />
          </div>
        </nav>
        <section
          className={`manager_navbar_nav_mobile_view_links ${
            showMenu && "manager_navbar_nav_mobile_view_links_show"
          }`}
        >
          <div>
            <div>
              <section>
                <span>
                  <img
                    src="https://sarayuinfotech.in/images/sarayu/Logo/sarayu-comp-icon.png"
                    alt="sarayu logo"
                  />
                </span>
                <span>
                  <IoCloseSharp
                    size={"30px"}
                    style={{ cursor: "pointer" }}
                    className="mb-2"
                    onClick={() => setShowMenu(false)}
                  />
                </span>
              </section>
              <div className="manager_navbar_nav_mobile_view_links_container">
                <p>Dashboard</p>
                <p>Contact Us</p>
              </div>
              <footer
                className="manager_navbar_nav_mobile_view_links_footer"
                onClick={() => dispatch(handleWarningModel())}
              >
                <div className="manager_navbar_nav_mobile_view_links_footer_side_line"></div>
                <div className="manager_navbar_nav_mobile_view_links_footer_details">
                  <div>
                    {loggedInUser?.name} <IoExitOutline />
                  </div>
                  <div>{loggedInUser?.email}</div>
                </div>
              </footer>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Employee;
