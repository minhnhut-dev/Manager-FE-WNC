import React, {useEffect} from 'react';
import {Card, CardBody, CardTitle, Container, Table} from "reactstrap";
import {
    API_URL,
    fixUrl,
    getRequestStateColor,
    getRequestStateName,
    hiddenActionDeleteByReportState,
    hiidenActionAcceptByRequestState
} from "../../../constanst";
import {axiosService} from "../../../services/axiosServices";
import Swal from "sweetalert2";

const ListReportSpacesByUser = () => {
    const [listReportSpaces, setListReportSpaces] = React.useState([]);
    const handleLoadReportSpacesFromUser = async () => {
        const {data} = await axiosService.get('/request-space');
        return data;
    }

    const acceptRequestSpaces = async (reportId) => {
        try {
            return await axiosService.post(`/request-space/send-email/${reportId}`);
        } catch (error) {
            console.error('Error deleting report space:', error);
            throw error;
        }
    }

    const declineRequestSpaces = async (reportId) => {
        try {
            return await axiosService.post(`/request-space/decline/${reportId}`);
        } catch (error) {
            console.error('Error deleting report space:', error);
            throw error;
        }
    }

    const handleDeclineRequestSpaces = (reportId) => {
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
                declineRequestSpaces(reportId).then((data) => {
                    if(data.status === 200 ||  data.status === 201){
                        Swal.fire({
                            icon: "success",
                            title: "Từ chối thành công",
                        });
                        let newListReportSpaces = listReportSpaces.map(item => {
                            if(item.id === reportId){
                                item.state = 'Declined';
                            }
                            return item;
                        });
                        setListReportSpaces((newListReportSpaces));
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
            if(result.isConfirmed) {
                acceptRequestSpaces(reportId).then((data) => {
                    if(data.status === 200 ||  data.status === 201){
                        Swal.fire({
                            icon: "success",
                            title: "Xác nhận thành công",
                        });
                        let newListReportSpaces = listReportSpaces.map(item => {
                            if(item.id === reportId){
                                item.state = 'Accepted';
                                console.log("item: ", item)
                            }
                            return item;
                        });
                        setListReportSpaces(newListReportSpaces);
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
        handleLoadReportSpacesFromUser().then((data) => {
            setListReportSpaces(data);
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
                               <th>Xét duyệt</th>
                           </tr>
                           </thead>
                           <tbody>
                           {listReportSpaces && listReportSpaces.map((tdata, index) => (
                               <tr key={index} className="border-top">
                                   <td>
                                       <div className="d-flex align-items-center p-2">
                                           <div className="ms-3">
                                               <h6 className="mb-0">{tdata.reportSpace.name}</h6>
                                               <span className="text-muted">{tdata.reportSpace.email}</span>
                                           </div>
                                       </div>
                                   </td>
                                   <td>{tdata?.reason}</td>
                                   <td>{tdata?.reportSpace.formReport.name}</td>

                                   <td>{tdata?.reportSpace.space.address}</td>
                                   <td>
                                       <img alt="img" src={API_URL +  fixUrl(tdata?.imgUrl)} className="rounded-circle" width="35" />
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
                                           <button className="btn btn-danger btn-sm" onClick={() => handleDeclineRequestSpaces(tdata?.id)}><i className='bi bi-x'></i></button>
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
    );
};

export default ListReportSpacesByUser;