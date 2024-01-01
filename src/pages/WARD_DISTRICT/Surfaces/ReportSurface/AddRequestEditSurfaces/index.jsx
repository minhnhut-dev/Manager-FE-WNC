import React, {useEffect, useState} from 'react';
import { Col, Row, Container, Card, CardImg, CardBody, CardTitle, CardText, FormGroup, Label, Input, Button } from 'reactstrap';
import {useNavigate, useParams} from "react-router-dom";
import {axiosService} from "../../../../../services/axiosServices";
import {API_URL, fixUrl} from "../../../../../constanst";
import * as Yup from "yup";
import {ErrorMessage, Field, Formik, Form } from "formik";
import useSweetAlert from "../../../../../hooks/useSweetAlert";

const RequestReportSpaces = () => {
    const nagigate = useNavigate();

    const showAlert = useSweetAlert(() => nagigate('/danh-sach-bao-cao-bang-quang-cao'));
    const handleOK = () => {
        showAlert({
            title: "Thành công!",
            text: "Thêm yêu cầu thành công!",
            icon: "success"
        });
    };

    const {surfaceId} = useParams();
    const EditRequestSchema = Yup.object().shape({
        reason: Yup.string()
            .required('Mô tả lý do là bắt buộc'),
        zone: Yup.string()
            .required('Chọn một loại quy hoạch'),
        width: Yup.number().required('Chiều rộng là bắt buộc'),
        height: Yup.number().required('Chiều dài là bắt buộc'),
    });
    const handleLoadSpace = async () => {
        const response = await axiosService.get(`/reports-surface/${surfaceId}`);
        const { data } = response;
        return data;
    }

    const handleRequestEditSurfaces = async (values) => {
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
        formData.append("address", space?.surface?.space?.address);
        formData.append("latitude", space?.surface?.space?.latitude);
        formData.append("longitude", space?.surface?.space.longitude);
        formData.append("height", values?.height);
        formData.append("width", values?.width);
        formData.append("reportSurface", space?.id);
        formData.append("surfaceType", space?.surface?.surfaceType?.id);

        handleRequestEditSurfaces(formData).then((data) => {
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
                        initialValues={{ reason: '', zone: '', imgUrl: null, width: '', height: '' }}
                        validationSchema={EditRequestSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form >
                                <FormGroup>
                                    <Label for="reason" className={"fw-bolder"}>Mô Tả Lý Do chỉnh sửa</Label>
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
                                <Col md={12} className={"p-0"}>
                                        <FormGroup>
                                            <Label for="height">Chiều dài</Label>
                                            <Field as={Input} type="text" name="height" id="height"  />
                                            <ErrorMessage name="height" component="div" className="text-danger" />
                                        </FormGroup>
                                    <FormGroup>
                                        <Label for="width">Chiều rộng</Label>
                                        <Field as={Input} type="text" name="width" id="width"  />
                                        <ErrorMessage name="width" component="div" className="text-danger" />

                                    </FormGroup>

                                </Col>

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
