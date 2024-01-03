import React, { useEffect, useState } from 'react';
import { Col, Row, Container, Card, CardImg, CardBody, CardTitle, CardText, FormGroup, Label, Input, Button, Form } from 'reactstrap';
import { useNavigate, useParams } from "react-router-dom";
import { axiosService } from "../../../../services/axiosServices";
import * as Yup from "yup";
import useSweetAlert from "../../../../hooks/useSweetAlert";
import { useFormik } from "formik";

const EditSpace = () => {
  const { spacesId } = useParams();
  const [space, setSpace] = useState(null) // Khai báo 1 state, ban đầu là mảng rỗng
console.log(spacesId)
  const handleLoadSpace = async () => {
    try {
      const { data } = await axiosService.get(`/spaces/${spacesId}`);
      return data;
    } catch (error) {
      throw (error);
    }
  }
  useEffect(() => {
    handleLoadSpace().then((data) => {
      setSpace(data);
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <Card>
            <CardTitle className="text-center my-3 fw-bold" tag="h2">
              Chỉnh sửa điểm đặt quảng cáo
            </CardTitle>
            <CardBody>
              <Form>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default EditSpace
