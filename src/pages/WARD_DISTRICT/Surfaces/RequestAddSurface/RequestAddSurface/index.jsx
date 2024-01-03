import React, {useRef} from 'react';
import {Card, Container, FormGroup, Label, Input, Button, Col} from "reactstrap";
import * as Yup from 'yup';
import {ErrorMessage, Field, Formik, Form} from 'formik';
import {useNavigate, useParams} from "react-router-dom";
import {axiosService} from "../../../../../services/axiosServices";
import Swal from "sweetalert2";

const RequestAddSurfaces = () => {
  const {spaceId} = useParams();

  const formikRef = useRef();
  const formInput =useRef();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    reason: Yup.string().required('Lý do là bắt buộc'),
    imgUrl: Yup.mixed().required('Hình ảnh là bắt buộc'),
    height: Yup.number().required('Chiều dài là bắt buộc'),
    widght: Yup.number().required('Chiều rộng là bắt buộc'),
    expiryDate: Yup.date().required('Ngày hết hạn là bắt buộc'),
    surfaceType: Yup.string().required('Loại bảng quảng cáo là bắt buộc'),
  });

  const handleRequestAddSurfaces = async (params) => {
    const response = await axiosService.post("/temp-surface/condition-create", params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log("response", response)
    return response;
  }
  const handleSubmit = (values, {setSubmitting}) => {
    const params = {
      reason: values.reason,
      imgUrl: values.imgUrl,
      expiredDate: values.expiryDate,
      height: values.height,
      width: values.widght,
      surfaceType: values.surfaceType,
      space: spaceId
    }

    const formData = new FormData();
    formData.append('reason', params.reason);
    formData.append('imgUrl', params.imgUrl);
    formData.append("expiredDate", params.expiredDate);
    formData.append("height", params.height);
    formData.append("width", params.width);
    formData.append("surfaceType", params.surfaceType);
    formData.append("space", params.space);

    handleRequestAddSurfaces(formData).then((response) => {
      const {status} = response;
      if (status === 200 || status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Yêu cầu thêm địa điểm mới thành công',
          showConfirmButton: true,
        }).then((result) => {
          if(result.isConfirmed) {
            navigate(-1);
          }
        })
      }
    })
  }

  return (
      <>
        <Container>
          <h3 className={"fw-bolder"}>Tạo yêu cầu thêm địa điểm mới</h3>
          <Card className={"p-3"} innerRef={formInput}>
            <Col md={12}>
              <Formik
                  initialValues={{ reason: '', imgUrl: null, height: '', widght: '', expiryDate: '', surfaceType: ''}}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  innerRef={formikRef}
              >
                {({ isSubmitting, setFieldValue }) => (
                    <Form >
                      <FormGroup>
                        <Label for="reason">Mô Tả Lý Do</Label>
                        <Field as={Input} type="textarea" name="reason" id="reason" placeholder="Nhập mô tả lý do"/>
                        <ErrorMessage name="reason" component="div" className="text-danger" />
                      </FormGroup>

                      <FormGroup>
                        <Label for="imgUrl">Hình Ảnh</Label>
                        <input type="file" name="imgUrl" id="imgUrl" onChange={(event) => {
                          setFieldValue("imgUrl", event.currentTarget.files[0]);
                        }} required={true} className={"form-control"}/>
                      </FormGroup>

                      <FormGroup>
                        <Label for="height">Chiều dài</Label>
                        <Field as={Input} type="text" name="height" id="height" placeholder="Nhập chiều dài" />
                        <ErrorMessage name="height" component="div" className="text-danger" />
                      </FormGroup>
                      <FormGroup>
                        <Label for="widght">Chiều rộng</Label>
                        <Field as={Input} type="text" name="widght" id="widght" placeholder="Nhập chiều rộng" />
                        <ErrorMessage name="widght" component="div" className="text-danger" />
                      </FormGroup>
                      <FormGroup>
                        <Label for="expiryDate">Ngày hết hạn</Label>
                        <Field as={Input} type="date" name="expiryDate" id="expiryDate" />
                        <ErrorMessage name="expiryDate" component="div" className="text-danger" />
                      </FormGroup>
                      <FormGroup>
                        <Label for="surfaceType">Loại bảng quảng cáo</Label>
                        <Field as={Input} type="select" name="surfaceType" id="surfaceType" >
                          <option value={""}>Loại bảng quảng cáo</option>
                          <option value="1">Trụ bảng hiflex</option>
                          <option value="2">Trụ màn hình điện tử LED</option>
                          <option value="3">Trụ hộp đèn</option>
                          <option value="4">Bảng hiflex ốp tường</option>
                          <option value="5">Màn hình điện tử ốp tường</option>
                          <option value="6">Trụ treo băng rôn dọc</option>
                          <option value="7">Trụ treo băng rôn ngang</option>
                          <option value="8">Trụ/Cụm pano</option>
                          <option value="9">Cổng chào</option>
                          <option value="10">Trung tâm thương mại</option>
                        </Field>
                        <ErrorMessage name="surfaceType" component="div" className="text-danger" />
                      </FormGroup>
                      <Button type="submit" color="primary" disabled={isSubmitting}>Thêm yêu cầu</Button>
                    </Form>
                )}
              </Formik>
            </Col>
          </Card>
        </Container>
      </>
  );
};

export default RequestAddSurfaces;