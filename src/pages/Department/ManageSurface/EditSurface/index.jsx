import React, {useEffect, useRef, useState} from 'react';
import {Card, Container, FormGroup, Label, Input, Button, CardSubtitle, Col} from "reactstrap";
import * as Yup from 'yup';
import {ErrorMessage, Field, Formik, Form} from 'formik';
import Map from '../Component/map';
import {useNavigate, useParams} from "react-router-dom";
import {axiosService} from "../../../../services/axiosServices";
import Swal from "sweetalert2";

const EditSurface = () => {
  const {surfaceId} = useParams();

  const [listSpace, setListSpace] = useState([]);
  const [surface, setSurface] = useState(null);

  const formikRef = useRef();
  const formInput =useRef();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    width: Yup.string().required('Chiều rộng là bắt buộc'),
    height: Yup.string().required('Chiều dài là bắt buộc'),
    expiryDate: Yup.string().required('Ngày hết hạn là bắt buộc'),
    space: Yup.string().required('Không được để trống địa điểm'),
    imgUrl: Yup.mixed().required('Hình ảnh là bắt buộc'),
  });

  const handleSetValuesLatLngFromMap = (values) => {
    formikRef.current.setFieldValue('address', values.address);
    formikRef.current.setFieldValue('space', values.space);
  }
  const handleEditSurfaces = (params) => {
    const response = axiosService.put(`/surfaces/${surfaceId}`, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  }

  const loadSpaces = async () => {
    const response = await axiosService.get(`/spaces`);
    return response;
  }

  const loadSurface = async () => {
    const response = await axiosService.get(`/surfaces/${surfaceId}`);
    return response;
  }

  const handleSubmit = async (values, {setSubmitting}) => {
    const params = {
      imgUrl: values.imgUrl,
      width: values.width,
      height: values.height,
      expiryDate: values.expiryDate,
      space: values.space,
      surfaceType: 8
    }
    const formData = new FormData();
    formData.append('imgUrl', params.imgUrl);
    formData.append('width', params.width);
    formData.append('height', params.height);
    formData.append('expiryDate', params.expiryDate);
    formData.append('space', params.space);
    formData.append('surfaceType', params.surfaceType);

    handleEditSurfaces(formData).then((response) => {
      const {status} = response;
      if (status === 200 || status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Sửa bảng QC thành công',
          showConfirmButton: true,
        }).then((result) => {
          if(result.isConfirmed) {
            navigate(-1);
          }
        })
      }
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Không thể sửa do lỗi hệ thống',
        showConfirmButton: true,
      })
    })
    setSubmitting(false);
  }

  const handleMovetoFormInput = () => {
    formInput.current.scrollIntoView({behavior: 'smooth'});
  }

  useEffect(() => {
    loadSpaces().then((response) => {
      const {data} = response;
      setListSpace(data.data);
    }).catch((error) => {
      console.log(error);
    });
    loadSurface().then((response) => {
      const {data} = response;
      formikRef.current.setFieldValue('width', data.width);
      formikRef.current.setFieldValue('height', data.height);
      formikRef.current.setFieldValue('expiryDate', data.expiryDate);
      formikRef.current.setFieldValue('space', data.id);
      // formikRef.current.setFieldValue('imgUrl', data.imgUrl);
      setSurface(data);
    });
  }, []);

  return (
      <>
        <Container>
          <h3 className={"fw-bolder"}>sửa bảng quảng cáo</h3>
          <Card className={"p-3"}>
            <CardSubtitle className={"fw-bolder"}>Hãy chọn 1 điểm cần đặt trên bảng đồ</CardSubtitle>
            <br/>
            {listSpace.length > 0 && (<Map onBindingLatLong = {handleSetValuesLatLngFromMap} handleMovetoFormInput={handleMovetoFormInput} geoJSON = {listSpace}/>
            )}
          </Card>
          <Card className={"p-3"} innerRef={formInput}>
            <Col md={12}>
              <Formik
                  initialValues={{imgUrl: '', width: '', height: '', expiryDate: '', space: '', address: ''}}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  innerRef={formikRef}
              >
                {({ isSubmitting, setFieldValue }) => (
                    <Form >
                      <FormGroup>
                        <Label for={"height"}> Chiều dài </Label>
                        <Field as={Input} type="text" name="height" id="height" placeholder="Nhập chiều dài" />
                        <ErrorMessage name="height" component="div" className="text-danger" />
                      </FormGroup>

                      <FormGroup>
                        <Label for={"width"}> Chiều rộng </Label>
                        <Field as={Input} type="text" name="width" id="width" placeholder="Nhập chiều rộng" />
                        <ErrorMessage name="width" component="div" className="text-danger" />
                      </FormGroup>
                      <FormGroup>
                        <Label for={"width"}> Ngày hết hạn </Label>
                        <Field as={Input} type="date" name="expiryDate" id="expiryDate"/>
                        <ErrorMessage name="expiryDate" component="div" className="text-danger" />
                      </FormGroup>
                      <FormGroup>
                        <Label for="imgUrl">Hình Ảnh</Label>
                        <input type="file" name="imgUrl" id="imgUrl" onChange={(event) => {
                          setFieldValue("imgUrl", event.currentTarget.files[0]);
                        }} required={true} className={"form-control"} accept=".png, .jpg, .jpeg, .webp" multiple={true}/>
                      </FormGroup>
                      <FormGroup>
                        <Label for="address">Địa chỉ</Label>
                        <Field as={Input} type="text" name="address" id="address" placeholder="Nhập địa chỉ" readOnly/>
                        <ErrorMessage name="address" component="div" className="text-danger" />
                      </FormGroup>
                      <Button type="submit" color="primary" disabled={isSubmitting}>Sửa</Button>
                    </Form>
                )}
              </Formik>
            </Col>
          </Card>
        </Container>
      </>
  );
};

export default EditSurface;