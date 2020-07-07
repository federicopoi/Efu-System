import React, { useState, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Message from "./Message";
import Progress from "./Progress";
import axios from "axios";

const FileUpload = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Elegir archivo");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file, props.id);

    try {
      const res = await axios.post(
        "/api/tarjetas/upload",
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },

          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );

            // Clear percentage
            setTimeout(() => setUploadPercentage(0), 10000);
          },
        }
      );

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage("Imagen subida exitosamente");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("Hubo un problema con el servidor");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <div>
      <Button onClick={toggle}>Subir Imagen</Button>
      <Modal isOpen={modal}>
        <ModalHeader toggle={toggle}>Subir imagen</ModalHeader>
        <ModalBody>
          <Fragment>
            {message ? <Message msg={message} /> : null}

            <div className="custom-file mb-4">
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
                accept="image/*"
                onChange={onChange}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {filename}
              </label>
            </div>

            <Progress percentage={uploadPercentage} />

            <input
              value="Subir"
              type="submit"
              onClick={onSubmit}
              className="btn btn-primary btn-block mt-4"
            />

            {uploadedFile ? (
              <div className="row mt-5">
                <div className="col-md-6 m-auto">
                  <h3 className="text-center">{uploadedFile.fileName}</h3>
                  <img
                    style={{ width: "100%" }}
                    src={uploadedFile.filePath}
                    alt=""
                  />
                </div>
              </div>
            ) : null}
          </Fragment>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default FileUpload;
