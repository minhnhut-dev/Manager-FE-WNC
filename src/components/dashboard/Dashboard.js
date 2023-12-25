import { Card, CardBody, CardTitle, Row } from "reactstrap";
import Map from "./Map";
import Select from "../Select";
import {useEffect, useState} from "react";
import {axiosService} from "../../services/axiosServices";
import {user_info} from "../../utils/mock/user";

const Dashboard = () => {
  const [optionsId, setOptionsId] = useState(null);
  const [map, setMap] = useState(null);

  const loadSpacesByDistrict = async (optionsId) => {
    if(optionsId === null || optionsId === "") {
      const {data} = await axiosService.get(`/spaces/area?district=${user_info.district.id}`);
      return data;
    }else {
      const {data} = await axiosService.get(`/spaces/area?ward=${optionsId}`);
      return data;
    }
  }

  useEffect(() => {
    if(user_info.role === "DISTRICT_MANAGER"){
      loadSpacesByDistrict(optionsId).then((data) => {
        setMap(data);
      })
    }
  }, [optionsId]);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h4" className="fw-bold">Bản đồ danh sách các điểm quảng cáo</CardTitle>
        <div className="row">
          <div className="col-md-3">
            <span>Chọn phường để xem</span>
            <Select setOptionsId={setOptionsId}/>
          </div>
        </div>
        <div className="text-white my-3 p-3 rounded">
          <Row>
            {map && <Map geoJSon = {map} optionsId={ optionsId}/> }
          </Row>
        </div>
      </CardBody>
    </Card>
  );
};

export default Dashboard;
