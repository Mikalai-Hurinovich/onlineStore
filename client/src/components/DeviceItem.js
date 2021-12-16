import React, { useState } from "react";
import { Card, Col, Image } from "react-bootstrap";
import star from "../assets/star.svg";
import DevicePage from "./modals/DevicePage";

const DeviceItem = ({ device }) => {
  const handleItemClick = () => {
    setDeviceModalShow(true);
  };
  const handleItemClose = () => {
    setDeviceModalShow(false);
  };

  const [deviceModalShow, setDeviceModalShow] = useState(false);
  return (
    <Col md={3}>
      <Card
        className="mb-3"
        styles={{ width: 150, cursor: "pointer" }}
        border="light"
        onClick={handleItemClick}
      >
        <Image
          width={"100%"}
          height={150}
          src={`${process.env.REACT_APP_API_URL}${device.img}`}
        />
        <div className="d-flex justify-content-between align-items-center text-black-50 mt-1">
          <div>Samsung</div>
          <div className="d-flex align-items-center">
            <div>{device.rating}</div>
            <Image src={star} width={20} height={20} />
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
      <DevicePage
        show={deviceModalShow}
        onHide={handleItemClose}
        deviceId={device.id}
      />
    </Col>
  );
};

export default DeviceItem;
