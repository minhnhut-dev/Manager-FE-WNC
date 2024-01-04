import React, { useEffect } from 'react';
import { Card, CardBody, CardTitle, Container, Table } from "reactstrap";
import {
  API_URL,
  fixUrl,
  getRequestStateColor,
  getRequestStateName,
  hiddenActionDeleteByReportState,
  hiidenActionAcceptByRequestState
} from "../../../constanst";
import { axiosService } from "../../../services/axiosServices";
import Swal from "sweetalert2";
const ApprovalAndLicensingSpace = () => {
  const [listTempSpaces, setListTempSpaces] = React.useState([]);
  const handleLoadTempSpace = async () => {
    const { data } = await axiosService.get('/temp-space');
    return data;
  }

  const acceptTempSpace = async (reportId) => {
    try {
      return await axiosService.get(`/temp-space/accept/${reportId}`);
    } catch (error) {
      console.error('Error deleting temp space:', error);
      throw error;
    }
  }

  const declineTempSpace = async (reportId) => {
    try {
      return await axiosService.get(`/temp-space/declined/${reportId}`);
    } catch (error) {
      console.error('Error deleting temp space:', error);
      throw error;
    }
  }

  const handleDeclineTempSpace = (reportId) => {
    Swal.fire({
      title: 'Bạn có muốn từ chối?',
      text: 'Bạn có muốn từ chối yêu cầu này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Từ chối'
    }).then((result) => {
      if (result.isConfirmed) {
        declineTempSpace(reportId).then((data) => {
          if (data.status === 200 || data.status === 201) {
            Swal.fire({
              icon: "success",
              title: "Từ chối thành công",
            });
            let newListTempSpaces = listTempSpaces.map(item => {
              if (item.id === reportId) {
                item.state = 'Declined';
              }
              return item;
            });
            setListTempSpaces((newListTempSpaces));
          } else {
            Swal.fire({
              icon: "error",
              title: "Từ chối thất bại",
            });
          }
        }).catch((err) => {
          console.log(err);
        })
      }
    })
  }

  const handleAcceptReportSpaces = (reportId) => {
    Swal.fire({
      title: 'Bạn có muốn xác nhận?',
      text: 'Bạn có muốn chấp nhận yêu cầu này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Chấp nhận'
    }).then((result) => {
      if (result.isConfirmed) {
        acceptTempSpace(reportId).then((data) => {
          if (data.status === 200 || data.status === 201) {
            Swal.fire({
              icon: "success",
              title: "Xác nhận thành công",
            });
            let newListTempSpaces = listTempSpaces.map(item => {
              if (item.id === reportId) {
                item.state = 'Accepted';
                console.log("item: ", item)
              }
              return item;
            });
            setListTempSpaces(newListTempSpaces);
          } else {
            Swal.fire({
              icon: "error",
              title: "Xác nhận thất bại",
            });
          }
        }).catch((err) => {
          console.log(err);
        })
      }
    })

  }

  useEffect(() => {
    handleLoadTempSpace().then((data) => {
      setListTempSpaces(data);
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <>
      <Container>
        <Card>
          <CardBody>
            <CardTitle tag="h4" className="fw-bold">
              Danh sách yêu cầu cấp phép điểm đặt quảng cáo
            </CardTitle>
            <Table className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>Nhận yêu cầu từ</th>
                  <th>Lý do</th>
                  <th>Địa chỉ điểm đặt</th>
                  <th>Hình thức quảng cáo</th>
                  <th>Loại vị trí</th>
                  <th>Hình ảnh</th>
                  <th>Trạng thái</th>
                  <th>Xét duyệt</th>
                </tr>
              </thead>
              <tbody>
                {listTempSpaces && listTempSpaces.map((tdata, index) => (
                  <tr key={index} className="border-top">
                    <td>
                      <div className="d-flex align-items-center p-2">
                        <div className="ms-3">
                          <h6 className="mb-0">{tdata.ward.name}</h6>
                          <span className="text-muted">{tdata.district.name}</span>
                        </div>
                      </div>
                    </td>
                    <td>{tdata?.reason}</td>
                    <td>{tdata?.address}</td>

                    <td>{tdata?.formAdvertising.name}</td>
                    <td>{tdata?.locationTypes.name}</td>

                    <td>
                      <img alt="img" src={API_URL + fixUrl(tdata?.imgUrl)} className="rounded-circle" width="35" />
                    </td>
                    <td>
                      <span
                        className={`p-2 text-white bg-${getRequestStateColor(tdata?.state)} d-inline-block ms-3`}>{getRequestStateName(tdata?.state)}</span>
                    </td>
                    <td className={"d-flex gap-1 mt-2"}>
                      {hiidenActionAcceptByRequestState(tdata?.state) ? <div></div> :
                        <button className="btn btn-success btn-sm" onClick={() => handleAcceptReportSpaces(tdata?.id)}><i className='bi bi-check'></i></button>
                      }
                      {hiddenActionDeleteByReportState(tdata?.state) ? <div></div> :
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeclineTempSpace(tdata?.id)}><i className='bi bi-x'></i></button>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Container>
    </>
  )
}

export default ApprovalAndLicensingSpace
