import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Map from "../components/dashboard/Map";
import ProjectTables from "../components/dashboard/ProjectTable";


const Starter = () => {
  return (
    <div>
      <Row>
        <Col md={12} sm="12" lg="6" xl="12" xxl="12" >
          <SalesChart />
        </Col>
        <Col md={12} sm="12" lg="6" xl="12" xxl="12" >
           <ProjectTables />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
