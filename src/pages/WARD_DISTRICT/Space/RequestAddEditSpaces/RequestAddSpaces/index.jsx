import React from 'react';
import {Card, Container, FormGroup, Label, Input, Button, CardSubtitle, Col} from "reactstrap";
import * as Yup from 'yup';
import {ErrorMessage, Field, Formik, Form} from 'formik';
import Map from "../../Component/Map";

const RequestAddSpaces = () => {
  const validationSchema = Yup.object().shape({
    reason: Yup.string().required('Lý do là bắt buộc'),
    latitude: Yup.number().required('Vĩ độ là bắt buộc'),
    longitude: Yup.number().required('Kinh độ là bắt buộc'),
    address: Yup.string().required('Địa chỉ là bắt buộc'),

  });
  return (
    <>
      <Container>
        <h3 className={"fw-bolder"}>Tạo yêu cầu thêm địa điểm mới</h3>
        <Card className={"p-3"}>
          <CardSubtitle className={"fw-bolder"}>Hãy chọn 1 điểm cần đặt trên bảng đồ</CardSubtitle>
          <br/>
          <Map/>
        </Card>
      <Card className={"p-3"}>
        <Col md={12}>
          <Formik
              initialValues={{ reason: '', zone: '', imgUrl: null }}
              validationSchema={validationSchema}
              // onSubmit={handleSubmit}
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
                  <FormGroup>
                    <Label for="lat">Vĩ độ</Label>
                    <Field as={Input} type="text" name="lat" id="lat" placeholder="Nhập vĩ độ"/>
                    <ErrorMessage name="lat" component="div" className="text-danger" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="lng">Kinh độ</Label>
                    <Field as={Input} type="text" name="lng" id="lng" placeholder="Nhập kinh độ"/>
                    <ErrorMessage name="lng" component="div" className="text-danger" />
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

export default RequestAddSpaces;