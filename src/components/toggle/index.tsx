import React from "react";
import "./index.scss";

interface Props {
    open: boolean; // toggle state
    onOpen: Function; // on open callback
    onClose: Function; // on close callback
}

const SlideToggle: React.FC<Props> = ({ open, onClose, onOpen }) => {
    const cls = "tz-toggle-wrapper " + (open ? "on" : "off");
    return (
        <div
            className={cls}
            onClick={() => {
                if (open) {
                    onClose();
                } else {
                    onOpen();
                }
            }}>
            <div className='tz-slide-bar'>
                <div className='tz-circle'></div>
            </div>
        </div>
    );
};

export default SlideToggle;
