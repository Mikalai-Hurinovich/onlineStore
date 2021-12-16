import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createBrand } from "../../http/deviceAPI";

const BrandModal = ({ show, onHide }) => {
  const [value, setValue] = useState("");

  const handleAddType = () => {
    createBrand({ name: value }).then((data) => setValue(""));
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
        <Modal.Title id="contained-modal-title-vcenter">Add Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder={"Enter brand name"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="success" onClick={handleAddType}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BrandModal;
