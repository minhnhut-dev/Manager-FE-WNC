import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import moment from "moment";
import AppContext from "./constanst/Context/appContext";
import "moment/locale/vi";
import {React, useEffect, useState} from "react";
import { memo } from "react";
import useSocket from "./hooks/userSocket";

let currentUserFromLocalStorage =
  JSON.parse(localStorage.getItem("manager-spaces")) || null;
moment.locale("vi");
const App = memo(function App() {

  const routing = useRoutes(Themeroutes);
  const [currentUser, setCurrentUser] = useState(currentUserFromLocalStorage);
  const socket = useSocket(currentUser);

  useEffect(() => {
    if(socket) {
      socket.on("createReportSpace", (data) => {
       alert("Có báo cáo mới");
        console.log("**********data************", data);
      });

      // Optional: Handle socket disconnection or other events
    }

    // Cleanup
    return () => {
      if(socket) {
        socket.off("createReportSpace");
      }
    };
  }, [socket]);

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="dark">{routing}</div>
    </AppContext.Provider>
  );
});

export default App;
