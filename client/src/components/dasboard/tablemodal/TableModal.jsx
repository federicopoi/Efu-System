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

const TableModal = (props) => {
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
            <td>Acumuladas (abiertas)</td>
            {props.fechas.map((item, index) => {
              return <td>{props.tarjetasFiltro1[index]}</td>;
            })}
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Acumuladas (cerradas)</td>
            {props.fechas.map((item, index) => {
              return <td>{props.tarjetasFiltro2[index]}</td>;
            })}
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Porcentaje (cerradas)</td>
            {props.fechas.map((item, index) => {
              const porcentaje =
                (props.tarjetasFiltro3[index] / props.tarjetasFiltro1[index]) *
                100;
              return <td>{porcentaje.toString().slice(0, 4)}%</td>;
            })}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TableModal;
