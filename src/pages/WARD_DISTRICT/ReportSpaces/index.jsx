import { Card, CardBody, Table, CardTitle } from "reactstrap";
import {useContext, useEffect, useState} from "react";
import { axiosService } from "../../../services/axiosServices";
import {
    API_URL,
    fixUrl,
    getReportState,
    getReportStateColor,
    hiddenActionDeleteByReportState,
    hiddenActionEditByReportState
} from "../../../constanst";
import AppContext from "../../../Context/appContext";
import {Link} from "react-router-dom";
import useSweetAlert from "../../../hooks/useSweetAlert";
import Swal from "sweetalert2";
const ReportSpaces = () => {
  const {currentUser: current_user} = useContext(AppContext);
  const [listReportSpaces,setListReportSpaces] = useState([]);
  const handleDeleteReportSpaces = async (reportId) => {
    try {
      const response = await axiosService.get(`reports-space/update-state-report-space-delete/${reportId}`);
      const { data } = response;
      return data;
    } catch (error) {
      console.error('Error deleting report space:', error);
      throw error;
    }
  };

  const showAlert = useSweetAlert();

  const handleButtonClick = (reportId) => {
    Swal.fire({
        title: 'Bạn có muốn xoá?',
        text: 'Bạn có muốn xoá báo cáo này!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Chấp nhận'
    }).then((result) => {
      if(result.isConfirmed) {
        handleDeleteReportSpaces(reportId).then((data) => {
            if(data){
                showAlert({
                icon: "success",
                title: "Xoá thành công",
                });
                let newListReportSpaces = listReportSpaces.map(item => {
                    if(item.id === reportId){
                        item.state = data.state;
                    }
                    return item;
                });
                setListReportSpaces((newListReportSpaces));
            }else{
                showAlert({
                icon: "error",
                title: "Xoá thất bại",
                });
            }
        });
      }
    })
  };

  const loadReportSpacesByWard = async () => {
    const {data} = await axiosService.get(`/reports-space/area?ward=${current_user?.ward?.id}`);
    return data;
  }
  useEffect(() => {
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
                <th>Chức năng</th>
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
                      <img alt="img" src={API_URL + fixUrl(tdata?.imgUrl)} className="rounded-circle" width="35" />
                    </td>
                    <td>
                      <span className={`p-2 text-white bg-${getReportStateColor(tdata?.state)} d-inline-block ms-3`}>{getReportState(tdata?.state)}</span>
                    </td>
                    <td>
                      {hiddenActionEditByReportState(tdata?.state) ? <div></div>
                       : <Link to={`/them-yeu-cau-chinh-sua-dia-diem/${tdata.id}`}>
                            <button className="btn btn-primary btn-sm" >
                              <i className="bi bi-pencil-fill"></i>
                            </button>
                          </Link>
                      }
                        {hiddenActionDeleteByReportState(tdata?.state) ?
                            <button className="btn btn-danger btn-sm ms-2" onClick={() => handleButtonClick(tdata.id)}>
                                <i className="bi bi-trash-fill"></i>
                            </button> : <div></div>
                        }
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
