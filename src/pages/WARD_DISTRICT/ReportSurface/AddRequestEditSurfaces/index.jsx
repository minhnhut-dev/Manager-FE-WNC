import React, {useEffect, useState} from 'react';
import { Col, Row, Container, Card, CardImg, CardBody, CardTitle, CardText, FormGroup, Label, Input, Button } from 'reactstrap';
import {useNavigate, useParams} from "react-router-dom";
import {axiosService} from "../../../../services/axiosServices";
import {API_URL, fixUrl} from "../../../../constanst";
import * as Yup from "yup";
import {ErrorMessage, Field, Formik, Form } from "formik";
import useSweetAlert from "../../../../hooks/useSweetAlert";

const RequestReportSpaces = () => {
    const nagigate = useNavigate();

    const showAlert = useSweetAlert(() => nagigate('/danh-sach-bao-cao-dia-diem'));
    const handleOK = () => {
        showAlert({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success"
        });
    };

    const {surfaceId} = useParams();
    const EditRequestSchema = Yup.object().shape({
        reason: Yup.string()
            .required('Mô tả lý do là bắt buộc'),
        zone: Yup.string()
            .required('Chọn một loại quy hoạch'),
    });
    const handleLoadSpace = async () => {
        const response = await axiosService.get(`/reports-surface/${surfaceId}`);
        const { data } = response;
        return data;
    }

    const handleRequestEditSpace = async (values) => {
        const response = await axiosService.post("/request-surface", values, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Accept": "multipart/form-data",
            }
        });
        const { data } = response;
        return data;
    }

    const handleSubmit = (values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append("reason", values?.reason);
        formData.append("zone", values?.zone);
        formData.append("imgUrl", values?.imgUrl);
        formData.append("address", space?.surface?.address);
        formData.append("latitude", space?.surface?.latitude);
        formData.append("longitude", space?.surface?.longitude);
        formData.append("formAdvertising", space?.surface?.formAdvertising?.id);
        formData.append("locationTypes", space?.surface?.locationTypes?.id);
        formData.append("ward", space?.surface?.ward?.id);
        formData.append("district", space?.surface?.district?.id);
        formData.append("formReport", space?.formReport?.id);
        formData.append("space", space?.surface?.id);
        formData.append("reportSpace", surfaceId)
        // Xử lý dữ liệu form tại đây
        handleRequestEditSpace(formData).then((data) => {
            handleOK()
        })
        setSubmitting(false);
    };

    const [space, setSpace] = useState(null);

    useEffect(() => {
        handleLoadSpace().then((data) => {
            setSpace(data);
        })
    }, []);

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Card>
                        <CardTitle tag={"h5"} className="fw-bolder p-2" >Thông tin người báo cáo </CardTitle>
                        <CardImg top className={'w-50 p-2'} src={space && API_URL + fixUrl(space?.imgUrl)} alt="Card image cap" />
                        <CardBody>
                            <CardText>Tên người gửi: {space?.name}</CardText>
                            <CardText>Điện thoai: {space?.phone}</CardText>
                            <CardText>Email: {space?.email}</CardText>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardImg top className={'w-50 p-2'} src={API_URL + fixUrl(space?.surface?.imgUrl)} alt="Card image cap" />
                        <CardBody>
                            <CardText>Loại địa điểm: {space?.surface.surfaceType?.name}</CardText>
                            <CardText>Hình thức: {space?.formReport?.name}</CardText>
                            <CardText>Địa chỉ: {space?.surface?.space.address}</CardText>
                            <CardText>Lý do: {space?.content} </CardText>
                        </CardBody>
                    </Card>
                </Col>

                <Col md={8}>
                    <Formik
                        initialValues={{ reason: '', zone: '', imgUrl: null }}
                        validationSchema={EditRequestSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form >
                                <FormGroup>
                                    <Label for="reason">Mô Tả Lý Do</Label>
                                    <Field as={Input} type="textarea" name="reason" id="reason" placeholder="Nhập mô tả lý do"/>
                                    <ErrorMessage name="reason" component="div" className="text-danger" />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="zone">Quy Hoạch</Label>
                                    <Field as={Input} type="select" name="zone" id="zone">
                                        <option value="">Chọn loại quy hoạch</option>
                                        <option value="Unplanned">Chưa quy hoạch</option>
                                        <option value="Planned">Đã quy hoạch</option>
                                    </Field>
                                    <ErrorMessage name="zone" component="div" className="text-danger" />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="imgUrl">Hình Ảnh</Label>
                                    <input type="file" name="imgUrl" id="imgUrl" onChange={(event) => {
                                        setFieldValue("imgUrl", event.currentTarget.files[0]);
                                    }}/>
                                </FormGroup>
                                <Button type="submit" color="primary" disabled={isSubmitting}>Thêm Yêu Cầu Chỉnh Sửa</Button>
                            </Form>
                        )}
                    </Formik>
                </Col>

            </Row>
        </Container>
    );
};

export default RequestReportSpaces;
