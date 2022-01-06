import React from "react";
import classNames from "classnames";
import B2ListItem from "./b2ListItem";
import "./b2List.scss";

const B2List = ({className, items, onItemClick}) => {
    const cn = [className];
    const handleItemClick = (data) => {
        if (typeof onItemClick === "function") {
            onItemClick(data);
        }
    };

    return (
        <div className={classNames("b2list", cn)}>
            {Array.isArray(items) && items.map((d, i) =>
                <B2ListItem key={d.value + i} label={d.label} value={d.value} onClick={() => handleItemClick(d)}/>
            )}
        </div>
    );
};

export default B2List;