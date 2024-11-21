import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import RoutersDom from "./routers/RoutersDom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slices/UserSlice";
import WarningModel from "./common/WarningModel";
import Loading from "./common/Loading";
import { ToastContainer } from "react-toastify";
import setAuthToken from "./setAuthToken";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

const App = () => {
  const [userLocal, setUserLocal] = useState({});
  const { logoutToggle } = useSelector((state) => state.userSlice);
  const { loading } = useSelector((state) => state.UniversalLoader);
  const dispatch = useDispatch();
  useEffect(() => {
    const jwt = localStorage.getItem("token");
    try {
      const jwtUser = jwtDecode(jwt);
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        setUserLocal(jwtUser);
        dispatch(setUser(jwtUser));
      }
    } catch (error) {}
  }, []);
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="App">
      <ToastContainer autoClose={1500} />
      {loading && <Loading />}
      {logoutToggle && <WarningModel />}
      <RoutersDom />
    </div>
  );
};
export default App;
