import { Button, Card, CardBody, Table, CardTitle } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosService } from "../../services/axiosServices";
import { API_URL, fixUrl} from "../../constanst";

const ReportSpaces = () => {
  const [listReportSpaces, setListReportSpaces] = useState([]);

  const handleLoadReportSpaces = async () => {
    const response = await axiosService.get("/reports-space");
    const { data } = response;
    return data;
  };

  useEffect(() => {
    handleLoadReportSpaces().then((data) => {
      setListReportSpaces(data);
    });
  }, []);

  console.log(listReportSpaces);
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h4" className="fw-bold">
            Danh sách báo cáo quảng cáo người dân
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
