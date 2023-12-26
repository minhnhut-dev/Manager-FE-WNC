import { Col, Row } from "reactstrap";
import ReportSpaces from "../components/dashboard/ReportSpaces";
import Dashboard from "../components/dashboard/Dashboard";
import AppContext from "../Context/appContext";
import {useContext} from "react";
const Starter = () => {
    const {currentUser} = useContext(AppContext);
  return (
    <div>
      <Row>
        <Col md={12} sm="12" lg="6" xl="12" xxl="12" >
          <Dashboard />
        </Col>
        {/* <Col md={12} sm="12" lg="6" xl="12" xxl="12" >
           <ReportSurfaces />
        </Col> */}
        <Col md={12} sm="12" lg="6" xl="12" xxl="12" >
           <ReportSpaces current_user = {currentUser}/>
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
