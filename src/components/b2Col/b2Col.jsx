import React from "react";
import classNames from "classnames";
import "./b2Col.scss";

const B2Col = ({size, width, children}) => {
    const cn = [size];

    return (
        <div className={classNames("b2col", cn)} style={{width: width}}>
            {children}
        </div>
    );
};

export default B2Col;