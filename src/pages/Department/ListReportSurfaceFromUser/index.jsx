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

const ListReportSurfaceFromUser = () => {
    const [listReportSurfaces, setListReportSurfaces] = React.useState([]);

    const handleLoadReportSurfacesFromUser = async () => {
        const { data } = await axiosService.get('/request-surface');
        return data;
    }

    const acceptRequestSurfaces = async (reportId) => {
        try {
            return await axiosService.post(`/request-surface/send-email/${reportId}`);
        } catch (error) {
            console.error('Error deleting report surface:', error);
            throw error;
        }
    }

    const declineRequestSurfaces = async (reportId) => {
        try {
            return await axiosService.post(`/request-surface/decline/${reportId}`);
        } catch (error) {
            console.error('Error deleting report surface:', error);
            throw error;
        }
    }

    const handleDeclineRequestSurfaces = (reportId) => {
        Swal.fire({
            title: 'Bạn có muốn từ chối?',
            text: 'Bạn có muốn từ chối yêu cầu này!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Từ chối'
        }).then((result) => {
            if(result.isConfirmed) {
                declineRequestSurfaces(reportId).then((data) => {
                    if(data.status === 200 ||  data.status === 201){
                        Swal.fire({
                            icon: "success",
                            title: "Từ chối thành công",
                        });
                        let newListReportSurface = listReportSurfaces.map(item => {
                            if(item.id === reportId){
                                item.state = 'Declined';
                            }
                            return item;
                        });
                        setListReportSurfaces((newListReportSurface));
                    }else{
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

    const handleAcceptReportSurfaces = (reportId) => {
        Swal.fire({
               title: 'Bạn có muốn xác nhận?',
               text: 'Bạn có muốn chấp nhận yêu cầu này!',
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Chấp nhận'
           }).then((result) => {
               if(result.isConfirmed) {
                acceptRequestSurfaces(reportId).then((data) => {
                       if(data.status === 200 ||  data.status === 201){
                           Swal.fire({
                               icon: "success",
                               title: "Xác nhận thành công",
                           });
                           let newListReportSurfaces = listReportSurfaces.map(item => {
                               if(item.id === reportId){
                                   item.state = 'Accepted';
                                   console.log("item: ", item)
                               }
                               return item;
                           });
                           setListReportSurfaces(newListReportSurfaces);
                       }else{
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
        handleLoadReportSurfacesFromUser().then((data) => {
            setListReportSurfaces(data);
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
                            Danh sách báo cáo bảng quảng cáo
                        </CardTitle>
                        <Table className="no-wrap mt-3 align-middle" responsive borderless>
                            <thead>
                                <tr>
                                    <th>Thông tin người báo cáo</th>
                                    <th>Lý do</th>
                                    <th>Loại hình báo cáo</th>
                                    <th>Kích thước (height - width)</th>
                                    <th>Loại bảng quảng cáo</th>
                                    <th>Hình ảnh</th>
                                    <th>Trạng thái</th>
                                    <th>Xét duyệt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listReportSurfaces && listReportSurfaces.map((tdata, index) => (
                                    <tr key={index} className="border-top">
                                        <td>
                                            <div className="d-flex align-items-center p-2">
                                                <div className="ms-3">
                                                    <h6 className="mb-0">{tdata?.reportSurface?.name}</h6>
                                                    <span className="text-muted">{tdata?.reportSurface?.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{tdata?.reason}</td>
                                        <td>{tdata?.reportSurface?.formReport?.name}</td>

                                        <td>{tdata?.height}m X {tdata?.width}m</td>
                                        <td>{tdata?.surfaceType.name}</td>
                                        <td>
                                            <img alt="img" src={API_URL + fixUrl(tdata?.imgUrl)} className="rounded-circle" width="35" />
                                        </td>
                                        <td>
                                            <span
                                                className={`p-2 text-white bg-${getRequestStateColor(tdata?.state)} d-inline-block ms-3`}>{getRequestStateName(tdata?.state)}</span>
                                        </td>
                                        <td className={"d-flex gap-1 mt-2"}>
                                            {hiidenActionAcceptByRequestState(tdata?.state) ? <div></div> :
                                                <button className="btn btn-success btn-sm" onClick={() => handleAcceptReportSurfaces(tdata?.id)}><i className='bi bi-check'></i></button>
                                            }
                                            {hiddenActionDeleteByReportState(tdata?.state) ? <div></div> :
                                                <button className="btn btn-danger btn-sm" onClick={() => handleDeclineRequestSurfaces(tdata?.id)}><i className='bi bi-x'></i></button>
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

export default ListReportSurfaceFromUser
