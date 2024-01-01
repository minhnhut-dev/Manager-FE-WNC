import React from 'react';
import AppContext from "../../constanst/Context/appContext";
import { Container, Row, FormGroup, Label, Input, Button } from "reactstrap";
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import {axiosService} from "../../services/axiosServices";
import Swal from "sweetalert2";
import useLocalStorageUser from "../../hooks/useLocalStorageUser";

const EditProfile = () => {
    const { currentUser } = React.useContext(AppContext);
    const [user, setUser] = useLocalStorageUser('manager-spaces', {});

    const initialValues = {
        name: currentUser?.name || '',
        birth: currentUser?.birth || '',
        phone: currentUser?.phone || '',
        email: currentUser?.email || '',
        role: currentUser?.role || '',
        ward: currentUser?.ward?.id || null,
        district: currentUser?.district || null,
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Tên không được để trống'),
        // birth: Yup.date().required('Ngày sinh không được để trống'),
        phone: Yup.string().matches(/^[0-9]+$/, 'Số điện thoại không hợp lệ').required('Số điện thoại không được để trống'),
        // role: Yup.string().required('Vai trò không được để trống'),
        // ward: Yup.string().required('Phường không được để trống'),
        // district: Yup.string().required('Quận không được để trống'),
        email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
    });

    const handleEditProfile = async (values) => {
        const response = await axiosService.put(`/users/${currentUser?.id}`, values);
        const { data } = response;
        return data;
    }

    const handleSubmit = (values, { setSubmitting }) => {
        const params = {
            name: values?.name,
            email: values?.email,
            phone: values?.phone,
            role: values?.role,
            ward: values?.ward,
            district: values?.district
        }
    handleEditProfile(params).then((data) => {
        if(data){
            Swal.fire({
                icon: "success",
                title: "Cập nhật thành công",
            });
            setUser(data);
        }
        else{
            Swal.fire({
                icon: "error",
                title: "Cập nhật thất bại",
            });
        }

    });
        // Xử lý cập nhật thông tin tại đây...
       setSubmitting(false);
    }

    return (
        <Container>
            <Row>
                <h1 className={"text-center fw-bold"}>Chỉnh sửa thông tin cá nhân</h1>
            </Row>
            <Row>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
                    {({ isSubmitting }) => (
                        <Form >
                            <FormGroup>
                                <Label for="name">Tên</Label>
                                <Field name="name" as={Input} type="text" />
                                <ErrorMessage name="name" component="div" className="text-danger" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="birth">Ngày sinh</Label>
                                <Field name="birth" as={Input} type="date" />
                                <ErrorMessage name="birth" component="div" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Field name="email" as={Input} type="text" />
                                <ErrorMessage name="email" component="div" className="text-danger"/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="phone">Số điện thoại</Label>
                                <Field name="phone" as={Input} type="text" />
                                <ErrorMessage name="phone" component="div" className="text-danger"/>
                            </FormGroup>

                            {/*<FormGroup>*/}
                            {/*    <Label for="role">Vai trò</Label>*/}
                            {/*    <Field name="role" as={Input} type="text" />*/}
                            {/*    <ErrorMessage name="role" component="div" className="text-danger"/>*/}
                            {/*</FormGroup>*/}
                            {/*{ currentUser?.ward &&*/}
                            {/*    <FormGroup>*/}
                            {/*        <Label for="ward">Phường</Label>*/}
                            {/*        <Field name="ward" as={Input} type="text" />*/}
                            {/*        <ErrorMessage name="ward" component="div" className="text-danger" />*/}
                            {/*    </FormGroup>*/}
                            {/*}*/}
                            {/*{ currentUser?.district &&*/}
                            {/*    <FormGroup>*/}
                            {/*        <Label for="district">Quận</Label>*/}
                            {/*        <Field name="district" as={Input} type="text" />*/}
                            {/*        <ErrorMessage name="district" component="div" className="text-danger"/>*/}
                            {/*    </FormGroup>*/}
                            {/*}*/}
                            <Button type="submit" color="primary" disabled={isSubmitting}>Cập nhật</Button>
                        </Form>
                    )}
                </Formik>
            </Row>
        </Container>
    );
};

export default EditProfile;
