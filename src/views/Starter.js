import { Col, Row } from "reactstrap";
import ReportSpaces from "../components/dashboard/ReportSpaces";
import Dashboard from "../components/dashboard/Dashboard";
import AppContext from "../constanst/Context/appContext";
import {useContext} from "react";
import ReportSurfaces from "../components/dashboard/ReportSurfaces";
const Starter = () => {
    const {currentUser} = useContext(AppContext);
  return (
    <div>
      <Row>
        <Col md={12} sm="12" lg="6" xl="12" xxl="12" >
          <Dashboard />
        </Col>

        <Col md={12} sm="12" lg="6" xl="12" xxl="12" >
           <ReportSpaces current_user = {currentUser}/>
        </Col>
          <Col md={12} sm="12" lg="6" xl="12" xxl="12" >
           <ReportSurfaces  current_user = {currentUser}/>
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
