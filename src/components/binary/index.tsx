import React from "react";
import "./index.scss";
const pad = "000000000";

interface Props {
    num: number;
}
const BinaryDisplay: React.FC<Props> = ({ num }) => (
    <div className='binary-wrapper'>
        <div className='binary'>
            {(pad.substring(0, 10 - num.toString(2).length) + num.toString(2))
                .split("")
                .map(el => {
                    return (
                        <span className='num' data-state={el}>
                            {el}
                        </span>
                    );
                })}
        </div>
    </div>
);

export default BinaryDisplay;
