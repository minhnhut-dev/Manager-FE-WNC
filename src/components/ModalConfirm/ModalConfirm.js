import { React } from "react";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./modal.scss";

const ConfirmModal = ({ isOpen, handleDelete, toggle }) => {
  return (
    <div class="text-center">
      <Modal isOpen={isOpen} toggle={toggle()}>
        <ModalHeader className="text-center" toggle={toggle()}>
          <div className="icon-box">
            <i className={`fa red-circle fa-trash`}></i>
          </div>
          <h2>Bạn có chắc chắn?</h2>
        </ModalHeader>
        <ModalBody>Bạn có muốn xoá quảng cáo này không?</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle()}>
            Huỷ bỏ
          </Button>
          <Button color="danger" onClick={handleDelete()}>
            Xoá
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ConfirmModal;
