import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Table
} from "reactstrap";
import Loader from "../../layouts/loader/Loader";
import { axiosService } from "../../services/axiosServices";

// import Pagination from "../../components/Pagination";
// import ConfirmModal from "../../components/ModalConfirm/ModalConfirm";

const Advertisement = () => {
  const [spaces, setSpaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [isOpenModal, setIsOpenModal] = useState(null);
  // const [currentPage, setCurrentPage] = useState(1);

  // const [meta, setMeta] = useState({
  //   next: null,
  //   prev_page: null,
  //   total_count: null,
  //   total_pages: null,
  // });

  const getAdvertisements = async () => {
    try {
      const { data } = await axiosService.get(`/spaces`);
      return data;
    } catch (error) {
      throw (error);
    }
  };

  // const handleToggle = () => {
  //   setIsOpenModal(null)
  // }

  // const handleDelete = async () => {
  //   try {
  //     const { data, status } = await axiosService.delete(`/advertisements/${isOpenModal}`);
  //     if (status === 204 || status === 200) {
  //       const newAdvertisement = setSpaces.filter((item) => item.id !== isOpenModal);
  //       setSpaces(newAdvertisement);
  //       handleToggle();
  //     }
  //     return data;
  //   } catch (error) {
  //     throw (error);
  //   }
  // }

  useEffect(() => {
    setIsLoading(true);
    getAdvertisements().then((data) => {
      setSpaces(data.data)
      setIsLoading(false);
    });
  }, []);
  return (
    <div>
      <Card>
        <CardBody>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Address</th>
                <th>format</th>
                <th>long</th>
                <th>lat</th>
                <th>type</th>
                <th>ward</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? <Loader />
                : spaces.map((ad, index) => (
                  <tr key={index} className="border-top">
                    <td>
                      <div className="d-flex align-items-center p-2">
                        <div className="">
                          <span className="text-muted">{ad?.address}</span>
                        </div>
                      </div>
                    </td>
                    <td className="d-inline-block text-truncate">{ad.format}</td>
                    <td className="text-center">{ad.long}</td>
                    <td className="text-center">{ad.lat}</td>
                    <td className="text-center">{ad.type_space}</td>
                    <td className="text-center">{ad.ward}</td>

                    <td className="d-flex justify-content-around">
                      <Link to={`/danh-sach-bang-quang-cao/${ad.id}`}><Button color="warning" size="sm">View surface</Button></Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
     {/* <Pagination meta={meta} setCurrentPage={setCurrentPage} currentPage={currentPage}/> */}
      {/* {isOpenModal && <ConfirmModal isOpen={isOpenModal} toggle={() => handleToggle} handleDelete={() => handleDelete} />} */}
    </div>
  );
};

export default Advertisement;
