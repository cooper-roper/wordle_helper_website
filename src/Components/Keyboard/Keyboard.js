import React, { useState } from "react";
import "./Keyboard.css";

const VirtualKeyboard = ({ handleClick }) => {
  const keys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  const [keyStates, setKeyStates] = useState(
    keys.reduce((acc, cur) => {
      return { ...acc, ...cur.reduce((acc2, cur2) => ({ ...acc2, [cur2]: false }), {}) };
    }, {})
  );

  const handleKeyClick = (key) => {
    setKeyStates((prevState) => ({ ...prevState, [key]: !prevState[key] }));
    handleClick(key);
  };

  return (
    <div className="virtual-keyboard">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key, keyIndex) => (
            <button
              key={keyIndex}
              className={keyStates[key] ? "keyboard-key pressed" : "keyboard-key"}
              onClick={() => handleKeyClick(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VirtualKeyboard;
