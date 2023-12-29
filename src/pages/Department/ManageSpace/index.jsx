import { Card, CardBody, CardTitle, Container, Table, Row, Col, Button, Pagination, PaginationItem, PaginationLink, Input } from 'reactstrap';
import React, { useEffect, useState } from 'react'
import { axiosService } from "../../../services/axiosServices";
import { API_URL, fixUrl } from "../../../constanst";
import {Link} from "react-router-dom";

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
                    <th scope="row">{item.id}</th>
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
                            <Button color="primary">Edit</Button>{' '}
                        </Link>
                        <Button color="danger">Delete</Button>
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
                                <Button color="success" >Click Me</Button>
                            </CardTitle>
                            {/* <div className="d-flex">
  <Input id="input1" name="input1" type="select" placeholder="Input 1" className="mr-2" style={{ marginRight: '10px' }} />
  <Input id="input2" name="input2" type="select" placeholder="Input 2" />
</div> */}



                            <Table>
                                <thead>
                                    <tr>
                                        <th className="text-center">#</th>
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
