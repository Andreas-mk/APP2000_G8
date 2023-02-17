import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";

export default (props) => {
  return (
    <Menu>
      <li>
        <a className="menu-item" href="/">
          Audi
        </a>
      </li>
      <li>
        {" "}
        <a className="menu-item" href="/audi">
          BMW
        </a>
      </li>
      <li>
        {" "}
        <a className="menu-item" href="/bmw">
          Porsche
        </a>
      </li>
      <li>
        {" "}
        <a className="menu-item" href="/volvo">
          Volvo
        </a>
      </li>
    </Menu>
  );
};
