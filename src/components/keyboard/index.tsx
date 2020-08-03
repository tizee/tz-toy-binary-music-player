import React, { useState, useRef } from "react";
import { notes } from "../note";
import "./index.scss";

interface KeyboardProps {
    changeNote: (note: string, idx: number) => void;
    totalNum: number;
}

const Keyboard: React.FC<KeyboardProps> = ({ changeNote, totalNum }) => {
    const [index, set] = useState(0);
    let countBlack = 0;
    return (
        <div className='keyboard-wrapper'>
            <ul id='keyboard'>
                {notes.map((el, idx) => {
                    let cls = ["keyboard-note"];
                    const tokens = el.split("#");
                    let isBlack = false;
                    if (tokens.length > 1) {
                        // sharp note
                        isBlack = true;
                        countBlack++;
                        cls.push("black");
                        cls.push(tokens[0] + "-sharp");
                    } else {
                        cls.push("white");
                        cls.push(tokens[0].split("")[0]);
                    }
                    return (
                        <li
                            key={el + idx.toString()}
                            onClick={e => {
                                e.preventDefault();
                                changeNote(el, index);
                                set(index => (index + 1) % totalNum);
                            }}>
                            <div
                                className={cls.join(" ")}
                                data-note={el}
                                style={{
                                    position: isBlack ? "absolute" : "relative",
                                    height: isBlack ? "60px" : "150px",
                                    width: isBlack ? "15px" : "30px",
                                    left: isBlack
                                        ? 30 * (idx - countBlack) + 22.5 + "px"
                                        : null,
                                }}>
                                {!isBlack ? el : ""}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Keyboard;
