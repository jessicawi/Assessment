import React from "react";
import "./b2Button.scss";
import classNames from "classnames";
import uiVariables from "../../config/uiVariables";

const B2Button = ({color=uiVariables.color.primary, withShadow = true, children,onClick, classes}) => {
    const cn = [color, withShadow && "_shadow"];

    return (
        <button style={{backgroundColor: color}} className={classNames("b2button", cn, classes)} onClick={onClick}>
            {children || "Button"}
        </button>
    );
};

export default B2Button;