import React, { useEffect, useRef } from "react";
import "./Row.css";

const Row = ({ value, color, isFocused, row, column, handleInputClick }) => {
    const inputRefs = useRef([]);

    useEffect(() => {
        if (isFocused)
            inputRefs.current[column].focus();
    }, [isFocused, column]);
    

    return(
        <div>
            <div className="Row">
                {/* create 5 text input fields using a loop*/}
                {[...Array(5).keys()].map((index) => (
                    <input 
                        className="Input"
                        style={{backgroundColor: "light"+color, textTransform: "uppercase"}}
                        key={index} 
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        index={index}
                        value={value[index]} 
                        pattern="[a-zA-Z]+"
                        maxLength={1} 
                        readOnly
                        onClick={(e) => handleInputClick({row: row, col: index})}
                    />
                ))}
            </div>
        </div>
    );
};

export default Row;
