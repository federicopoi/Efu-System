import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Media } from "reactstrap";

const ImagenModal = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  var imgStyle = {
    minWidth: "128px",
    maxWidth: window.innerWidth,
  };
  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Ver imagen
      </Button>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Imagen</ModalHeader>
        <ModalBody>
          <Media object></Media>
          <Media left>
            <Media
              style={imgStyle}
              object
              src={`${process.env.PUBLIC_URL}/uploads/${
                props.color + props.numero
              }.png`}
              alt="Generic placeholder image"
            />
          </Media>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ImagenModal;
