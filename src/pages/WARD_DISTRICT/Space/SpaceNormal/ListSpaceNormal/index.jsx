import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, CardBody, CardLink, CardTitle, Container, Table} from "reactstrap";
import {
  API_URL,
  fixUrl,
  getReportState,
  getReportStateColor, hiddenActionDeleteByReportState,
  hiddenActionEditByReportState
} from "../../../../../constanst";
import {Link} from "react-router-dom";
import {axiosService} from "../../../../../services/axiosServices";
import Swal from "sweetalert2";
import appContext from "../../../../../constanst/Context/appContext";
const ListSpaceNormal = () => {
  const {currentUser} = useContext(appContext)
  const [listSpaces, setListSpaces] = useState([]);

  const handleLoadListSpaces = async () => {
    const response = await  axiosService.get(`/spaces/area?${detectQueryByRole()}&limit=100`);
    return response;
  }

  function detectQueryByRole(){
    if(currentUser?.role === 'WARD_MANAGER'){
      return `ward=${currentUser?.ward?.id}`

    }else if (currentUser.role === 'DISTRICT_MANAGER') {
      return `district=${currentUser?.district.id}`
    }else {
      return null;
    }
  }

  useEffect(() => {
    handleLoadListSpaces().then((response) => {
      const {data, status} = response;
      if (status === 200) {
        setListSpaces(data);
      }
    })
  }, []);

  return (
      <>
        <Container>
          <div>
            <Card>
              <CardBody>
                <CardTitle tag="h4" className="fw-bold">
                  Danh sách địa điểm
                </CardTitle>
                <Table className="no-wrap mt-3 align-middle" responsive borderless>
                  <thead>
                  <tr>
                    <th>Loại hình quảng cáo</th>
                    <th>Địa chỉ điểm đặt</th>
                    <th>Hình ảnh</th>
                    <th>Loại vị trí</th>
                    <th>Chức năng</th>
                  </tr>
                  </thead>
                  <tbody>
                  {listSpaces.map((tdata, index) => (
                      <tr key={index} className="border-top">
                        <td>
                          <div className="d-flex align-items-center p-2">
                            <div className="ms-3">
                              <h6 className="mb-0">{tdata?.formAdvertising.name}</h6>
                            </div>
                          </div>
                        </td>
                        <td>{tdata?.address}</td>
                        <td>
                          <img alt="img" src={API_URL + fixUrl(tdata?.imgUrl)} className="rounded-circle" width="35"/>
                        </td>
                        <td>
                          {tdata?.locationTypes?.name}
                        </td>

                        <td className={"d-flex gap-1"}>
                          <Link to={`/yeu-cau-chinh-sua-dia-diem-quang-cao/${tdata?.id}`}>
                            <button className="btn btn-primary btn-sm">
                              <i className="bi bi-pencil-fill"></i>
                            </button>
                          </Link>
                          <Link to={`/danh-sach-yeu-cau-them-bang-quang-cao/${tdata?.id}`}>
                            <button className="btn btn-primary btn-sm">
                                 Xem bảng quảng cáo
                            </button>
                          </Link>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </Container>
      </>
  );
};

export default ListSpaceNormal;