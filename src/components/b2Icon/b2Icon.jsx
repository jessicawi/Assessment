import React from "react";
import "./b2Icon.scss"
const B2Icon = ({icon, label, className = "", onClick, title, style}) => {
    return (
        <span className={"b2icon " + className} onClick={onClick} style={style}>
            <i className={`fa fa-${icon}`} aria-hidden="true" title={title || label}/>
            {
                label ? <span className="icon-label">{label}</span> : null
            }
        </span>
    );
};

export default B2Icon;