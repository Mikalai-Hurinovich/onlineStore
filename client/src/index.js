import React, { createContext } from "react";
import { render } from "react-dom";
import App from "./App";
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";

export const Context = createContext(null);

render(
  <Context.Provider
    value={{
      user: new UserStore(),
      device: new DeviceStore(),
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById("root")
);
