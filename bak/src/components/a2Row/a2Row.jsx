import React from "react";
import classNames from "classnames";
import {constAlignItems, constJustifyContent} from "../../const/constStyle";

const A2Row = ({
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
        <div className={classNames(cn, withpadding && "px-3", isContainer && "container", className)}
             style={{justifyContent: justifyContent, flexDirection: flexDirection, alignItems: alignItems, display: "flex"}}>
            {children}
        </div>
    );
};

export default A2Row;