import { useFormik } from "formik";
import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

import * as yup from "yup";

import { axiosService } from "../../services/axiosServices";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const AddEditAdvertisement = ({ isEdit }) => {

  const navigate = useNavigate();
  let { AdvertisementId } = useParams();

  const validationSchema = yup.object().shape({
    title: yup.string().required("Vui lòng nhập tiêu đề"),
    description: yup.string().required("Vui lòng nhập thông tin"),
    start_date: yup.string().required("Vui lòng nhập ngày bắt đầu"),
    end_date: yup.string().required("Vui lòng nhập ngày kết thúc"),
    lat: yup.string().required("Vui lòng nhập kinh độ"),
    long: yup.string().required("Vui lòng nhập vĩ độ"),
    width_advertisement: yup.string().required("Vui lòng nhập chiều dài"),
    height_advertisement: yup.string().required("Vui lòng nhập chiều rộng"),
    price: yup.string().required("Vui lòng nhập giá tiền"),
  });

  const getAdvertisement = async () => {
    try {
      const { data } = await axiosService.get(`/advertisement/${AdvertisementId}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  const handleUpdateAdvertisement = async () => {
    try {
      const { data } = await axiosService.put(`/advertisement/${AdvertisementId}`, {
        title: formik.values.title,
        description: formik.values.description,
        startDate: formik.values.start_date,
        endDate: formik.values.end_date,
        latitude: formik.values.lat,
        longitude: formik.values.long,
        width: formik.values.width_advertisement,
        height: formik.values.height_advertisement,
        price: formik.values.price,
        isApproved: formik.values.isApproved,
        isActive: formik.values.isActive,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      lat: "",
      long: "",
      width_advertisement: "",
      height_advertisement: "",
      price: "",
      isApproved: 0,
      isActive: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      try {
        if (isEdit) {
          await handleUpdateAdvertisement();
        } else {
          await handleAddAdvertisement();
        }
        navigate("/danh-sach-bang-quang-cao", {state: {isReloadData: true}});
      } catch (error) {
      }
    },
  });

  useEffect(() => {
    if (isEdit) {
      getAdvertisement().then((data) => {
        formik.setValues({
          title: data.data.title,
          description: data.data.description,
          start_date: data.data.startDate,
          end_date: data.data.endDate,
          lat: data.data.latitude,
          long: data.data.longitude,
          width_advertisement: data.data.width,
          height_advertisement: data.data.height,
          price: data.data.price,
          isApproved: data.data.isApproved,
          isActive: data.data.isActive,
        });
      });
    }

  }, [AdvertisementId]);

  const handleAddAdvertisement = async () => {
    try {
      const { data } = await axiosService.post("/advertisement", {
        title: formik.values.title,
        description: formik.values.description,
        startDate: formik.values.start_date,
        endDate: formik.values.end_date,
        latitude: formik.values.lat,
        longitude: formik.values.long,
        width: formik.values.width_advertisement,
        height: formik.values.height_advertisement,
        price: formik.values.price,
        isApproved: formik.values.isApproved,
        isActive: formik.values.isActive,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
    
  return (
    <>
      <div className="add-edit-advertisement">
        <Row>
          <Col md={12}>
            <Card>
              <CardTitle className="text-center my-3 fw-bold" tag="h2">
                {isEdit ? "Sửa bảng quảng cáo" : "Thêm bảng quảng cáo"}
              </CardTitle>
              <CardBody>
                <Form onSubmit={formik.handleSubmit}>
                  <FormGroup>
                    <Label for="exampleEmail" className="fw-bold">
                      Tiêu đề quảng cáo
                    </Label>
                    <Input
                      name="title"
                      placeholder="Nhập tên bảng quảng cáo"
                      type="text"
                      invalid={
                        formik.touched.title && Boolean(formik.errors.title)
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.title}
                    />
                    <FormFeedback>{formik.errors.title}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail" className="fw-bold">
                      Thông tin bảng quảng cáo
                    </Label>
                    <Input
                      name="description"
                      placeholder="Thông tin bảng quảng cáo"
                      type="textarea"
                      aria-multiline
                      rows="7"
                      onChange={formik.handleChange}
                      invalid={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      value={formik.values.description}
                      onBlur={formik.handleBlur}
                    />
                    <FormFeedback>{formik.errors.description}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail" className="fw-bold">
                      Ngày bắt đầu
                    </Label>
                    <Input
                      name="start_date"
                      type="date"
                      onChange={formik.handleChange}
                      invalid={
                        formik.touched.start_date &&
                        Boolean(formik.errors.start_date)
                      }
                      onBlur={formik.handleBlur}
                      value={moment(formik.values.start_date).format("yyyy-MM-DD")}
                    />
                    <FormFeedback>{formik.errors.start_date}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail" className="fw-bold">
                      Ngày kết thúc
                    </Label>
                    <Input
                      name="end_date"
                      type="date"
                      onChange={formik.handleChange}
                      invalid={
                        formik.touched.end_date &&
                        Boolean(formik.errors.end_date)
                      }
                      value={moment(formik.values.end_date).format("yyyy-MM-DD")}
                    />
                    <FormFeedback>{formik.errors.end_date}</FormFeedback>
                  </FormGroup>
                  <Col md={12} className="d-flex">
                    <Col md={6} className="p-2">
                      <FormGroup>
                        <Label for="exampleEmail" className="fw-bold">
                          Kinh độ
                        </Label>
                        <Input
                          name="lat"
                          type="text"
                          placeholder="Nhập kinh độ"
                          onChange={formik.handleChange}
                          invalid={
                            formik.touched.lat && Boolean(formik.errors.lat)
                          }
                          value={formik.values.lat}
                        />
                        <FormFeedback>{formik.errors.lat}</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md={6} className="p-2">
                      <FormGroup>
                        <Label for="exampleEmail" className="fw-bold">
                          Vĩ độ
                        </Label>
                        <Input
                          name="long"
                          type="text"
                          placeholder="Nhập vĩ độ"
                          onChange={formik.handleChange}
                          invalid={
                            formik.touched.long && Boolean(formik.errors.long)
                          }
                          value={formik.values.long}

                        />
                        <FormFeedback>{formik.errors.long}</FormFeedback>
                      </FormGroup>
                    </Col>
                  </Col>
                  <Col md={12} className="d-flex">
                    <Col md={6} className="d-flex">
                      <Col className="p-2">
                        <FormGroup>
                          <Label className="fw-bold">Chiều dài</Label>
                          <Input
                            name="width_advertisement"
                            type="text"
                            placeholder="Chiều dài bảng quảng cáo"
                            onChange={formik.handleChange}
                            invalid={
                              formik.touched.width_advertisement &&
                              Boolean(formik.errors.width_advertisement)
                            }
                            value={formik.values.width_advertisement}
                          />
                          <FormFeedback>
                            {formik.errors.width_advertisement}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col className="p-2">
                        <FormGroup>
                          <Label className="fw-bold">Chiều rộng</Label>
                          <Input
                            name="height_advertisement"
                            type="text"
                            placeholder="Chiều rộng bảng quảng cáo"
                            onChange={formik.handleChange}
                            invalid={
                              formik.touched.height_advertisement &&
                              Boolean(formik.errors.height_advertisement)
                            }
                            value={formik.values.height_advertisement}
                          />
                          <FormFeedback>
                            {formik.errors.height_advertisement}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                    </Col>
                    <Col md={6} className="p-2">
                      <FormGroup>
                        <Label for="exampleEmail" className="fw-bold">
                          Giá tiền
                        </Label>
                        <Input
                          name="price"
                          type="text"
                          onChange={formik.handleChange}
                          invalid={
                            formik.touched.price && Boolean(formik.errors.price)
                          }
                          value={formik.values.price}
                        ></Input>
                        <FormFeedback>{formik.errors.price}</FormFeedback>
                      </FormGroup>
                    </Col>
                  </Col>
                  <Col md={12} className="d-flex">
                    <Col md={6}>
                      <Col md={3}>
                        <Input
                          type="checkbox"
                          name="isActive"
                          onChange={formik.handleChange}
                          value="1"
                          checked={formik.values.isActive}
                        />{" "}
                        &nbsp;
                        <Label for="exampleEmail" className="fw-bold">
                          Hiển thị
                        </Label>
                      </Col>
                      <Col md={3}>
                        <Input
                          type="checkbox"
                          name="isApproved"
                          onChange={formik.handleChange}
                          value="1"
                          checked={formik.values.isApproved}
                        />{" "}
                        &nbsp;
                        <Label for="exampleEmail" className="fw-bold">
                          Chấp nhận
                        </Label>
                      </Col>
                    </Col>
                  </Col>
                  <Col md={12}>
                    {isEdit ? (<Button
                      color="success"
                      style={{ marginLeft: "40%" }}
                      type="submit"
                      disabled={formik.isSubmitting}
                    >
                      Sửa bảng quảng cáo
                    </Button>) : <Button
                      color="success"
                      style={{ marginLeft: "40%" }}
                      type="submit"
                      disabled={formik.isSubmitting}
                    >
                      Thêm bảng quảng cáo
                    </Button>}
                  </Col>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

AddEditAdvertisement.defaultProps = {
  isEdit: false,
};

export default AddEditAdvertisement;
