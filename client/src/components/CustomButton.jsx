/* eslint-disable react/prop-types */
import { snapshot } from "valtio";
import state from "../store";

function CustomButton({ title, customStyle, handleClick, type }) {
  const snap = snapshot(state);

  const generateStyle = (type) => {
    if (type === "filled") {
      return {
        backgroundColor: snap.color,
        color: "#fff",
      };
    }
  };
  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyle}`}
      onClick={handleClick}
      style={generateStyle(type)}
    >
      {title}
    </button>
  );
}

export default CustomButton;
