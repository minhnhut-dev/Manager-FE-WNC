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
import SimpleLayout from "../layouts/SimpleLayout";
import RequestEditSurface from "../pages/WARD_DISTRICT/Surfaces/RequestEditSurface";

import ListReportSurfaceFromUser from "../pages/Department/ListReportSurfaceFromUser";
import ApprovalAndLicensingSpace from "../pages/Department/ApprovalAndLicensingSpace";
import ApprovalAndLicensingSurface from "../pages/Department/ApprovalAndLicensingSurface";
import ManageSurface from "../pages/Department/ManageSurface";
import EditSurface from "../pages/Department/ManageSurface/EditSurface";
import ListUser from "../pages/Department/ManagerUser/ListUser";
import AddUser from "../pages/Department/ManagerUser/AddUser";
import AddSpaces from "../pages/Department/ManageSpace/AddSpace";

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
        element: <ProtectedRoute> <ReportSpaces/> </ProtectedRoute>,
      },
      {
        path: "/danh-sach-bao-cao-bang-quang-cao",
        exact: true,
        element: <ProtectedRoute> < ListReportSurface/></ProtectedRoute>,
      },
      {
        path: "/them-yeu-cau-chinh-sua-bang-quang-cao/:surfaceId",
        exact: true,
        element: <ProtectedRoute> <AddRequestEditSurfaces/></ProtectedRoute>
      },
      {
        path: "/them-yeu-cau-chinh-sua-dia-diem/:spacesId",
        exact: true,
        element: <ProtectedRoute>< RequestReportSpaces/></ProtectedRoute>,
      },

      {
        path: "/danh-sach-yeu-cau-chinh-sua",
        exact: true,
        element: <ProtectedRoute>< ListReportSpacesByUser/></ProtectedRoute>,
      },
      //baotran
      {
        path: "/xet-duyet-bao-cao-bang-quang-cao-tu-nguoi-dan",
        exact: true,
        element: <ProtectedRoute>< ListReportSurfaceFromUser/></ProtectedRoute>,
      },
      {
        path: "/xem-va-xet-duyet-yeu-cau-cap-phep-diem-quang-cao",
        exact: true,
        element: <ProtectedRoute>< ApprovalAndLicensingSpace/></ProtectedRoute>,
      },
      {
        path: "/xem-va-xet-duyet-yeu-cau-cap-phep-bang-quang-cao",
        exact: true,
        element: <ProtectedRoute>< ApprovalAndLicensingSurface /></ProtectedRoute>,
      },
      {
        path: "/quan-ly-bang-quang-cao",
        exact: true,
        element: <ProtectedRoute>< ManageSurface /></ProtectedRoute>,
      },
      {
        path: "/chinh-sua-bang-quang-cao/:surfaceId",
        exact: true,
        element: <ProtectedRoute>< EditSurface/></ProtectedRoute>,
      },
      //
      {
        path: "/chinh-sua-thong-tin-ca-nhan",
        exact: true,
        element: <EditProfile />
      },

      {
        path: "/quang-ly-quan-phuong",
        exact: true,
        element: <ProtectedRoute>< ManageWardDistrict /></ProtectedRoute>,
      },
      {
        path: "/quang-ly-cac-loai-hinh-thuc",
        exact: true,
        element: <ProtectedRoute>< ManageAllTypesOfForms /></ProtectedRoute>,
      },
      {
        path: "/quang-ly-diem-dat-quang-cao",
        exact: true,
        element: <ProtectedRoute>< ManageSpace /></ProtectedRoute>,
      },
      {
        path: "/chinh-sua-diem-dat-quang-cao/:spacesId",
        exact: true,
        element: <ProtectedRoute>< EditSpace/></ProtectedRoute>,
      },
      {
        path: "/danh-sach-dia-diem-quang-cao",
        exact: true,
        element: <ProtectedRoute>< ListRequestAddSpaces /></ProtectedRoute>,
      },
      {
        path: "/yeu-cau-them-diadiem-quang-cao",
        exact: true,
        element: <ProtectedRoute>< RequestAddSpaces /></ProtectedRoute>,
      },
      {
        path: "/yeu-cau-chinh-sua-dia-diem-quang-cao/:requestSpaceId",
        exact: true,
        element: <ProtectedRoute>< RequestEditSpaces /></ProtectedRoute>,
      },
      {
        path: "/danh-sach-yeu-cau-them-bang-quang-cao/:spaceId",
        exact: true,
        element: <ProtectedRoute>< ListRequestAddSurfaces /></ProtectedRoute>,
      },{
        path: "/yeu-cau-chinh-sua-bang-quang-cao/:surfaceId",
        exact: true,
        element:<ProtectedRoute> < RequestEditSurface /></ProtectedRoute>,
      },
      {
        path: "/them-yeu-cau-them-bang-quang-cao/:spaceId",
        exact: true,
        element: <ProtectedRoute>< RequestAddSurfaces /></ProtectedRoute>,
      },
      {
        path: "/danh-sach-dia-diem",
        exact: true,
        element: <ProtectedRoute>< ListSpaceNormal /></ProtectedRoute>,
      },
      {
        path: "/danh-sach-nguoi-dung",
        exact: true,
        element: <ProtectedRoute>< ListUser /></ProtectedRoute>,
      },
      {
        path: "/them-nguoi-dung",
        exact: true,
        element: <ProtectedRoute>< AddUser /></ProtectedRoute>
      },
      {
        path: "/them-dia-diem",
        exact: true,
        element: <ProtectedRoute>< AddSpaces /></ProtectedRoute>,
      }
      ]
    },
  { path: "*", element: <NotFound /> },
  {
    path: '/login', element: <LoginPage/>
  },
  {
    path: "/quen-mat-khau", element: <SimpleLayout /> , children: [{
      path: "/quen-mat-khau",
      exact: true,
      element: <ForgotPassword />
      }
    ]
  }
];

export default ThemeRoutes;
