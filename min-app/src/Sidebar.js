import React, {useState} from "react";
import "./Sidebar.css";
import { slide as Menu } from 'react-burger-menu';
import "./Firebase.js";



// denne lager bare menyen 
// Elias
export default props => {
  return (
    <Menu id = "liste"></Menu>
  );
};

