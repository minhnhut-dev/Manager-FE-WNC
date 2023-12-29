import React from 'react';
import { Container, FormGroup, Label, Input, Button } from "reactstrap";
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import {useLocation, useNavigate} from "react-router-dom";
import {axiosService} from "../../services/axiosServices";
import Swal from "sweetalert2";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const emailQuery = query.get('email');

    const initialValues = {
        new_password: '',
        confirm_password: '',
        otp: ''
    };

    const validationSchema = Yup.object().shape({
        new_password: Yup.string()
            .required('Mật khẩu mới không được để trống')
            .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
        confirm_password: Yup.string()
            .required('Xác nhận mật khẩu không được để trống')
            .oneOf([Yup.ref('new_password'), null], 'Mật khẩu xác nhận không khớp'),
        otp: Yup.string()
            .required('Mã OTP không được để trống')
    });

    const handleResetPassword = (values) => {
        // Xử lý quên mật khẩu tại đây...
        const response = axiosService.post(`/auth/reset-password-otp?email=${emailQuery}`, values);
        return response;
    }
    const handleSubmit = (values, actions) => {
        const params= {
            otp: values?.otp,
            password: values?.new_password
        }
        // Xử lý quên mật khẩu tại đây...
        handleResetPassword(params).then((data) => {
            if(data.status === 200 || data.status === 201){
                Swal.fire({
                    icon: "success",
                    title: "Cập nhật mật khẩu thành công",
                });
                navigate(`/login`);
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "Cập nhật mật khẩu thất bại",
                });
            }
        })
        actions.setSubmitting(false);
    }

    return (
        <Container>
            <h1 className="text-center fw-bold">Quên mật khẩu</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="new_password">New Password</Label>
                            <Field name="new_password" as={Input} type="password" />
                            <ErrorMessage name="new_password" component="div" className={"text-danger"}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="confirm_password">Confirm Password</Label>
                            <Field name="confirm_password" as={Input} type="password" />
                            <ErrorMessage name="confirm_password" component="div" className={"text-danger"} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="otp">OTP</Label>
                            <Field name="otp" as={Input} type="text" />
                            <ErrorMessage name="otp" component="div" className={"text-danger"}/>
                        </FormGroup>

                        <Button type="submit" color="primary" disabled={isSubmitting}>Cập nhật</Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default ForgotPassword;
