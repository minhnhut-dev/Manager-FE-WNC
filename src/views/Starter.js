import { Col, Row } from "reactstrap";
import ReportSpaces from "../components/dashboard/ReportSpaces";
import Dashboard from "../components/dashboard/Dashboard";

import ReportSurfaces from "../components/dashboard/ReportSurfaces";

const Starter = () => {
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
           <ReportSpaces />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
