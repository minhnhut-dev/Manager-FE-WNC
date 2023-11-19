import { lazy } from "react";
import { Navigate } from "react-router-dom";

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
        path: "/danh-sach-bang-quang-cao",
        exact: true,
        element: <Advertisement />,
      },
      {
        path: "/them-bang-quang-cao",
        exact: true,
        element: <AddEditAdvertisement />,
      },
      {
        path: "/sua-bang-quang-cao/:AdvertisementId",
        exact: true,
        element: <AddEditAdvertisement isEdit={true} />,
      },
    ],
  },
  { path: "*", element: <NotFound /> },
];

export default ThemeRoutes;
