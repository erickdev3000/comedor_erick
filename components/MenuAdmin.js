import { useState, useEffect } from 'react';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
const classes = require('./../styles/menu.module.css');

export default function MenuAdmin(props) {
  const [visible, setVisible] = useState(props.visible);

  useEffect(() => {
    setVisible(props.visible);
  }, []);

  let section = (title, componentName, Component) => {
    return (
      <>
        {/* Title of the section */}
        {visible ? null : <h1 className={'centered '}>{title}</h1>}        
        <button
          type="button"
          className={'btn btn-info ' + classes.hideButton}
          onClick={(e) => setVisible(!visible)}
        >
          {/* Show/Hide button */}
          {visible ? (
            <>
              <BsEye /> Mostrar {componentName}
            </>
          ) : (
            <>
              <BsEyeSlash /> Ocultar {componentName}
            </>
          )}
        </button>
        {/* Render of the Component */}
        {visible ? null : Component}
      </>
    );
  };
  return (
    <div>{section(props.title, props.componentName, props.Component)}</div>
  );
}
