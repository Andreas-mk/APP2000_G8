import React from "react";
import { slide as Menu } from "react-burger-menu";
import './Sidebar.css';


export default props => {
    return (
        <Menu>
            <a className="menu-item" href="/">
                Audi
                </a>
                <a className="menu-item" href="/audi">
                BMW
                </a>
                <a className="menu-item" href="/bmw">
                Porsche
                </a>
                <a className="menu-item" href="/volvo">
                Volvo
                </a>
        </Menu>
    );
};