import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import AppContext from "../Context/appContext";
import {UserRole} from "../constanst";
import {useContext} from "react";

const Sidebar = () => {
  const {currentUser} = useContext(AppContext);
  const navigation = [
    {
      title: `${UserRole[currentUser?.role] }` ,
      href: "/starter",
      icon: "bi bi-speedometer2",
    },
    {
      title: "Danh sách bảng quảng cáo",
      href: "/danh-sach-loai-bang-quang-cao",
      icon: "bi bi-layout-split",
    },
    {
      title: "Danh sách báo cáo",
      href: "/danh-sach-bao-cao",
      icon: "bi bi-card-text",
    },
  ];

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
