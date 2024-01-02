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
import {
  getReportAddSpaces,
  getReportAddSpacesColor,
  hiddenActionDeleteByReportAddSpaces
} from "../../../../../constanst/WARD_DISTRICT";
import Swal from "sweetalert2";
const RequestAddSpaces = () => {
  const [listRequestAddSpaces, setListRequestAddSpaces] = useState([]);

  const handleLoadListRequestAddSpaces = async () => {
    const response = await  axiosService.get(`/temp-space`);
    return response;
  }

  const deleteRequestAddSpaces = async (id) => {
    const response = await axiosService.delete(`/temp-space/${id}`);
   return response;

  }

  const handleDeleteRequestAddSpaces = (id) => {

      Swal.fire({
        icon: 'question',
        title: 'Bạn có muốn xoá yêu cầu này không?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không',
      }).then((result) => {
        if(result.isConfirmed) {
          deleteRequestAddSpaces(id).then((response) => {
            const {status} = response;
            if (status === 200 || status === 201) {
              Swal.fire({
                icon: 'success',
                title: 'Xoá yêu cầu thành công',
                showConfirmButton: true,
                confirmButtonText: 'OK',
              });
                let newListRequestAddSpaces = listRequestAddSpaces.filter((item) => item.id !== id);
                setListRequestAddSpaces(newListRequestAddSpaces);
            }
          })
        }
      });
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
                 Danh sách yêu cầu tạo địa điểm
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
                             className={`p-2 text-white bg-${getReportAddSpacesColor(tdata?.state)} d-inline-block ms-3`}>{getReportAddSpaces(tdata?.state)}</span>
                       </td>
                       <td className={"d-flex gap-1"}>
                         {hiddenActionDeleteByReportAddSpaces(tdata?.state) ? <div></div>
                            : <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDeleteRequestAddSpaces(tdata?.id)}>
                               <i className="bi bi-trash-fill"></i>
                             </button>
                         }
                         <Link to={`/them-yeu-cau-chinh-sua-dia-diem/${tdata.id}`}>
                           <button className="btn btn-primary btn-sm">
                                Xem các bảng quảng cáo
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