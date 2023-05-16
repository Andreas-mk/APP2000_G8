import React, {useState} from "react";
import "./Sidebar.css";
import { slide as Menu } from 'react-burger-menu';




export default props => {
  return (
    <Menu>
      <a className="valg" href="/">
        Tesla
      </a>
    </Menu>
  );
};

/*const Sidebar = () => {

  const[isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
   <div>
    <button onClick={toggleVisibility}>Vis elbil liste</button>
    {isVisible && (
      <div className="sideMenu">
      <label for="elbiler">Velg elbiler:</label>
      <select id="liste" name="elbiler">
        <option></option>
        <optgroup label="Tesla">
        <option><a href="Tesla">Tesla modell X</a></option>
        <option>Tesla modell Y</option>
        </optgroup>
        <optgroup label="Skoda">
        <option><a href="Skoda">Skoda</a></option>
        <option>Skoda Enyaq</option>
        </optgroup>
        </select>
      </div>
    )}
    </div>
    
  );
};
*/
//export default Sidebar;
