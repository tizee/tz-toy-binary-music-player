import React, { useState } from "react";
import { osc } from "../synth";
import { notes } from "../note";
import "./index.scss";
// signleton

const RCSynth: React.FC = () => {
    const [mouseDown, set] = useState(false);
    const playNote = (note: string) => {
        osc.triggerAttack(note, undefined, 1);
    };
    const relaseNote = () => {
        osc.triggerRelease();
    };
    return (
        <ul className='keyboard'>
            {notes.map((el, idx) => {
                let cls = ["keyboard-note"];
                const tokens = el.split("#");
                if (tokens.length > 1) {
                    // sharp note
                    cls.push("black");
                    cls.push(tokens[0] + "-sharp");
                } else {
                    cls.push("white");
                    cls.push(tokens[0].split("")[0]);
                }
                return (
                    <li
                        className={cls.join(" ")}
                        data-note={el}
                        key={el}
                        onMouseOver={e => {
                            if (!mouseDown) {
                                playNote(el);
                                set(true);
                            }
                        }}
                        onMouseDown={e => {
                            if (!mouseDown) {
                                playNote(el);
                                set(true);
                            }
                        }}
                        onMouseUp={e => {
                            relaseNote();
                            set(false);
                        }}
                        onMouseLeave={e => {
                            relaseNote();
                            set(false);
                        }}
                        onTouchEnd={e => {
                            relaseNote();
                            set(false);
                        }}></li>
                );
            })}
        </ul>
    );
};

export default RCSynth;
