import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Surface from "../pages/Surface/index.jsx";
import Report from "../pages/WARD_DISTRICT/Space/ReportSpaces/index.jsx";
import LoginPage from "../pages/Login/index";
import ReportSpaces from "../pages/WARD_DISTRICT/Space/ReportSpaces/index.jsx";
import RequestReportSpaces from "../pages/WARD_DISTRICT/Space/RequestReportSpaces";
import ListReportSpacesByUser from "../pages/Department/ListReportSpacesFromUser";
import ManageWardDistrict from "../pages/Department/ManageWardDistrict";
import ManageAllTypesOfForms from "../pages/Department/ManageAllTypesOfForms";
import ManageSpace from "../pages/Department/ManageSpace";
import EditSpace from "../pages/Department/ManageSpace/EditSpace";
import EditProfile from "../pages/EditProfile";
import ForgotPassword from "../pages/ForgotPassword";
import ProtectedRoute from "../services/protectedRouter";
import ListReportSurface from "../pages/WARD_DISTRICT/Surfaces/ReportSurface/ListReportSurface";
import AddRequestEditSurfaces from "../pages/WARD_DISTRICT/Surfaces/ReportSurface/AddRequestEditSurfaces";
import ListRequestAddSpaces from "../pages/WARD_DISTRICT/Space/RequestAddEditSpaces/ListRequestAddSpaces";
import RequestAddSpaces from "../pages/WARD_DISTRICT/Space/RequestAddEditSpaces/RequestAddSpaces";
import RequestEditSpaces from "../pages/WARD_DISTRICT/Space/RequestAddEditSpaces/RequestEditSpaces";
import ListRequestAddSurfaces from "../pages/WARD_DISTRICT/Surfaces/RequestAddSurface/ListRequestAddSurface";
import RequestAddSurfaces from "../pages/WARD_DISTRICT/Surfaces/RequestAddSurface/RequestAddSurface";
import ListSpaceNormal from "../pages/WARD_DISTRICT/Space/SpaceNormal/ListSpaceNormal";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/
const AddRequestFormReportById = lazy(() => import("../pages/WARD_DISTRICT/Space/RequestReportSpaces/index"));
const Starter = lazy(() => import("../views/Starter.js"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <ProtectedRoute><Starter /> </ProtectedRoute> },
      {
        path: "/danh-sach-bao-cao-dia-diem",
        exact: true,
        element: < ReportSpaces/>,
      },
      {
        path: "/danh-sach-bao-cao-bang-quang-cao",
        exact: true,
        element: < ListReportSurface/>,
      },
      {
        path: "/them-yeu-cau-chinh-sua-bang-quang-cao/:surfaceId",
        exact: true,
        element: < AddRequestEditSurfaces/>,
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

      {
        path: "/quang-ly-quan-phuong",
        exact: true,
        element: < ManageWardDistrict />,
      },
      {
        path: "/quang-ly-cac-loai-hinh-thuc",
        exact: true,
        element: < ManageAllTypesOfForms />,
      },
      {
        path: "/quang-ly-diem-dat-quang-cao",
        exact: true,
        element: < ManageSpace />,
      },
      {
        path: "/chinh-sua-diem-dat-quang-cao/:spacesId",
        exact: true,
        element: < EditSpace/>,
      },
      {
        path: "/danh-sach-dia-diem-quang-cao",
        exact: true,
        element: < ListRequestAddSpaces />,
      },
      {
        path: "/yeu-cau-them-diadiem-quang-cao",
        exact: true,
        element: < RequestAddSpaces />,
      },
      {
        path: "/yeu-cau-chinh-sua-dia-diem-quang-cao/:requestSpaceId",
        exact: true,
        element: < RequestEditSpaces />,
      },
      {
        path: "/danh-sach-yeu-cau-them-bang-quang-cao/:spaceId",
        exact: true,
        element: < ListRequestAddSurfaces />,
      },
      {
        path: "/them-yeu-cau-them-bang-quang-cao/:spaceId",
        exact: true,
        element: < RequestAddSurfaces />,
      },
      {
        path: "/danh-sach-dia-diem",
        exact: true,
        element: < ListSpaceNormal />,
      },
      ]
    },
  { path: "*", element: <NotFound /> },

  { path: "/login", element: <LoginPage /> }
];

export default ThemeRoutes;
