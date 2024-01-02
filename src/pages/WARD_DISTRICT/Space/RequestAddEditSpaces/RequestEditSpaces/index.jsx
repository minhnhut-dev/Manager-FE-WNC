import React, {useEffect, useRef} from 'react';
import {Card, Container, FormGroup, Label, Input, Button, CardSubtitle, Col} from "reactstrap";
import * as Yup from 'yup';
import {ErrorMessage, Field, Formik, Form} from 'formik';
import Map from "../../Component/Map";
import {useNavigate, useParams} from "react-router-dom";
import {axiosService} from "../../../../../services/axiosServices";
import Swal from "sweetalert2";

const RequestEditSpaces = () => {
  const {requestSpaceId} = useParams();
  const formikRef = useRef();
  const formInput =useRef();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    reason: Yup.string().required('Lý do là bắt buộc'),
    latitude: Yup.number().required('Vĩ độ là bắt buộc'),
    longitude: Yup.number().required('Kinh độ là bắt buộc'),
    address: Yup.string().required('Địa chỉ là bắt buộc'),
    zone: Yup.string().required('Quy hoạch là bắt buộc'),
    imgUrl: Yup.mixed().required('Hình ảnh là bắt buộc'),
  });

  const handleSetValuesLatLngFromMap = (values) => {
    formikRef.current.setFieldValue('latitude', values.lat);
    formikRef.current.setFieldValue('longitude', values.lng);
    formikRef.current.setFieldValue('address', values.address);
    formikRef.current.setFieldValue('ward', values.ward);
    formikRef.current.setFieldValue('district', values.district);
  }
  const handleRequestEditSpaces = (params) => {
    const response = axiosService.post("/temp-space/condition-update", params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  }
  const handleSubmit = async (values, {setSubmitting}) => {
    const params = {
      reason: values.reason,
      zone: values.zone,
      latitude: values.latitude,
      longitude: values.longitude,
      address: values.address,
      imgUrl: values.imgUrl,
      formAdvertising: 1,
      locationTypes: 1,
      ward: values?.ward,
      district: values?.district
    }
    const formData = new FormData();
    formData.append('reason', params.reason);
    formData.append('zone', params.zone);
    formData.append('latitude', params.latitude);
    formData.append('longitude', params.longitude);
    formData.append('address', params.address);
    formData.append('imgUrl', params.imgUrl);
    formData.append('formAdvertising', params.formAdvertising);
    formData.append('locationTypes', params.locationTypes);
    formData.append('ward', params.ward);
    formData.append('district', params.district);

    handleRequestEditSpaces(formData).then((response) => {
      const {status} = response;
      if (status === 200 || status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Yêu cầu chỉnh sửa địa điểm mới thành công',
          showConfirmButton: true,
        }).then((result) => {
          if(result.isConfirmed) {
            navigate('/danh-sach-dia-diem-quang-cao');
          }
        })
      }
    })
  }

  const handleLoadRequestEditSpaces = async () => {
    const response = await axiosService.get(`/temp-space/${requestSpaceId}`);
    return response;
  }

  const handleMovetoFormInput = () => {
    formInput.current.scrollIntoView({behavior: 'smooth'});
  }

  useEffect(() => {
    handleLoadRequestEditSpaces().then((response) => {
      const {data, status} = response;
      if (status === 200 || status === 201) {
        formikRef.current.setFieldValue('reason', data.reason);
        formikRef.current.setFieldValue('zone', data.zone);
        formikRef.current.setFieldValue('latitude', data.latitude);
        formikRef.current.setFieldValue('longitude', data.longitude);
        formikRef.current.setFieldValue('address', data.address);
        formikRef.current.setFieldValue('imgUrl', data.imgUrl);
        formikRef.current.setFieldValue('ward', data?.ward);
        formikRef.current.setFieldValue('district', data?.district);
      }
    })
  }, []);

  return (
      <>
        <Container>
          <h3 className={"fw-bolder"}>Tạo yêu cầu thêm địa điểm mới</h3>
          <Card className={"p-3"}>
            <CardSubtitle className={"fw-bolder"}>Hãy chọn 1 điểm cần đặt trên bảng đồ</CardSubtitle>
            <br/>
            <Map onBindingLatLong = {handleSetValuesLatLngFromMap} handleMovetoFormInput={handleMovetoFormInput}/>
          </Card>
          <Card className={"p-3"} innerRef={formInput}>
            <Col md={12}>
              <Formik
                  initialValues={{ reason: '', zone: '', imgUrl: null, latitude: '', longitude: '', address: ''}}
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
                        }} required={true}/>
                      </FormGroup>
                      <FormGroup>
                        <Label for="lat">Vĩ độ</Label>
                        <Field as={Input} type="text" name="latitude" id="latitude" placeholder="Nhập vĩ độ" readOnly/>
                        <ErrorMessage name="latitude" component="div" className="text-danger" />
                      </FormGroup>
                      <FormGroup>
                        <Label for="lng">Kinh độ</Label>
                        <Field as={Input} type="text" name="longitude" id="longitude" placeholder="Nhập kinh độ" readOnly/>
                        <ErrorMessage name="longitude" component="div" className="text-danger" />
                      </FormGroup>
                      <FormGroup>
                        <Label for="address">Địa chỉ</Label>
                        <Field as={Input} type="text" name="address" id="address" placeholder="Nhập địa chỉ" readOnly/>
                        <ErrorMessage name="address" component="div" className="text-danger" />
                      </FormGroup>
                      <Button type="submit" color="primary" disabled={isSubmitting}>Thêm Yêu Cầu Chỉnh Sửa</Button>
                    </Form>
                )}
              </Formik>
            </Col>
          </Card>
        </Container>
      </>
  );
};

export default RequestEditSpaces;