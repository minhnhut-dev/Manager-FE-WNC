import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form } from 'reactstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {axiosService} from "../../services/axiosServices";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const EmailModal = ({isOpen, toggle}) => {


    const navigate = useNavigate();

    const initialValues = {
        email: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email không hợp lệ')
            .required('Email không được để trống'),
    });

    const handleSendOTP = (values) => {
        const response = axiosService.post('auth/forgot-password', values);
        return response;
    }
    const handleSubmit = (values, { setSubmitting }) => {
        const params = {
            email: values?.email
        }
        handleSendOTP(params).then((data) => {
            if(data.status === 200 || data.status === 201){
                Swal.fire({
                    icon: "success",
                    title: "Gửi OTP thành công",
                });
                navigate(`/quen-mat-khau?email=${values?.email}`);
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "Gửi OTP thất bại",
                });
            }
        })

        // Xử lý gửi OTP tại đây...
        setSubmitting(false);
        toggle();
    };

    return (
        <>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Gửi OTP</ModalHeader>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ handleSubmit, isSubmitting }) => (
                        <Form onSubmit={handleSubmit}>
                            <ModalBody>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Field name="email" as={Input} type="email" />
                                    <ErrorMessage name="email" component="div" className={"text-danger"}/>
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" type="submit" disabled={isSubmitting}>Gửi OTP</Button>{' '}
                                <Button color="secondary" onClick={toggle}>Hủy bỏ</Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    );
};

export default EmailModal;
