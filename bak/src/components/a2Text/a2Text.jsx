import React from "react";
import uiVariables from "../../config/uiVariables";
import classNames from "classnames";

const A2Text = ({
                    link,
                    children,
                    color = uiVariables.color.darkText,
                    className,
                    bold,
                    light,
                    fontSize,
                    text,
                    onClick,
                    prewrap
                }) => {


    let fontWeight;
    if(bold){
        fontWeight = "bold"
    }
    if(light){
        fontWeight = 100
    }
    const linkStyle = {
        color: uiVariables.color.link,
        fontWeight: fontWeight,
    }
    const textStyle = {
        color: color,
        fontWeight: fontWeight,
        fontSize: fontSize
    }
    if (link) {
        return (
            <a onClick={onClick} style={linkStyle} className={classNames(className)}>{children}</a>
        )
    }

    let node = children;
    if (children === undefined || children === null) {
        node = text;
    }

    return (
        <span style={textStyle} className={classNames(className, prewrap && "pre-wrap")}>{node}</span>
    )
}

export default A2Text