import { createBrowserRouter } from "react-router";
import HomeLayout from "../layout/HomeLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import AboutUs from "../pages/AboutUs";
import Allissues from "../pages/AllIssues";
import PrivateRoute from "./PrivateRoute";
import IssueDetails from "../pages/IssueDetails";
import DashBoardLayout from "../layout/DashBoardLayout";
import MyIssues from "../pages/MyIssues";
import CreateIssue from "../pages/CreateIssue";
import EditIssue from "../pages/EditIssue";
import RoleRoute from "../components/RoleRoute";
import AdminDashboard from "../pages/AdminDashboard";
import StaffDashboard from "../pages/StaffDashboard";
import CitizenDashboard from "../pages/CitizenDashboard";
import UserProfile from "../pages/UserProfile";
import AdminPayments from "../pages/AdminPayments";
import UserPayments from "../pages/UserPayments";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "all-issues", element: <Allissues /> },
      { path: "create-issue", element: <CreateIssue /> },
      { path: "issue/:id", element: <IssueDetails /> },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashBoardLayout />
          </PrivateRoute>
        ),
        children: [
          { path: "my-issues", element: <MyIssues /> },
          { path: "my-payment", element: <UserPayments /> },
          { path: "profile", element: <UserProfile /> },
          { path: "edit-issue/:id", element: <EditIssue /> },
          { path: "admin", element: <RoleRoute requiredRole="admin"><AdminDashboard /></RoleRoute> },
          { path: "admin/payments", element: <RoleRoute requiredRole="admin"><AdminPayments /></RoleRoute> },
          { path: "staff", element: <RoleRoute requiredRole="staff"><StaffDashboard /></RoleRoute> },
          { path: "citizen", element: <RoleRoute requiredRole="citizen"><CitizenDashboard /></RoleRoute> },
        ],
      },
    ],
  },
]);
