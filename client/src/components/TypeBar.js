import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { fetchTypes } from "../http/deviceAPI";
import { Context } from "../index";

const TypeBar = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => {
      device.setTypes(data);
    });
  }, []);
  return (
    <div>
      <ListGroup>
        {device.types.map((type) => {
          return (
            <ListGroup.Item
              key={type.id}
              style={{ cursor: "pointer" }}
              onClick={() => device.setSelectedType(type)}
              active={type.id === device.selectedType.id}
            >
              {type.name}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
});

export default TypeBar;
