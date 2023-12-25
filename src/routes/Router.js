import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Surface from "../pages/Surface/index.jsx";
import Report from "../pages/Report/index.jsx";
import LoginPage from "../pages/Login/index";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

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
        path: "/danh-sach-loai-bang-quang-cao",
        exact: true,
        element: <Advertisement />,
      },
      {
        path: "/danh-sach-bang-quang-cao/:spaceId",
        exact: true,
        element: <Surface />,
      },
      {
        path: "/them-bao-cao-quang-cao/:surfaceId",
        exact: true,
        element: <Report />,
      },
      {
        path: "/sua-bang-quang-cao/:AdvertisementId",
        exact: true,
        element: <AddEditAdvertisement isEdit={true} />,
      },
    ],
  },
  { path: "*", element: <NotFound /> },
    { path: "/login", element: <LoginPage /> },
];

export default ThemeRoutes;
