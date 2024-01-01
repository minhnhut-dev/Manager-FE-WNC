import { Card, CardBody, CardTitle, Row } from "reactstrap";
import Map from "./Map";
import Select from "../Select";
import {useContext, useEffect, useState} from "react";
import {axiosService} from "../../services/axiosServices";
import {user_info} from "../../utils/mock/user";
import AppContext from "../../constanst/Context/appContext";
import {UserRole} from "../../constanst";

const Dashboard = () => {
  const {currentUser} = useContext(AppContext);

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

  const loadSpacesByWard = async () => {
    const {data} = await axiosService.get(`/spaces/area?ward=${currentUser?.ward?.id}`);
    return data;
  }

  const loadSpacesByDepartment = async () => {
    const {data} = await axiosService.get(`/spaces`);
    return data;
  }

  useEffect(() => {
    if(currentUser?.role === "DISTRICT_MANAGER"){
      loadSpacesByDistrict(optionsId).then((data) => {
        setMap(data);
      })
    }else if(currentUser?.role === "WARD_MANAGER"){
      loadSpacesByWard().then(data => {
        setMap(data);
      })
    }else
    {
      loadSpacesByDepartment().then(data => {
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
            {currentUser && currentUser.role === UserRole.DISTRICT_MANAGER  && <>
                <span>Chọn phường để xem</span>
                <Select setOptionsId={setOptionsId}  />
              </>
            }
          </div>
        </div>
        <div className="text-white my-3 p-3 rounded">
          <Row>
            {map && <Map geoJSon= {map} optionsId={ optionsId}/> }
          </Row>
        </div>
      </CardBody>
    </Card>
  );
};

export default Dashboard;
