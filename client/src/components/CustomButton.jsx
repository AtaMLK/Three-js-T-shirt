/* eslint-disable react/prop-types */
import { snapshot } from "valtio";
import state from "../store";
import { getContrastingColor } from "../config/helpers";

function CustomButton({ title, customStyle, handleClick, type }) {
  const snap = snapshot(state);

  const generateStyle = (type) => {
    if (type === "filled") {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
    } else if (type === "outline") {
      return {
        borderWidth: "1px",
        borderColor: snap.color,
        color: snap.color,
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
