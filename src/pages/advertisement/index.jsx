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


const Advertisement = () => {
  const [advertisement, setAdvertisement] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAdvertisements = async () => {
    try {
      const { data } = await axiosService.get("/advertisement");
      return data;
    } catch (error) {
      throw (error);
    }
  };

  const handleDelete = async (advertisementId) => {
    try {
      const { data, status } = await axiosService.delete(`/advertisement/${advertisementId}`);
      if (status === 200) {
        alert("Bạn có muốn xoá quảng cáo này?")
        const newAdvertisement = advertisement.filter((item) => item.advertisementId !== advertisementId);
        setAdvertisement(newAdvertisement);
      }
      return data;
    } catch (error) {
      throw (error);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getAdvertisements().then((data) => {
      setAdvertisement(data.data)
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <Card>
        <CardBody>
          <Link to="/them-bang-quang-cao">
            <Button color="primary" className="mb-3">
              <i class="bi bi-plus-circle"></i> &nbsp;
              Thêm bảng quảng cáo
            </Button>
          </Link>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Mô tả</th>
                <th>Giá tiền</th>
                <th>Ngày bắt đầu | Ngày kết thúc</th>
                <th>Chiều dài | Chiều rộng</th>
                <th>Hiển thị</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? <Loader />
                : advertisement.map((ad, index) => (
                  <tr key={index} className="border-top">
                    <td>
                      <div className="d-flex align-items-center p-2">
                        <div className="">
                          <span className="text-muted">{ad.title}</span>
                        </div>
                      </div>
                    </td>
                    <td className="d-inline-block text-truncate">{ad.description}</td>

                    <td>{ad.price}</td>
                    <td className="text-center">{moment(ad.startDate).format("DD-MM-yyyy")} | {moment(ad.endDate).format("DD-MM-yyyy")}</td>
                    <td className="text-center">{ad.width} | {ad.height}</td>
                    <td>
                      {ad.isActive == 0 ? (
                        <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                      ) : (
                        <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                      )}
                    </td>
                    <td className="d-flex justify-content-around">
                      <Link to={`/sua-bang-quang-cao/${ad.advertisementId}`}><Button color="warning" size="sm">Sửa</Button></Link>
                      <Button color="danger" size="sm" onClick={() => handleDelete(ad.advertisementId)}>Xoá</Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Advertisement;
