import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Table,
  Row,
  Col,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
  CardLink
} from 'reactstrap';
import React, { useEffect, useState } from 'react'
import { axiosService } from "../../../services/axiosServices";
import { API_URL, fixUrl } from "../../../constanst";
import { Link } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";


const ManageSurface = () => {
  const [surface, setSurface] = React.useState([]) // Khai báo 1 state, ban đầu là mảng rỗng
  const [numOfPage, setNumOfPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [onPageChange, setOnPageChange] = useState(false);

  const handleDataSurface = async () => {
    try {
      const { data } = await axiosService.get(`/surfaces?page=1&limit=100`);
      return data;
    } catch (error) {
      throw (error);
    }
  }
  const removeSurface = async (id) => {
    try {
      const response = await axiosService.delete(`/surfaces/${id}`);
      return response;
    } catch (error) {
      throw (error);
    }
  }

  const handleRemoveSurface = (id) => {
    Swal.fire({
      title: 'Bạn có chắc muốn xoá không?',
      text: "Bạn sẽ không thể hoàn tác lại điều này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      confirmButtonText: 'Xoá',
      cancelButtonText: 'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {
        removeSurface(id).then((response) => {
          const {status} = response;
          if (status === 200) {
            Swal.fire(
                {
                  icon: 'success',
                  title: 'Xoá thành công',
                  confirmButtonText: `OK`,
                }
            )
            let newSurface = surface.filter((item) => item.id !== id);
            setSurface(newSurface);
          }
        })
      }
    })

  }
  useEffect(() => {
    handleDataSurface().then((data) => {
      setSurface(data);
      // setNumOfPage(data.pagination.lastPage);
      // setCurrentPage(data.pagination.currentPage);
    });
  }, [onPageChange]);

  const renderingListSurface = () => {
    return (
      surface.map((item, index) => (
            <tr key={index}>
                <td className="text-center">{item?.height}m X {item?.width}m</td>
                <td className="text-center">{item?.surfaceType.name}</td>
                <td className="text-center">{item?.space?.address}</td>
                <td className="text-center">{moment(item?.expiryDate).subtract(10, 'days').calendar()}</td>
                <td className="text-center">
                    <img alt="img" src={API_URL + fixUrl(item?.imgUrl)} className="rounded-circle" width="35" />
                </td>
                <td className="text-center" style={{ whiteSpace: 'nowrap' }}>
                    <Link to={`/chinh-sua-bang-quang-cao/${item.id}`}>
                        <Button color="primary">Chỉnh sửa</Button> {" "}
                    </Link>
                  
                    <Button color="danger" onClick={() => handleRemoveSurface(item?.id)}>Xoá</Button>
                </td>
            </tr>
        ))
    );
}

  // const renderPagination = () => {
  //   const pagination = [];
  //   const nextPage = currentPage + 1 > numOfPage ? null : currentPage + 1;
  //   const prevPage = currentPage - 1 < 1 ? null : currentPage - 1;
  //   pagination.push(
  //     <PaginationItem >
  //       <PaginationLink
  //         first
  //         onClick={() => setOnPageChange(prevPage)}
  //       />
  //     </PaginationItem>
  //   )
  //   for (let i = 1; i <= numOfPage; i++) {
  //     pagination.push(
  //       <PaginationItem>
  //         <PaginationLink onClick={() => setOnPageChange(i)}>
  //           {i}
  //         </PaginationLink>
  //       </PaginationItem>
  //     )
  //   }
  //   pagination.push(
  //     <PaginationItem>
  //       <PaginationLink
  //         onClick={() => setOnPageChange(nextPage)}
  //         next
  //       />
  //     </PaginationItem>
  //   )
  //   return pagination;
  // }

  return (
    <div>
      <Container>
        <Row>
          <Card>
            <CardBody>
              <CardTitle className="d-flex justify-content-center" tag="h3">Quản lý bảng quảng cáo
              </CardTitle>
              <CardLink href={"/them-bang-quang-cao"}>
                <Button color="success" >Thêm điểm bảng quảng cáo</Button>
              </CardLink>
              <Table>
                <thead>
                  <tr>
                    <th className="text-center">Kích thước (height - width)</th>
                    <th className="text-center">Loại bảng quảng cáo</th>
                    <th className="text-center">Thuộc điểm đặt ở</th>
                    <th className="text-center">Ngày hết hạn</th>
                    <th className="text-center">Hình ảnh</th>
                    <th className="text-center">Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {renderingListSurface()}
                </tbody>
              </Table>
              {/*<Pagination className="d-flex justify-content-center">*/}
              {/*  {renderPagination()}*/}
              {/*</Pagination>*/}

            </CardBody>
          </Card>
        </Row>
      </Container>
    </div>
  )
}

export default ManageSurface
