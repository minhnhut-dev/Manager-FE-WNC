import React from 'react';
import Sidebar from "./Sidebar";
import {Container} from "reactstrap";
import {Outlet} from "react-router-dom";

const SimpleLayout = () => {
  return (
      <main>
        <div className="pageWrapper d-lg-flex">
          <div className="contentArea">
            <Container className="p-4" fluid>
              <Outlet/>
            </Container>
          </div>
        </div>
      </main>
  );
};

export default SimpleLayout;