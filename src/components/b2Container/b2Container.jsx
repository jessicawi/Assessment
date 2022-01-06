import React from "react";
import classNames from "classnames";
import "./b2Container.scss"

const B2Container = ({size, children}) => {

    return (
        <div className={classNames("container")}>
            {children}
        </div>
    );
};

export default B2Container;