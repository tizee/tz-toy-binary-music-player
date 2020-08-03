import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import * as Tone from "tone";

import "./index.scss";
const pad = "000000000";

interface DisplayProps {
    num: string;
}

interface PlayerProps {
    notes: Array<string>;
    times: Array<number>;
    isPlay: boolean;
}

const padStart = (src: string, pad: string) => {
    return pad.substring(0, pad.length - src.length) + src;
};

const BinaryPlayer: React.FC<PlayerProps> = ({ notes, isPlay, times }) => {
    const [num, setNum] = useState(0);
    const oscRef = useRef(new Tone.PolySynth().toDestination());
    useEffect(() => {
        Tone.Transport.bpm.value = 50;
        return () => {};
    }, []);

    useEffect(() => {
        let id = Tone.Transport.scheduleRepeat(function (time: number) {
            setNum(num => {
                if (num < 1024) {
                    let preBits = padStart(num.toString(2), pad).split("");
                    let bits = padStart((num + 1).toString(2), pad).split("");
                    for (let index = 0; index < preBits.length; index++) {
                        if (
                            bits[index] === "1" &&
                            preBits[index] !== bits[index]
                        ) {
                            // bit flip from 0 to 1
                            console.log(notes[index], index);
                            oscRef.current.triggerAttackRelease(
                                notes[index],
                                times[index],
                                time
                            );
                        }
                    }
                    return num + 1;
                } else {
                    return 0;
                }
            });
        }, "32i");
        return () => {
            console.log("clear schedule events", id);
            Tone.Transport.clear(id);
            Tone.Transport.cancel(0);
        };
    }, [notes]);

    useEffect(() => {
        if (isPlay) {
            Tone.Transport.start();
        } else {
            Tone.Transport.stop();
        }
    }, [isPlay]);
    return <BinaryDisplay num={padStart(num.toString(2), pad)} />;
};

const BinaryDisplay: React.FC<DisplayProps> = ({ num }) => (
    <div className='binary-wrapper'>
        <div className='binary'>
            {num.split("").map((el, i) => {
                return (
                    <span key={i} className='num' data-state={el}>
                        {el}
                    </span>
                );
            })}
        </div>
    </div>
);

export default BinaryPlayer;
