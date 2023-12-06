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
    address: yup.string().required("Vui lòng nhập tiêu đề"),
    content: yup.string().required("Vui lòng nhập thông tin"),
    report_date: yup.string().required("Vui lòng nhập ngày bắt đầu"),
    lat: yup.string().required("Vui lòng nhập kinh độ"),
    long: yup.string().required("Vui lòng nhập vĩ độ"),
    phone: yup.string().required("Vui lòng nhập chiều dài"),
    email: yup.string().required("Vui lòng nhập chiều rộng"),
    // price: yup.string().required("Vui lòng nhập giá tiền"),
  });

  const getAdvertisement = async () => {
    try {
      const { data } = await axiosService.get(`/advertisements/${AdvertisementId}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  const handleUpdateAdvertisement = async () => {
    try {
      const { data } = await axiosService.put(`/advertisements/${AdvertisementId}`, {
        title: formik.values.title,
        description: formik.values.description,
        start_date: formik.values.start_date,
        end_date: formik.values.end_date,
        latitude: formik.values.lat,
        longitude: formik.values.long,
        width: formik.values.width_advertisement,
        height: formik.values.height_advertisement,
        price: formik.values.price,
        is_approved: formik.values.isApproved,
        is_active: formik.values.isActive,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  const formik = useFormik({
    initialValues: {
      address: "",
      content: "",
      report_date: "",
      lat: "",
      long: "",
      phone: "",
      email: "",
      state: "",
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      try {
        if (isEdit) {
          await handleUpdateAdvertisement();
        } else {
          await handleAddAdvertisement();
        }
        navigate("/danh-sach-bang-quang-cao");
      } catch (error) {
      }
    },
  });

  useEffect(() => {
    if (isEdit) {
      getAdvertisement().then((data) => {
        formik.setValues({
          title: data.title,
          description: data.description,
          start_date: data.start_date,
          end_date: data.end_date,
          lat: data.latitude,
          long: data.longitude,
          width_advertisement: data.width,
          height_advertisement: data.height,
          price: data.price,
          isApproved: data.is_approved,
          isActive: data.is_active,
        });
      });
    }

  }, [AdvertisementId]);

  const handleAddAdvertisement = async () => {
    try {
      const { data } = await axiosService.post("/advertisements", {
        title: formik.values.title,
        description: formik.values.description,
        start_date: formik.values.start_date,
        end_date: formik.values.end_date,
        latitude: formik.values.lat,
        longitude: formik.values.long,
        width: formik.values.width_advertisement,
        height: formik.values.height_advertisement,
        price: formik.values.price,
        is_approved: formik.values.isApproved,
        is_active: formik.values.isActive,
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
                      name="address"
                      placeholder="Nhập tên bảng quảng cáo"
                      type="text"
                      invalid={
                        formik.touched.title && Boolean(formik.errors.title)
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormFeedback>{formik.errors.title}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail" className="fw-bold">
                      Content
                    </Label>
                    <Input
                      name="content"
                      placeholder="Thông tin bảng quảng cáo"
                      type="textarea"
                      aria-multiline
                      rows="7"
                      onChange={formik.handleChange}
                      invalid={
                        formik.touched.content &&
                        Boolean(formik.errors.content)
                      }
                      value={formik.values.content}
                      onBlur={formik.handleBlur}
                    />
                    <FormFeedback>{formik.errors.description}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail" className="fw-bold">
                      report date
                    </Label>
                    <Input
                      name="report_date"
                      type="date"
                      onChange={formik.handleChange}
                      invalid={
                        formik.touched.report_date &&
                        Boolean(formik.errors.report_date)
                      }
                      onBlur={formik.handleBlur}
                      // value={moment(formik.values.report_date).format("yyyy-MM-DD")}
                    />
                    <FormFeedback>{formik.errors.report_date}</FormFeedback>
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
                          onChange={e => {
                            formik.setFieldValue('isActive', e.target.checked ? 1 : 0);
                          }}
                          checked={formik.values.isActive}
                        />
                        &nbsp;
                        <Label for="exampleEmail" className="fw-bold">
                          Hiển thị
                        </Label>
                      </Col>
                      <Col md={3}>
                        <Input
                          type="checkbox"
                          name="isApproved"
                          onChange={e => {
                            formik.setFieldValue('isApproved', e.target.checked ? 1 : 0);
                          }}
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
