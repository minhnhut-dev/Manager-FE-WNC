import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Table,
  CardTitle
} from "reactstrap";
import Loader from "../../layouts/loader/Loader";
import { axiosService } from "../../services/axiosServices";

function Surface() {
  const navigate = useNavigate();
  let { spaceId } =  useParams()

  const [surfaces, setSurfaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSurfaces = async () => {
    try {
      const { data } = await axiosService.get(`/surfaces?spaces_id=${spaceId}`);
      return data;
    } catch (error) {
      throw (error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getSurfaces().then((data) => {
      setSurfaces(data.data)
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
       <Card>
        <CardTitle >Surfaces</CardTitle>
        <CardBody>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>#</th>
                <th>format</th>
                <th>size</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? <Loader />
                : surfaces.map((ad, index) => (
                  <tr key={index} className="border-top">
                    <td>{ad.id}</td>
                    <td>
                      <div className="d-flex align-items-center p-2">
                        <div className="">
                          <span className="text-muted">{ad?.format}</span>
                        </div>
                      </div>
                    </td>
                    <td className="">{`${ad?.width}m`} x {`${ad?.height}m` }</td> 
                    {/* <td className="d-inline-block text-truncate">{ad?.width}</td>
                    <td className="text-center">{ad?.height}</td> */}
                    <td className="">
                      <Link to={`/them-bao-cao-quang-cao/${ad.id}`}><Button color="warning" size="sm">Report!</Button></Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <Button onClick={() => navigate(-1)}>Back</Button>
    </div>
  );
}

export default Surface;