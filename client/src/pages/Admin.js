import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";

// import Modal from "../components/modals/Modal";

const Admin = () => {
  const [typeModalShow, setTypeModalShow] = useState(false);
  const [brandModalShow, setBrandModalShow] = useState(false);
  const [deviceModalShow, setDeviceModalShow] = useState(false);

  return (
    <Container className="d-flex flex-column">
      <Button className="mt-2" onClick={() => setTypeModalShow(true)}>
        Add Type
      </Button>
      <Button className="mt-2" onClick={() => setBrandModalShow(true)}>
        Add Brand
      </Button>
      <Button className="mt-2" onClick={() => setDeviceModalShow(true)}>
        Add Device
      </Button>
      <CreateType show={typeModalShow} onHide={() => setTypeModalShow(false)} />
      <CreateBrand
        show={brandModalShow}
        onHide={() => setBrandModalShow(false)}
      />
      <CreateDevice
        show={deviceModalShow}
        onHide={() => setDeviceModalShow(false)}
      />
    </Container>
  );
};

export default Admin;
