import { Card, CardBody, CardTitle, Container, Table, Row, Col, Button, Pagination, PaginationItem, PaginationLink, Input } from 'reactstrap';
import React, { useEffect, useState } from 'react'
import { axiosService } from "../../../services/axiosServices";
import Select from '../../../components/Select';
import PaginationSample from '../ManageWardDistrict/Pagination'

const ManageWardDistrict = () => {
  const [ward, setWard] = React.useState([]) // Khai báo 1 state, ban đầu là mảng rỗng
  const [districtPagination, setDistrictPagination] = React.useState([]) // Khai báo 1 state, ban đầu là mảng rỗng
  const [district, setDistrict] = React.useState([]) // Khai báo 1 state, ban đầu là mảng rỗng
  const [onPageChange, setOnPageChange] = useState(false);
  const [numOfPage, setNumOfPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [onOptionsChange, setOnOptionsChange] = useState(1);


  const handleDataDistricts = async () => {
    try {
      const { data } = await axiosService.get(`/districts/pagination?page=${onPageChange}`);
      return data;
    } catch (error) {
      throw (error);
    }
  };

  const handleDataDistrictsNotPagination = async () => {
    try {
      const { data } = await axiosService.get(`/districts`);
      return data;
    } catch (error) {
      throw (error);
    }
  }

  const handleDataWards = async () => {
    try {
      const { data } = await axiosService.get(`/wards/district/${onOptionsChange}`);
      return data;
    } catch (error) {
      throw (error);
    }
  };

  useEffect(() => {
    handleDataDistricts().then((data) => {
      setDistrictPagination(data.data);
      setNumOfPage(data.pagination.lastPage);
      setCurrentPage(data.pagination.currentPage);
    });
    handleDataWards().then((data) => {
      setWard(data);
    });
    handleDataDistrictsNotPagination().then((data) => {
      setDistrict(data);
    });
  }, [onPageChange, onOptionsChange]);



  const renderingOptionsDistrict = () => {
    return (
      district.map((item) => {
        return (
          <option key={item.id} value={item.id}>{item.name}</option>
        )
      })
    )
  }



  const renderingListDistrictsPagination = () => {
    return (
      districtPagination.map((item, index) => (
        <tr key={index}>
          <th scope="row">{item.id}</th>
          <td>{item.name}</td>
          <td>
            {/* Button chức năng cho dòng 1 */}
            <Button color="primary">Edit</Button>{' '}
            <Button color="danger">Delete</Button>
          </td>
        </tr>
      ))
    );
  }
  const renderingListWards = () => {
    return (
      ward.map((item, index) => (
        <tr key={index}>
          <th scope="row">{item.id}</th>
          <td>{item.name}</td>
          <td>{item.district.name}</td>
          <td>
            {/* Button chức năng cho dòng 1 */}
            <Button color="primary">Edit</Button>{' '}
            <Button color="danger">Delete</Button>
          </td>
        </tr>
      ))
    );
  }
  const renderPagination = () => {

    const pagination = [];
    const nextPage = currentPage + 1 > numOfPage ? null : currentPage + 1;
    const prevPage = currentPage - 1 < 1 ? null : currentPage - 1;

    
    pagination.push(
      <PaginationItem >
        <PaginationLink
          first
          onClick={() => setOnPageChange(prevPage)}
        />
      </PaginationItem>
    )

    for (let i = 1; i <= numOfPage; i++) {
      pagination.push(
        <PaginationItem>
          <PaginationLink onClick={() => setOnPageChange(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    pagination.push(
      <PaginationItem>
        <PaginationLink
          onClick={() => setOnPageChange(nextPage)}
          next
        />
      </PaginationItem>
    )
    return pagination;
  }

  

  return (
    <div>
      <Container>
        <Row>
          <Col >
            <Card>
              <CardBody>
                <CardTitle className="d-flex justify-content-center" tag="h3">Danh sách Quận
                  <Button color="success" >Click Me</Button>
                </CardTitle>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tên Quận</th>
                      <th>Chức năng</th> {/* Column mới chứa các button chức năng */}
                    </tr>
                  </thead>
                  <tbody>
                    {renderingListDistrictsPagination()}
                  </tbody>
                </Table>
                <Pagination className="d-flex justify-content-center">
                  {renderPagination()}
                </Pagination>

              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <CardTitle className="d-flex justify-content-center mt-2" tag="h3">
                  Danh sách Phường
                  <Button color="success">
                    Click Me
                  </Button>
                </CardTitle>


                <Input
                  id="select-ward"
                  name="select"
                  type="select"
                  onChange={ (e) => setOnOptionsChange(e.target.value)}
                >
                  
                  {renderingOptionsDistrict()}
                </Input>

                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tên Phường</th>
                      <th>Tên Quận</th>
                      <th>Chức năng</th> {/* Column mới chứa các button chức năng */}
                    </tr>
                  </thead>
                  <tbody>
                    {renderingListWards()}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManageWardDistrict;
