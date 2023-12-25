import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import moment from "moment";
import AppContext from "./Context/appContext";
import "moment/locale/vi";
import {React, useState} from "react";
import { memo } from 'react';

let currentUserFromLocalStorage = JSON.parse(localStorage.getItem("manager-spaces")) || null;

moment.locale("vi");
const App = memo(function App() {
  const routing = useRoutes(Themeroutes);
  const [currentUser, setCurrentUser] = useState(currentUserFromLocalStorage);

  return (
      <AppContext.Provider value={{currentUser, setCurrentUser}}>
          <div className="dark">{routing}</div>
      </AppContext.Provider>
  );
});

export default App;
