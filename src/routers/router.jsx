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
          path: 'service-area',
          element: <ServiceAreas></ServiceAreas>,
          loader: () => fetch('/coveragemaps.json').then(res=> res.json())
        }
    ]
  },
]);