import React, {useEffect, useState} from 'react';
import {Button, Card, CardBody, CardLink, CardTitle, Container, Table} from "reactstrap";
import {
  API_URL,
  fixUrl,
  getReportState,
  getReportStateColor, hiddenActionDeleteByReportState,
  hiddenActionEditByReportState
} from "../../../../../constanst";
import {Link} from "react-router-dom";
import AppContext from "../../../../../constanst/Context/appContext";
import {axiosService} from "../../../../../services/axiosServices";
const RequestAddSpaces = () => {
  const [listRequestAddSpaces, setListRequestAddSpaces] = useState([]);

  const handleLoadListRequestAddSpaces = async () => {
    const response = await  axiosService.get(`/temp-space`);
    return response;
  }

  useEffect(() => {
    handleLoadListRequestAddSpaces().then((response) => {
      const {data, status} = response;
      if (status === 200) {
        setListRequestAddSpaces(data);
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
                 Danh sách báo cáo địa điểm
               </CardTitle>
               <Link to="/yeu-cau-them-diadiem-quang-cao">
                 <Button color={"success"}>
                   Thêm yêu cầu tạo địa điểm mới
                 </Button>
               </Link>

               <Table className="no-wrap mt-3 align-middle" responsive borderless>
                 <thead>
                 <tr>
                   <th>Lý do</th>
                   <th>Loại hình quảng cáo</th>
                   <th>Địa chỉ điểm đặt</th>
                   <th>Hình ảnh</th>
                   <th>Loại vị trí</th>
                   <th>Trạng thái</th>
                   <th>Chức năng</th>
                 </tr>
                 </thead>
                 <tbody>
                 {listRequestAddSpaces.map((tdata, index) => (
                     <tr key={index} className="border-top">
                       <td>
                         {tdata?.reason}
                       </td>
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
                       <td>
                         <span
                             className={`p-2 text-white bg-${getReportStateColor(tdata?.state)} d-inline-block ms-3`}>{getReportState(tdata?.state)}</span>
                       </td>
                       <td className={"d-flex gap-1"}>
                         {hiddenActionEditByReportState(tdata?.state) ? <div></div>
                             : <Link to={`/them-yeu-cau-chinh-sua-dia-diem/${tdata.id}`}>
                               <button className="btn btn-primary btn-sm">
                                 <i className="bi bi-pencil-fill"></i>
                               </button>
                             </Link>
                         }
                         {hiddenActionDeleteByReportState(tdata?.state) ?
                             <button className="btn btn-danger btn-sm ms-2">
                               <i className="bi bi-trash-fill"></i>
                             </button> : <div></div>
                         }

                         <Link to={`/them-yeu-cau-chinh-sua-dia-diem/${tdata.id}`}>
                           <button className="btn btn-primary btn-sm">
                             <i className="bi bi-eye"></i>
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

export default RequestAddSpaces;