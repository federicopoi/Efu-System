import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  Table,
} from "reactstrap";

const TableModalAutonomia = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Table className="no-wrap v-middle" responsive>
        <thead>
          <tr className="border-0">
            <th className="border-0">Mes</th>
            {props.fechas.map((item) => {
              return <th className="border-0">{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Indice de autonomia</td>
            {props.fechas.map((item, index) => {
              return (
                <td>{props.tarjetasFiltro1[index].toString().slice(0, 4)} %</td>
              );
            })}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TableModalAutonomia;
