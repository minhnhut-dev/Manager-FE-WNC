import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");
const App = () => {
  const routing = useRoutes(Themeroutes);
  
  return <div className="dark">{routing}</div>;
};

export default App;
