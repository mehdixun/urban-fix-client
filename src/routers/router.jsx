import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import HomeLayout from "../layout/HomeLayout";
import Home from "../pages/Home";
import Login from "../pages/login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import AboutUs from "../pages/AboutUs";
import ServiceAreas from "../pages/ServiceAreas";
import Allissues from "../pages/AllIssues";
import PrivateRoute from "./PrivateRoute";
import IssueDetails from "../pages/IssueDetails";
import DashBoardLayout from "../layout/DashBoardLayout";
import MyIssues from "../pages/MyIssues";
import CreateIssue from "../pages/CreateIssue";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            index: true,
            element: <Home></Home>
        },
        {
            path:'/login',
            element: <Login></Login>
        },
        {
            path: 'register',
            element: <Register></Register>
        },
        {
          path: 'about-us',
          element: <AboutUs></AboutUs>
        },
        {
          path: '/all-issues',
          element: 
          <Allissues></Allissues>
        },
        {
          path: '/create-issue',
          element: 
          <CreateIssue></CreateIssue>
        },
        {
          path: '/issue/:id',
          element: <IssueDetails></IssueDetails>
        },
        {
          path: 'dashboard',
          element: <PrivateRoute>
            <DashBoardLayout></DashBoardLayout>
          </PrivateRoute>,
          children:[
            {
              path: 'my-issues',
              element: <MyIssues></MyIssues>
            }
          ]
        },
        {
          path: 'service-area',
          element: <ServiceAreas></ServiceAreas>,
          loader: () => fetch('/coveragemaps.json').then(res=> res.json())
        }
    ]
  },
]);