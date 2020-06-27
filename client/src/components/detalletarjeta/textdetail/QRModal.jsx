import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import QRCode from "qrcode.react";

const QRModal = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const link = "http://192.168.0.5:3000" + props.path;

  return (
    <div>
      <Button onClick={toggle}>Mostrar QR</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Código QR</ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <QRCode value={link} />
              <h4 className="mt-3">
                Tarjeta {props.color} N°{props.numero}
              </h4>
            </Col>
            <Col></Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default QRModal;
