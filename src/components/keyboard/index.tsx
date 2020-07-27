import React, { useState } from "react";
import * as Tone from "tone";
import { notes } from "../utils/notes";

const RCSynth: React.FC = () => {
    const osc = new Tone.Synth({
        oscillator: {
            partials: [0, 2, 3, 4],
        },
    }).toDestination();
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
