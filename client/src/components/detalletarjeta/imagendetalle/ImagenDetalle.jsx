import React, { Component } from "react";
import { Card, CardBody, Media } from "reactstrap";

export class ImagenDetalle extends Component {
  render() {
    const { tarjetas, link_id } = this.props;

    var imgStyle = {
      minWidth: "128px",
      maxWidth: window.innerWidth,
    };
    return (
      <div>
        {tarjetas &&
          tarjetas
            .filter(({ _id }) => _id === link_id)
            .map(({ color, numero }) => {
              return (
                <div>
                  <Card>
                    <CardBody>
                      <h3>Imagen adjuntada</h3>
                      <Media>
                        <Media
                          style={imgStyle}
                          object
                          src={`${process.env.PUBLIC_URL}/uploads/${
                            color + numero
                          }.png`}
                        />
                      </Media>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
      </div>
    );
  }
}

export default ImagenDetalle;
