import React, {useContext} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useLocalStorageUser from "../../hooks/useLocalStorageUser";
import {axiosService} from "../../services/axiosServices";
import AppContext from "../../Context/appContext";
import {useNavigate} from "react-router-dom";
const LoginPage = () => {
    const navigate = useNavigate()
    const {setCurrentUser}  = useContext(AppContext)
    const [user, setUser] = useLocalStorageUser('manager-spaces', {});

    // Yup validation schema
    const validationSchema = Yup.object().shape({
        userName: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .min(5, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    const handleLogin = async (values) => {
        const response = await axiosService.post("/auth/signin", {username: values?.userName, password: values?.password})
        return response;
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
                // Optionally, navigate to another page or show a success message
            }, 1500);
        }catch (e) {
            console.log(e)
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
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
