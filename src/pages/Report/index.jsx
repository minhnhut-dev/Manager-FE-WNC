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

const Report = ({ isEdit }) => {

  const navigate = useNavigate();
  let { surfaceId } = useParams();

  const validationSchema = yup.object().shape({
    address: yup.string().required("Vui lòng nhập tiêu đề"),
    content: yup.string().required("Vui lòng nhập thông tin"),
    report_date: yup.string().required("Vui lòng nhập ngày bắt đầu"),
    lat: yup.string().required("Vui lòng nhập kinh độ"),
    long: yup.string().required("Vui lòng nhập vĩ độ"),
    phone: yup.string().required("Vui lòng nhập chiều dài"),
    email: yup.string().required("Vui lòng nhập chiều rộng"),
  });

  // const getAdvertisement = async () => {
  //   try {
  //     const { data } = await axiosService.get(`/advertisements/${AdvertisementId}`);
  //     return data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // const handleUpdateAdvertisement = async () => {
  //   try {
  //     const { data } = await axiosService.put(`/reports`, {
  //       title: formik.values.title,
  //       description: formik.values.description,
  //       start_date: formik.values.start_date,
  //       end_date: formik.values.end_date,
  //       latitude: formik.values.lat,
  //       longitude: formik.values.long,
  //       width: formik.values.width_advertisement,
  //       height: formik.values.height_advertisement,
  //       price: formik.values.price,
  //       is_approved: formik.values.isApproved,
  //       is_active: formik.values.isActive,
  //     });
  //     return data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  const formik = useFormik({
    initialValues: {
      address: "",
      lat: "",
      long: "",
      report_date: "",
      content: "",
      email: "",
      phone: "",
      state: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      try {
        if (isEdit) {
        } else {
          await handleAddAdvertisement();
          alert("Thêm bảng báo cáo thành công");
        }
        navigate(-1);
      } catch (error) {
      }
    },
  });

  const handleAddAdvertisement = async () => {
    console.log(formik.values)
    try {
      const { data } = await axiosService.post("/reports", {
        address: formik.values.address,
        content: formik.values.content,
        report_date: formik.values.report_date,
        phone: formik.values.phone,
        lat: formik.values.lat,
        long: formik.values.long,
        surfaces_id: surfaceId
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  console.log(formik.values)

  return (
    <>
      <div className="add-edit-advertisement">
        <Row>
          <Col md={12}>
            <Card>
              <CardTitle className="text-center my-3 fw-bold" tag="h2">
                {isEdit ? "Sửa bảng quảng cáo" : "Thêm bao cáo quảng cáo"}
              </CardTitle>
              <CardBody>
                <Form onSubmit={formik.handleSubmit}>
                  <FormGroup>
                    <Label for="exampleEmail" className="fw-bold">
                      Address
                    </Label>
                    <Input
                      name="address"
                      placeholder="Nhập địa chỉ"
                      type="text"
                      invalid={
                        formik.touched.address && Boolean(formik.errors.address)
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormFeedback>{formik.errors.address}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail" className="fw-bold">
                      Content
                    </Label>
                    <Input
                      name="content"
                      placeholder="Content"
                      type="textarea"
                      aria-multiline
                      rows="7"
                      onChange={formik.handleChange}
                      invalid={
                        formik.touched.content &&
                        Boolean(formik.errors.content)
                      }
                      onBlur={formik.handleBlur}
                    />
                    <FormFeedback>{formik.errors.content}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail" className="fw-bold">
                      Report date
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
                          <Label className="fw-bold">Email</Label>
                          <Input
                            name="email"
                            type="text"
                            placeholder="Email"
                            onChange={formik.handleChange}
                            invalid={
                              formik.touched.email &&
                              Boolean(formik.errors.email)
                            }
                          />
                          <FormFeedback>
                            {formik.errors.email}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col className="p-2">
                        <FormGroup>
                          <Label className="fw-bold">Phone</Label>
                          <Input
                            name="phone"
                            type="text"
                            placeholder="Phone"
                            onChange={formik.handleChange}
                            invalid={
                              formik.touched.phone &&
                              Boolean(formik.errors.phone)
                            }
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
                          State
                        </Label>
                        <select className="form-control" id="exampleEmail" name="state" onChange={formik.handleChange} defaultValue={0}>
                          <option value="0">Chưa xử lý</option>
                          <option value="1"> xử lý rồi</option>
                        </select>
                        {/* <Input
                          name="state"
                          type="text"
                          onChange={formik.handleChange}
                          invalid={
                            formik.touched.price && Boolean(formik.errors.state)
                          }
                        ></Input> */}
                        <FormFeedback>{formik.errors.state}</FormFeedback>
                      </FormGroup>
                    </Col>
                  </Col>
                  <Col md={12}>
                  <Button
                      color="success"
                      style={{ marginLeft: "40%" }}
                      type="submit"
                      disabled={formik.isSubmitting}
                    >
                      Add report
                    </Button>
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


export default Report;
