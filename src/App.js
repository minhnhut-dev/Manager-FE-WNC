import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import moment from "moment";
import AppContext from "./constanst/Context/appContext";
import "moment/locale/vi";
import { React, useEffect, useState } from "react";
import { memo } from "react";
import io from "socket.io-client";

let currentUserFromLocalStorage =
  JSON.parse(localStorage.getItem("manager-spaces")) || null;
moment.locale("vi");
const App = memo(function App() {
  const routing = useRoutes(Themeroutes);
  const [currentUser, setCurrentUser] = useState(currentUserFromLocalStorage);

  console.log(currentUser?.access_token);

  const SOCKET_SERVER_URL = "http://localhost:81";
  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, {
      transports: ["polling"],
      transportOptions: {
        polling: {
          extraHeaders: {
            "authorization": `Bearer ${currentUser?.access_token}`,
          },
        },
      },
      // extraHeaders: {
      //   authorization: `Bearer ${currentUser?.access_token}`,
      // },
    });
    socket.on("createReportSpace", (data) => {
      console.log(data)
      console.log("connected");
    });
  }, []);

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="dark">{routing}</div>
    </AppContext.Provider>
  );
});

export default App;
