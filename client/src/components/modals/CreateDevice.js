import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../../index";
import { createDevice, fetchBrands, fetchTypes } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  const [info, setInfo] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, []);

  const handleAddInfo = () => {
    setInfo([...info, { id: Date.now(), title: "", description: "" }]);
  };

  const handlePropertDelete = (propertyId) => {
    setInfo(info.filter((el) => el.id !== propertyId));
  };

  const handleChangeInfo = (key, value, id) => {
    setInfo(
      info.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  };

  const handleAddDevice = () => {
    let data = new FormData();
    data.append("name", name);
    data.append("price", String(price));
    data.append("img", file);
    data.append("brandId", device.selectedBrand.id);
    data.append("typeId", device.selectedType.id);
    data.append("info", JSON.stringify(info));
    createDevice(data).then(() => onHide());
  };

  const handleSetFiles = (e) => {
    setFile(e.target.files[0]);
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
        <Modal.Title id="contained-modal-title-vcenter">Add Device</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown>
            <Dropdown.Toggle>
              {device.selectedType.name || "Choose type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item
                  key={type.id}
                  onClick={() => device.setSelectedType(type)}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2">
            <Dropdown.Toggle>
              {device.selectedBrand.name || "Choose brand"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item
                  key={brand.id}
                  onClick={() => device.setSelectedBrand(brand)}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className="mt-2"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"Enter device name"}
          />
          <Form.Control
            className="mt-2"
            type="number"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            placeholder={"Enter device price"}
          />
          <Form.Control
            type="file"
            className="mt-2"
            onChange={handleSetFiles}
          />
          <hr />
          <Button onClick={handleAddInfo}>Add new property</Button>
          {info.map((item) => (
            <Row key={item.id} className="mt-2">
              <Col md={4}>
                <Form.Control
                  value={item.title}
                  placeholder="Property name"
                  onChange={(e) =>
                    handleChangeInfo("title", e.target.value, item.id)
                  }
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={item.description}
                  placeholder="Property description"
                  onChange={(e) =>
                    handleChangeInfo("description", e.target.value, item.id)
                  }
                />
              </Col>
              <Col md={4}>
                <Button
                  onClick={() => handlePropertDelete(item.id)}
                  variant="danger"
                >
                  Delete
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="success" onClick={handleAddDevice}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
