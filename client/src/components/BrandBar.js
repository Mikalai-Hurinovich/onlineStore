import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card } from "react-bootstrap";

const BrandBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <div className="d-flex flex-wrap">
      {device.brands.map((brand) => (
        <Card
          key={brand.id}
          className="p-3 ml-2"
          style={{
            cursor: "pointer",
            marginRight: "10px",
            marginBottom: "10px",
          }}
          border={brand.id === device.selectedBrand.id ? "primary" : "light"}
          onClick={() => device.setSelectedBrand(brand)}
        >
          {brand.name}
        </Card>
      ))}
    </div>
  );
});

export default BrandBar;
