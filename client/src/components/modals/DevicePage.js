import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { Button, Col, Container, Image, Modal, Row } from "react-bootstrap";
import { fetchOneDevice } from "../../http/deviceAPI";

const DevicePage = observer(({ deviceId, show, onHide }) => {
  const [device, setDevice] = useState({ info: [] });

  useEffect(() => {
    fetchOneDevice(deviceId).then((data) => setDevice(data));
  }, []);

  const handleAddDeviceToBasket = () => {
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {device.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <div className="d-flex mt-3">
            <Col md={6}>
              <Image
                style={{ width: "300px", height: "300px" }}
                src={`${process.env.REACT_APP_API_URL}${device.img}`}
                alt="DeviceImg"
              />
            </Col>
            <Col md={6}>
              <Row>
                <h2>Device: {device.name}</h2>
                <h3>Rating: {device.rating}</h3>
                <h5>Description:{device.description}</h5>
              </Row>

              <div className="d-flex justify-content-between align-items-end">
                <h4 className="mb-0">Price: {device.price}$</h4>
                {/* <Button className="align-self-end">Add to Cart</Button> */}
              </div>
            </Col>
          </div>
          <div className="mt-2">
            <h3>Specifications</h3>
            <Row className="d-flex flex-column">
              {device.info.map((item) => (
                <Row id={item.id} className="p-2" style={{ fontSize: "18px" }}>
                  - {item.title}: {item.description}
                </Row>
              ))}
            </Row>
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleAddDeviceToBasket}>
          Add to Cart
        </Button>
        <Button variant="danger" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DevicePage;
