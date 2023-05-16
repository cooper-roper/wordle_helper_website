import React, { useEffect, useState } from "react";
import Row from '../Row/Row';
import "./RowList.css";
import ResultsProvider from "../ResultsProvider";
import VirtualKeyboard from "../Keyboard/Keyboard";

const RowList = () => {
    const [rowStates, setRowStates] = useState([{'array': [], 'color': "green"}, {'array': [], 'color': "yellow"}]);
    const [results, setResults] = useState('');
    const [selectedPosition, setSelectedPosition] = useState({ row: 0, col: 0 });
    const [grays, setGrays] = useState([]);

    const handleKeyboardClick = (key) => {
        setGrays(prevGrays => {
            if (prevGrays.includes(key)) {
              return prevGrays.filter(gray => gray !== key);
            }
            else {
              return [...prevGrays, key];
            }
          });
    };

    const handleInputClick = (pos) => {
        setSelectedPosition(pos);
    };

    const isAlpha = function(ch){
        return /^[A-Z]$/i.test(ch);
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            const { key } = event;
            if (key === "ArrowUp"  && selectedPosition.row > 0){
                setSelectedPosition({
                    row: selectedPosition.row - 1, 
                    col: selectedPosition.col
                });
            }
            else if (key === "ArrowDown" && selectedPosition.row < rowStates.length - 1){
                setSelectedPosition({
                    row: selectedPosition.row + 1, 
                    col: selectedPosition.col
                });
            }
            else if (key === "ArrowLeft" && selectedPosition.col > 0){
                setSelectedPosition({
                    row: selectedPosition.row, 
                    col: selectedPosition.col - 1
                });
            }
            else if (key === "ArrowRight" && selectedPosition.col < 4){
                setSelectedPosition({
                    row: selectedPosition.row, 
                    col: selectedPosition.col + 1
                });
            }
            else if (key === "Backspace"){
                // delete letter
                const newRowStates = [...rowStates];
                newRowStates[selectedPosition.row]['array'][selectedPosition.col] = '';
                setRowStates(newRowStates, selectedPosition.row);
                if (selectedPosition.col > 0) 
                    setSelectedPosition({
                        row: selectedPosition.row, 
                        col: selectedPosition.col - 1
                    });
            }
            else if (isAlpha(key)) {
                const newRowStates = [...rowStates];
                newRowStates[selectedPosition.row]['array'][selectedPosition.col] = key;
                setRowStates(newRowStates, selectedPosition.row);
                if (selectedPosition.col < 4) 
                    setSelectedPosition({
                        row: selectedPosition.row, 
                        col: selectedPosition.col + 1
                    });
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedPosition, rowStates]);


    const createYellow = () => {
        if (rowStates.length < 5) 
            setRowStates([...rowStates, {'array': [], 'color': "yellow"}]);
    };

    const deleteYellow = () => {
        if (rowStates.length > 1)
            setRowStates(rowStates.slice(0, -1));
    };

    const clearResults = () => {
        setResults('');
    }

    const getRowComponent = (rowState, index) => {
        return (
                <Row 
                    key={index} 
                    value={rowState['array']} 
                    color={rowState['color']} 
                    isFocused={index === selectedPosition.row}
                    row = {index}
                    column={selectedPosition.col}
                    handleInputClick={handleInputClick}
                />
            );
    };

    const getResults = () => {
        const resultRows = [...rowStates];
        resultRows.push({'array': grays, 'color': "gray"});
        console.log(resultRows);
        const results = ResultsProvider(resultRows);
        setResults(results);
    }

    return(
        //put into rows
        <div>
            <div className="row-container">
                {/* create elements in rows state */}
                {rowStates.map((rowState, index) => (
                    <div key={index} className="rows">
                        {getRowComponent(rowState, index)}
                    </div>
                ))}
                <VirtualKeyboard handleClick={handleKeyboardClick}/>
                <div className="result-container">
                    {results ? results.map((result, index) => 
                        (<span key={index}>{result}</span>)) 
                    :''}
                </div>
            </div>
            <div className="button-container">
                <button style={{background:'lightyellow'}} onClick={createYellow}> + </button>
                <button style={{background:'lightyellow'}} onClick={deleteYellow}> - </button>
                <button style={{background:'lightgreen'}} onClick={getResults}> = </button>
                <button style={{background:'pink'}} onClick={clearResults}> x </button>
            </div>
        </div>
    );
}

export default RowList;