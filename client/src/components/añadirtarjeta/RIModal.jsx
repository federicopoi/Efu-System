import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  Media,
} from "reactstrap";

const RIModal = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  var imgStyle = {
    minWidth: "128px",
    maxWidth: window.innerWidth,
  };
  return (
    <div>
      <Button color="danger" onClick={toggle} color="link">
        ℹ️
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Riesgo Inicial</ModalHeader>
        <ModalBody>
          <Media>
            <Media
              style={imgStyle}
              object
              src="https://image.slidesharecdn.com/002emmantenimientoautonomo-150923023729-lva1-app6891/95/002-em-mantenimiento-autonomo-49-638.jpg?cb=1442976043"
            />
          </Media>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default RIModal;
