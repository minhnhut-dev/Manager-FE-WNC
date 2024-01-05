import React, {useEffect} from 'react';
import {Button, Card, CardBody, CardLink, CardTitle, Container, Table} from "reactstrap";

import {axiosService} from "../../../../services/axiosServices";
import Swal from "sweetalert2";

const ListReportSpacesByUser = () => {
  const [listUser, setListUser] = React.useState([]);

  const handleLoadListUser = () => {
    const response = axiosService.get('/users');
    return response;
  }

  function translateRole(role) {
    switch (role) {
      case 'DISTRICT_MANAGER':
        return 'Quản lý quận';
      case 'WARD_MANAGER':
        return 'Quản lý phường';
      case 'DEPARTMENT_MANAGER':
        return 'Quan lý sở';
      default:
        return 'Không xác định';
    }

  }

  useEffect(() => {
    handleLoadListUser().then((response) => {
      const {data} = response;
      setListUser(data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
      <>
        <Container>
          <Card>
            <CardBody>
              <CardTitle tag="h4" className="fw-bold">
                Danh sách người dùng
              </CardTitle>
              <CardLink href={"/tao-nguoi-dung"}>
                <Button color={"success"}>Thêm người dùng</Button>
              </CardLink>
              <Table className="no-wrap mt-3 align-middle" responsive borderless>
                <thead>
                <tr>
                  <th>Thông tin (name/email)</th>
                  <th>Ngày sinh</th>
                  <th>Phone</th>
                  <th>Chức vụ</th>
                  {/*<th>Chức năng</th>*/}
                </tr>
                </thead>
                <tbody>
                {listUser && listUser.map((tdata, index) => (
                    <tr key={index} className="border-top">
                      <td>
                        <div className="d-flex align-items-center p-2">
                          <div className="ms-3">
                            <h6 className="mb-0">{tdata?.name}</h6>
                            <span className="text-muted">{tdata?.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>{tdata?.birth}</td>
                      <td>{tdata?.phone}</td>

                      <td> <span className={"text-center fw-bold"}>{translateRole(tdata?.role)}</span></td>

                      {/*<td><Button color={"success"}>Phân công</Button></td>*/}
                      {/*<td>*/}
                      {/*  <img alt="img" src={API_URL +  fixUrl(tdata?.imgUrl)} className="rounded-circle" width="35" />*/}
                      {/*</td>*/}
                      {/*<td>*/}
                      {/*                 <span*/}
                      {/*                     className={`p-2 text-white bg-${getRequestStateColor(tdata?.state)} d-inline-block ms-3`}>{getRequestStateName(tdata?.state)}</span>*/}
                      {/*</td>*/}
                      {/*<td className={"d-flex gap-1 mt-2"}>*/}
                      {/*  {hiidenActionAcceptByRequestState(tdata?.state) ? <div></div> :*/}
                      {/*      <button className="btn btn-success btn-sm" onClick={() => handleAcceptReportSpaces(tdata?.id)}><i className='bi bi-check'></i></button>*/}
                      {/*  }*/}
                      {/*  {hiddenActionDeleteByReportState(tdata?.state) ? <div></div> :*/}
                      {/*      <button className="btn btn-danger btn-sm" onClick={() => handleDeclineRequestSpaces(tdata?.id)}><i className='bi bi-x'></i></button>*/}
                      {/*  }*/}
                      {/*</td>*/}
                    </tr>
                ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Container>
      </>
  );
};

export default ListReportSpacesByUser;