import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.scss";

import BinaryPlayer from "./components/binary";
import ToggleBtn from "./components/toggle";
const defaultNotes = [
    "G4#",
    "D4#",
    "D4",
    "C4",
    "E4",
    "A4#",
    "C4#",
    "F4",
    "C5",
    "D5",
];
const defaultTimes = [1.6, 1.5, 1.3, 1.2, 0.9, 0.7, 0.6, 0.5, 0.4, 0.3];

const App = () => {
    const [notes, setNotes] = useState(defaultNotes);
    const [on, toggle] = useState(false);
    return (
        <div className='container'>
            <div className='display-wrapper'>
                <BinaryPlayer notes={notes} isPlay={on} times={defaultTimes} />
                <div className='notes-wrapper'>
                    {notes.map(el => (
                        <span className='note' key={el}>
                            {el}
                        </span>
                    ))}
                </div>
                <div className='btn-wrapper'>
                    <ToggleBtn
                        open={on}
                        onClose={() => {
                            toggle(false);
                        }}
                        onOpen={() => {
                            toggle(true);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

ReactDOM.render(<App></App>, document.getElementById("app"));
