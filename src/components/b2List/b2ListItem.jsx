import React from "react";
import classNames from "classnames";
import "./b2ListItem.scss"

const B2ListItem = ({className, label, value, children}) => {
    const cn = [className];

    let node;
    if (children) {
        node = children;
    } else {
        node = (
            <div className={"_inner"}>
                {label}
                {value}
            </div>
        );
    }

    return (
        <div className={classNames("b2list-item", cn)}>
            {node}
        </div>
    );
};

export default B2ListItem;