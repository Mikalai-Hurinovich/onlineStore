import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import Pagination from "../components/PaginationPage";
import TypeBar from "../components/TypeBar";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";
import { Context } from "../index";

const Shop = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => {
      device.setBrands(data);
    });
    fetchDevices().then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchDevices(
      device.selectedType.id,
      device.selectedBrand.id,
      device.page,
      2
    ).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device.page, device.selectedType, device.selectedBrand]);
  return (
    <Container>
      <Row className="mt-3">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pagination />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
