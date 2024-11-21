import React from "react";
import Login from "../authentication/Login";
import { Route, Routes } from "react-router-dom";
import ContactSupport from "../authentication/ContactSupport";
import Admin from "./../admin/index";
import Supervisor from "./../supervisor/index";
import Employee from "./../employee/index";
import Manager from "./../manager/index";
import DashboardPanel from "../admin/components/Dashboard";
import Dashboard from "../pages/dashboard/index";
import ProtectedRoute from "./ProtectedRoute";
import Logout from "./../authentication/Logout";
import Live from "../admin/components/Live";
import Devices from "./../admin/components/Devices";
import Reports from "../admin/components/Reports";
import Users from "../admin/components/Users";
import Mail from "../admin/components/Mail";
import CompanySelect from "./../admin/components/userRoutesCompany/CompanySelect";
import CreateSupervisorEmp from "../admin/components/userRoutesCompany/CreateSupervisorEmp";

const RoutersDom = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/contactSupport" element={<ContactSupport />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route
            index
            path="/dashboard/dashboard"
            element={<DashboardPanel />}
          />
          <Route path="/dashboard/live" element={<Live />} />
          <Route path="/dashboard/devices" element={<Devices />} />
          <Route path="/dashboard/reports" element={<Reports />} />
          <Route path="/dashboard/users" element={<Users />}>
            <Route path="/dashboard/users" element={<CompanySelect />} />
            <Route
              path="/dashboard/users/supervisoremployee/:companyId"
              element={<CreateSupervisorEmp />}
            />
          </Route>
          <Route path="/dashboard/inbox" element={<Mail />} />
        </Route>
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Routes>
  );
};

export default RoutersDom;
