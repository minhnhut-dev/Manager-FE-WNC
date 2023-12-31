import React, {useContext, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import useLocalStorageUser from "../../hooks/useLocalStorageUser";
import {axiosService} from "../../services/axiosServices";
import AppContext from "../../constanst/Context/appContext";
import {useNavigate} from "react-router-dom";
import {Button} from "reactstrap";
import ModalSendOTP from "./ModalSendOTP";
import Swal from "sweetalert2";

const LoginPage = () => {
    const navigate = useNavigate()
    const {setCurrentUser}  = useContext(AppContext)
    const [user, setUser] = useLocalStorageUser('manager-spaces', {});
    const [modalSendOTP, setModalSendOTP] = useState(false);
    const toggle = () => setModalSendOTP(!modalSendOTP);

    // Yup validation schema
    const validationSchema = Yup.object().shape({
        userName: Yup.string()
            .required('Tên đăng nhập là bắt buộc'),
        password: Yup.string()
            .min(5, 'Mật khẩu phải có ít nhất 5 ký tự')
            .required('Mật khẩu là bắt buộc'),
    });

    const handleLogin = async (values) => {
        return axiosService.post("/auth/signin", {username: values?.userName, password: values?.password});
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await handleLogin(values);
            const {data, status} = response;
            if(status === 200 || status === 201) {
                setUser(data);
                setCurrentUser(data)
            }
            setTimeout(() => {
                setSubmitting(false); // Reset the submitting state
                navigate('/');
            }, 1500);
        }catch (e) {
            await Swal.fire({
                icon: 'error',
                title: 'Ôi có lỗi xảy ra',
                text: 'Tài khoản hoặc mật khẩu không đúng',
            })
        }
    };

    return (
        <>
            <div className="container">
                <div className="p-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5 col-sm-6 col-lg-3 mx-auto">
                                <div className="formContainer">
                                    <h2 className="p-2 text-center mb-4 h4" id="formHeading">Login</h2>
                                    <Formik
                                        initialValues={{ userName: '', password: '' }}
                                        validationSchema={validationSchema}
                                        onSubmit={handleSubmit}
                                    >
                                        {({ isSubmitting }) => (
                                            <Form>
                                                <div className="form-group mt-3">
                                                    <label className="mb-2" htmlFor="email">Username</label>
                                                    <Field type="text" name="userName" className="form-control" />
                                                    <ErrorMessage name="userName" component="div" className="text-danger" />
                                                </div>
                                                <div className="form-group mt-3">
                                                    <label className="mb-2" htmlFor="password">Password</label>
                                                    <Field type="password" name="password" className="form-control" />
                                                    <ErrorMessage name="password" component="div" className="text-danger" />
                                                </div>

                                                <button type="submit" className="btn btn-success btn-lg w-100 mt-4" disabled={isSubmitting}>
                                                    Login
                                                </button>
                                                <Button color="link" type={"button"} onClick={() => setModalSendOTP(!modalSendOTP)}>
                                                    Quên mật khẩu?
                                                </Button>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalSendOTP toggle={toggle} isOpen={modalSendOTP}/>
        </>
    );
};

export default LoginPage;
