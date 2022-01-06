import React, {useEffect, useState} from "react";
import classNames from "classnames";
import "./b2Layout.scss";

const B2Layout = ({size, children}) => {
    const [hasSidebar, setHasSidebar] = useState(false);
    const cn = [size];

    useEffect(() => {
        React.Children.forEach(children, (child, i) => {
            if (!hasSidebar && child?.type?.displayName === "B2Sidebar") {
                setHasSidebar(true)
            }
        });
    }, []);

    return (
        <div className={classNames("b2layout", hasSidebar && "with-sidebar", cn)}>
            {children}
        </div>
    );
};

export default B2Layout;