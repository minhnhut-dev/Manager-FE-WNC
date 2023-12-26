import { Card, CardBody, Table, CardTitle } from "reactstrap";
import { useEffect, useState } from "react";
import { axiosService } from "../../services/axiosServices";
import { API_URL, fixUrl} from "../../constanst";

const ReportSpaces = ({current_user}) => {
  const [listReportSpaces, setListReportSpaces] = useState([]);

  // const handleLoadReportSpaces = async () => {
  //   const response = await axiosService.get("/reports-space");
  //   const { data } = response;
  //   return data;
  // };
  const loadReportSpacesByWard = async () => {
    const {data} = await axiosService.get(`/reports-space/area?ward=${current_user?.ward?.id}`);
    return data;
  }
  useEffect(() => {
    // handleLoadReportSpaces().then((data) => {
    //   setListReportSpaces(data);
    // });

    if(current_user?.role === "DISTRICT_MANAGER"){
      // loadSpacesByDistrict(optionsId).then((data) => {
      //   setMap(data);
      // })
    }else if(current_user?.role === "WARD_MANAGER"){
      loadReportSpacesByWard().then(data => {
        setListReportSpaces(data);
      })
    }
  }, []);

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h4" className="fw-bold">
            Danh sách báo cáo địa điểm
          </CardTitle>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Thông tin người báo cáo</th>
                <th>Lý do</th>
                <th>Loại hình quảng cáo</th>
                <th>Địa chỉ quảng cáo</th>
                <th>Hình ảnh</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {listReportSpaces.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.name}</h6>
                        <span className="text-muted">{tdata.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata?.content}</td>
                  <td>{tdata?.formReport?.name}</td>
                
                  <td>{tdata?.space?.address}</td>
                  <td>
                    <img alt="img" src={API_URL +  fixUrl(tdata?.imgUrl)} className="rounded-circle" width="35" />
                  </td>
                  <td>
                    {tdata.state === "Pending" ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                    ) : tdata.state === "holt" ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ReportSpaces;
