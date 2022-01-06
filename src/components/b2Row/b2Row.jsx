import React from "react";
import classNames from "classnames";
import "./b2Row.scss"
import {constAlignItems, constJustifyContent} from "../../const/constStyle";

const B2Row = ({
                   className,
                   size,
                   isContainer,
                   children,
                   spaceBetween,
                   withpadding,
                   justifyContent = constJustifyContent.flexStart,
                   flexDirection = "row",
                   alignItems = constAlignItems.center
               }) => {
    const cn = [size];

    if (spaceBetween) {
        justifyContent = constJustifyContent.spaceBetween;
    }



    return (
        <div className={classNames("b2row", cn, withpadding && "px-3", isContainer && "container", className)}
             style={{justifyContent: justifyContent, flexDirection: flexDirection, alignItems: alignItems}}>
            {children}
        </div>
    );
};

export default B2Row;