import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import AppContext from "../constanst/Context/appContext";
import { UserRole} from "../constanst";
import {useContext} from "react";

const Sidebar = () => {
  const {currentUser} = useContext(AppContext);

  const navigation = [];

  if(currentUser?.role === UserRole.DISTRICT_MANAGER || currentUser?.role === UserRole.WARD_MANAGER){
    navigation.push({
          title: `Trang chủ` ,
          href: "/starter",
          icon: "bi bi-speedometer2",
        },
        {
          title: "Danh sách bảng quảng cáo",
          href: "/danh-sach-dia-diem-quang-cao",
          icon: "bi bi-layout-split",
        },
        {
          title: "Danh sách báo cáo địa điểm",
          href: "/danh-sach-bao-cao-dia-diem",
          icon: "bi bi-card-text",
        },
        {
          title: "Danh sách báo cáo bảng quảng cáo",
          href: "/danh-sach-bao-cao-bang-quang-cao",
          icon: "bi bi-card-text",
        })
  }else {
    navigation.push(
        {
          title: "Quản lý danh sách Quận, Phường",
          href: "/quang-ly-quan-phuong",
          icon: "bi bi-geo-alt",
        },
        {
          title: "Quản lý danh sách các loại hình quảng cáo, hình thức báo cáo",
          href: "/quang-ly-cac-loai-hinh-thuc",
          icon: "bi bi-bar-chart-line",
        },
        {
          title: "Quản lý các điểm đặt quảng cáo",
          href: "/quang-ly-diem-dat-quang-cao",
          icon: "bi bi-map",
        },
        // {
        //   title: "Quản lý các bảng quảng cáo",
        //   href: "#",
        //   icon: "bi bi-signpost-2",
        // },
        // {
        //   title: "Xét duyệt yêu cầu chỉnh sửa điểm quảng cáo",
        //   href: "#",
        //   icon: "bi bi-pencil-square",
        // },
        // {
        //     title: "Xét duyệt yêu cầu chỉnh sửa bảng quảng cáo",
        //     href: "#",
        //     icon: "bi bi-map",
        // },
        {
            title: "Xét duyệt báo cáo điểm đặt từ người dân",
            href: "/danh-sach-yeu-cau-chinh-sua",
            icon: "bi bi-pencil-square",
        },
        // {
        //     title: "Xét duyệt báo cáo bảng quảng cao từ người dân",
        //     href: "#",
        //     icon: "bi bi-map",
        // },
        // {
        //   title: "Xem và xét duyệt yêu cầu cấp phép quảng cáo",
        //   href: "#",
        //   icon: "bi bi-check2-circle",
        // },
        // {
        //   title: "Xem thống kê và xử lý báo cáo của Phường, Quận",
        //   href: "#",
        //   icon: "bi bi-graph-up",
        // },
        {
          title: "Tạo tài khoản cho cán bộ Phường, Quận",
          href: "#",
          icon: "bi bi-person-plus",
        },
        {
          title: "Phân công khu vực quản lý cho tài khoản",
          href: "#",
          icon: "bi bi-people",
        },
        )
  }

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="bg-dark">
      <div className="d-flex">
        <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3  d-flex"
                    : "nav-link py-3  d-flex"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
