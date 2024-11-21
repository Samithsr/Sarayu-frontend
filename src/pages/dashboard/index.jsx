import React from "react";
import { useSelector } from "react-redux";
import Admin from "./../../admin/index";
import Manager from "../../manager";
import Supervisor from "../../supervisor";
import Employee from "../../employee";

const Dashboard = () => {
  const { user } = useSelector((state) => state.userSlice);
  return (
    <div>
      {user.role === "admin" && <Admin />}
      {user.role === "manager" && <Manager />}
      {user.role === "supervisor" && <Supervisor />}
      {user.role === "employee" && <Employee />}
    </div>
  );
};

export default Dashboard;
