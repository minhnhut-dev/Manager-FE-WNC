import React, {useEffect} from 'react';
import {Button, Card, CardBody, CardTitle, Container, FormGroup, Input} from "reactstrap";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {axiosService} from "../../../../services/axiosServices";
import {isEmpty} from "lodash";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const AddUser = () => {
  const navigation = useNavigate();
  const [districts, setDistricts] = React.useState([]);
  const [wards, setWards] = React.useState([]);
  const [selectedDistrict, setSelectedDistrict] = React.useState(null);
  const [districtId, setDistrictId] = React.useState(null);
  const [wardId, setWardId] = React.useState(null);

  // const [selectedWard, setSelectedWard] = React.useState(null);

  // validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Họ và tên là bắt buộc'),
    email: Yup.string().required('Email là bắt buộc'),
    password: Yup.string().required('Mật khẩu là bắt buộc'),
    phone: Yup.string().required('Số điện thoại là bắt buộc'),
    birthday: Yup.string().required('Ngày sinh là bắt buộc'),
    role: Yup.string().required('Chức vụ là bắt buộc'),
    username: Yup.string().required('Tên đăng nhập là bắt buộc'),
  });
  const handleAddUser = async (params) => {
    const response =  await  axiosService.post('/users', params);
    return response;
  }

  const handleSubmit = (values, {setSubmitting}) => {
    const params = {
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
      birth: values.birthday,
      role: values.role,
      username: values.username,
      ward: wardId || null,
      district: districtId || null
    }

    handleAddUser(params).then((response) => {
      const { status} = response;
      if(status === 200 || status === 201){
        Swal.fire({
          icon: "success",
          title: "Thêm thành công",
          confirmButtonText: 'OK',
        }).then((result) => {
          if(result.isConfirmed) navigation(-1);
        })
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Thêm thất bại",
          confirmButtonText: 'OK',
        });
      }
    }).catch((error) => {
      console.log(error);

    })
    setSubmitting(false)
  }

  const handleSelectRole = (e) => {

  }

  useEffect(() => {

  handleLoadDistricts().then((response) => {
    const {data} = response;
    setDistricts(data);
  }).catch((error) => {
    console.log(error);
  });

  }, []);

  useEffect(() => {
    if(districtId) {
      handleLoadWards(districtId).then((response) => {
        const {data} = response;
        setWards(data);
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [districtId]);

  const handleLoadDistricts = () => {
    const response = axiosService.get('/districts');
    return response;
  }

  const handleLoadWards = (districtId) => {
    const response = axiosService.get(`/wards/district/${districtId}`);
    return response;
  }


  function renderDistricts() {
    return (
        <FormGroup>
          <label htmlFor="district">Quận</label>
          <select className={"form-control"} id={"district"} onChange={(e) => setDistrictId(e.target.value)}>
            <option value={""}>Chọn quận</option>
            {districts && districts.map((district) => (
                <option key={district.id} value={district.id}>{district.name}</option>
            ))}
          </select>
        </FormGroup>
    )
  }
  function renderWards() {
    return (
        <FormGroup>
          <label htmlFor="ward">Phường</label>
          <select className={"form-control"} id={"ward"} onChange={(e) => setWardId(e.target.value)}>
            <option value={""}>Chọn phường</option>
            {wards && wards.map((ward) => (
                <option key={ward.id} value={ward.id}>{ward.name}</option>
            ))}
          </select>
        </FormGroup>
    )
  }

  return (
     <>
       <Container>
         <Card>
         <CardTitle tag={"h4"} className={"text-center fw-bold"}>
           Thêm người dùng
         </CardTitle>
         <CardBody>
           <Formik initialValues={{name: '', email: '',  password: '', phone: '', birthday: '', role: '', username: '' }}  onSubmit={handleSubmit} validationSchema={validationSchema}>
             {({ isSubmitting, setFieldValue, values}) => (
                 <Form>
                   <FormGroup>
                     <label htmlFor="name">Họ và tên</label>
                     <Field  as={Input}  className={"form-control"} name={"name"}/>
                     <ErrorMessage name={"name"}  component={"div"} className={"text-danger"}/>

                   </FormGroup>
                   <FormGroup>
                     <label htmlFor="username">Tên đăng nhập</label>
                     <Field  as={Input} type="text" id={"username"} className={"form-control"} placeholder={"Nhập tên đăng nhập"} name={"username"}/>
                     <ErrorMessage name={"username"}  component={"div"} className={"text-danger"}/>
                   </FormGroup>
                   <FormGroup>
                     <label htmlFor="email">Email</label>
                     <Field as={Input} type="email" id={"email"} className={"form-control"} placeholder={"Nhập email"} name={"email"}/>
                      <ErrorMessage name={"email"}  component={"div"} className={"text-danger"}/>
                   </FormGroup>
                   <FormGroup>
                     <label htmlFor="password">Mật khẩu</label>
                     <Field as={Input} type="password" id={"password"} className={"form-control"} placeholder={"Nhập mật khẩu"} name={"password"}/>
                      <ErrorMessage name={"password"}  component={"div"} className={"text-danger"}/>
                   </FormGroup>
                   <FormGroup>
                     <label htmlFor="phone">Số điện thoại</label>
                     <Field  as={Input} type="text" id={"phone"} className={"form-control"} placeholder={"Nhập số điện thoại"} name={"phone"}/>
                      <ErrorMessage name={"phone"}  component={"div"} className={"text-danger"}/>
                   </FormGroup>
                   <FormGroup>
                     <label htmlFor="birthday">Ngày sinh</label>
                     <Field as={Input} type="date" id={"birthday"} className={"form-control"} placeholder={"Nhập ngày sinh"} name={"birthday"}/>
                      <ErrorMessage name={"birthday"}  component={"div"} className={"text-danger"}/>
                   </FormGroup>
                   <FormGroup>
                     <label htmlFor="role">Chức vụ</label>
                     <Input as={Input} className={"form-control"} id={"role"} type={"select"} name={"role"} onChange={(e) => {setSelectedDistrict(e.target.value); setFieldValue("role", e.target.value)} }>
                       <option value={""}>Chọn chức vụ</option>
                       <option value={"DISTRICT_MANAGER"}>Quản lý quận</option>
                       <option value={"WARD_MANAGER"}>Quản lý phường</option>
                       <option value={"DEPARTMENT_MANAGER"}>Quản lý sở</option>
                     </Input>
                      <ErrorMessage name={"role"}  component={"div"} className={"text-danger"}/>
                   </FormGroup>
                   {selectedDistrict !== 'DEPARTMENT_MANAGER' && !isEmpty(selectedDistrict) && renderDistricts()}
                   {selectedDistrict === 'WARD_MANAGER' && !isEmpty(selectedDistrict)  && renderWards()}
                   <Button type="submit" color="primary" disabled={isSubmitting}>Thêm</Button>
                 </Form>
             )}
           </Formik>
             </CardBody>
         </Card>
       </Container>
     </>
  );
};

export default AddUser;