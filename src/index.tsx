import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.scss";

import BinaryDisplay from "./components/binary";
import ToggleBtn from "./components/toggle";

const App = () => {
    const [num, set] = useState(0);
    const [on, toggle] = useState(true);
    useEffect(() => {
        let id: any;
        if (on) {
            id = setInterval(() => {
                if (num < 1024) {
                    set(num => num + 1);
                } else {
                    set(0);
                }
            }, 300);
        }
        return () => {
            if (id) {
                clearInterval(id);
            }
        };
    }, [on]);
    return (
        <div className='container'>
            <div className='display-wrapper'>
                <BinaryDisplay num={num} />
                <div className='btn-wrapper'>
                    <ToggleBtn
                        open={on}
                        onClose={() => {
                            toggle(false);
                            set(0);
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
