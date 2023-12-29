import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Surface from "../pages/Surface/index.jsx";
import Report from "../pages/ReportSpaces/index.jsx";
import LoginPage from "../pages/Login/index";
import ReportSpaces from "../pages/ReportSpaces/index.jsx";
import RequestReportSpaces from "../pages/RequestReportSpaces";
import ListReportSpacesByUser from "../pages/Department/ListReportSpacesFromUser";
import EditProfile from "../pages/EditProfile";
import ForgotPassword from "../pages/ForgotPassword";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/
const AddRequestFormReportById = lazy(() => import("../pages/RequestReportSpaces/index"));
const Starter = lazy(() => import("../views/Starter.js"));
const Advertisement = lazy(() => import("../pages/advertisement/index"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const AddEditAdvertisement = lazy(() =>
  import("../pages/AddEditAdvertisement/index")
);
/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      {
        path: "/danh-sach-bao-cao-dia-diem",
        exact: true,
        element: < ReportSpaces/>,
      },
      {
        path: "/them-yeu-cau-chinh-sua-dia-diem/:spacesId",
        exact: true,
        element: < RequestReportSpaces/>,
      },

      {
        path: "/danh-sach-yeu-cau-chinh-sua",
        exact: true,
        element: < ListReportSpacesByUser/>,
      },
      {
        path: "/chinh-sua-thong-tin-ca-nhan",
        exact: true,
        element: <EditProfile />
      },
      {
        path: "/quen-mat-khau",
        exact: true,
        element: <ForgotPassword />
      },
    ],
  },
  { path: "*", element: <NotFound /> },
    { path: "/login", element: <LoginPage /> },
];

export default ThemeRoutes;
