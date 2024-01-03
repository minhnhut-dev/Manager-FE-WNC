import React, { useEffect, useState } from 'react'
import { axiosService } from "../../../services/axiosServices";
import { Card, CardBody, CardTitle, Container, Table, Row, Col, Button, Pagination, PaginationItem, PaginationLink, Input } from 'reactstrap';

const ManageAllTypesOfForms = () => {
    const [formAdvertising, setFormAdvertising] = React.useState([]) // Khai báo 1 state, ban đầu là mảng rỗng
    const [formReport, setFormReport] = React.useState([]) // Khai báo 1 state, ban đầu là mảng rỗng

    const handleDataFormReport = async () => {
        try {
            const { data } = await axiosService.get(`/form-reports`);
            return data;
        } catch (error) {
            throw (error);
        }
    };

    const handleDataFormAdvertising = async () => {
        try {
            const { data } = await axiosService.get(`/form-advertising`);
            return data;
        } catch (error) {
            throw (error);
        }
    };

    useEffect(() => {
        handleDataFormReport().then((data) => {
            setFormReport(data);
        });
        handleDataFormAdvertising().then((data) => {
            setFormAdvertising(data);
        });
    }, []);

    const renderingListFormReport = () => {
        return (
            formReport.map((item, index) => (
                <tr key={index}>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>
                        {/* Button chức năng cho dòng 1 */}
                        <Button color="primary">Chỉnh sửa</Button>{' '}
                        <Button color="danger">Xoá</Button>
                    </td>
                </tr>
            ))
        );
    }

    const renderingListFormAdvertising = () => {
        return (
            formAdvertising.map((item, index) => (
                <tr key={index}>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>
                        {/* Button chức năng cho dòng 1 */}
                        <Button color="primary">Chỉnh sửa</Button>{' '}
                        <Button color="danger">Xoá</Button>
                    </td>
                </tr>
            ))
        );
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col >
                        <Card>
                            <CardBody>
                                <CardTitle className="d-flex justify-content-center" tag="h3">Danh sách hình thức quảng cáo
                                </CardTitle>
                                <CardTitle>
                                    <Button color="success" className={"btn btn-sm"} >Thêm hình thức quảng cáo</Button>
                                </CardTitle>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tên Quận</th>
                                            <th>Chức năng</th> {/* Column mới chứa các button chức năng */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderingListFormAdvertising()}
                                    </tbody>
                                </Table>


                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle className="d-flex justify-content-center mt-2" tag="h3">
                                    Danh sách loại hình báo cáo
                                </CardTitle>
                                <CardTitle>
                                    <Button color="success" className={"btn btn-sm"}>
                                        Thêm loại hình báo cáo
                                    </Button>
                                </CardTitle>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tên loại hình báo cáo</th>
                                            <th>Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderingListFormReport()}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ManageAllTypesOfForms
