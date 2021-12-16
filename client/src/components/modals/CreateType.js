import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createType } from "../../http/deviceAPI";

const CreateType = ({ show, onHide }) => {
  const [value, setValue] = useState("");

  const handleAddType = () => {
    createType({ name: value }).then((data) => setValue(""));
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
        <Modal.Title id="contained-modal-title-vcenter">Add Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Enter type name"}
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

export default CreateType;
