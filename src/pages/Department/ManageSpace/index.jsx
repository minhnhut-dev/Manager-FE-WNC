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
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

const ManageSpace = () => {
    const [space, setSpace] = React.useState([]) // Khai báo 1 state, ban đầu là mảng rỗng
    const [numOfPage, setNumOfPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [onPageChange, setOnPageChange] = useState(false);

    const handleDataSpace = async () => {
        try {
            const { data } = await axiosService.get(`/spaces?page=${onPageChange}&limit=10`);
            return data;
        } catch (error) {
            throw (error);
        }
    }

    const removeSpaces= async (spacesId) => {
      const response = await axiosService.delete(`/spaces/${spacesId}`);
      return response;
    }

    const handleRemoveSpaces = (spacesId) => {
      Swal.fire({
        title: 'Bạn có muốn xoá?',
        text: 'Bạn có muốn xoá không!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xoá'
      }).then((result) => {
        if(result.isConfirmed) {
          removeSpaces(spacesId).then((data) => {
            if(data.status === 200 ||  data.status === 201){
              Swal.fire({
                icon: "success",
                title: "Xoá thành công",
              });
              let newListSpace = space.filter(item => item.id !== spacesId);
              setSpace(newListSpace);
            }
          }).catch((error) => {
            console.log(error);
          });
        }
      })
    }
    useEffect(() => {
        handleDataSpace().then((data) => {
            setSpace(data.data);
            setNumOfPage(data.pagination.lastPage);
            setCurrentPage(data.pagination.currentPage);
        });
    }, [onPageChange]);

    const renderingListSpace = () => {
        return (
            space.map((item, index) => (
                <tr key={index}>
                    {/*<th scope="row">{item.id}</th>*/}
                    <td className="text-center">{item.address}</td>
                    <td className="text-center">{item.ward.name}</td>
                    <td className="text-center">{item.district.name}</td>
                    <td className="text-center">{item.formAdvertising.name}</td>
                    <td className="text-center">{item.locationTypes.name}</td>
                    <td className="text-center">
                        <img alt="img" src={API_URL + fixUrl(item?.imgUrl)} className="rounded-circle" width="35" />
                    </td>
                    <td className="text-center">{item.zone}</td>
                    <td className="text-center" style={{ whiteSpace: 'nowrap' }}>
                        <Link to={`/chinh-sua-diem-dat-quang-cao/${item.id}`}>
                            <Button color="primary">Chỉnh sửa</Button> {" "}
                        </Link>{" "}
                        <Button color="danger" onClick={() => handleRemoveSpaces(item?.id)}>Xoá</Button>
                    </td>
                </tr>
            ))
        );
    }

    const renderPagination = () => {
        const pagination = [];
        const nextPage = currentPage + 1 > numOfPage ? null : currentPage + 1;
        const prevPage = currentPage - 1 < 1 ? null : currentPage - 1;
        pagination.push(
            <PaginationItem >
                <PaginationLink
                    first
                    onClick={() => setOnPageChange(prevPage)}
                />
            </PaginationItem>
        )
        for (let i = 1; i <= numOfPage; i++) {
            pagination.push(
                <PaginationItem>
                    <PaginationLink onClick={() => setOnPageChange(i)}>
                        {i}
                    </PaginationLink>
                </PaginationItem>
            )
        }
        pagination.push(
            <PaginationItem>
                <PaginationLink
                    onClick={() => setOnPageChange(nextPage)}
                    next
                />
            </PaginationItem>
        )
        return pagination;
    }

    return (
        <div>
            <Container>
                <Row>
                    <Card>
                        <CardBody>
                            <CardTitle className="d-flex justify-content-center" tag="h3">Quản lý điểm đặt quảng cáo
                            </CardTitle>
                          <CardLink href={"/them-dia-diem"}>
                            <Button color="success" >Thêm điểm đặt quảng cáo</Button>
                          </CardLink>
                            <Table>
                                <thead>
                                    <tr>
                                        {/*<th className="text-center">#</th>*/}
                                        <th className="text-center">Địa chỉ</th>
                                        <th className="text-center">Phường</th>
                                        <th className="text-center">Quận</th>
                                        <th className="text-center">Hình thức quảng cáo</th>
                                        <th className="text-center">Loại vị trí</th>
                                        <th className="text-center">Hình ảnh</th>
                                        <th className="text-center">Zone</th>
                                        <th className="text-center">Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderingListSpace()}
                                </tbody>
                            </Table>
                            <Pagination className="d-flex justify-content-center">
                                {renderPagination()}
                            </Pagination>

                        </CardBody>
                    </Card>
                </Row>
            </Container>
        </div>
    )
}

export default ManageSpace
