import React, {useState} from "react";
import classNames from "classnames";
import "./b2Sidebar.scss";

const B2SidebarContent = ({size, children, toggleMenu}) => {
    const [collapsed, setCollapsed] = useState(false);
    const cn = [size];

    const handleToggleClick = () => {
        setCollapsed(!collapsed);
        if (typeof toggleMenu === "function") {
            toggleMenu();
        }
    };

    return (
        <div className={classNames("b2sidebar", collapsed && "_collapsed", cn)}>
            <div className="_header" onClick={handleToggleClick}>
                B.2
            </div>
            {children}
        </div>
    );
};

// true = use cached
const B2Sidebar = React.memo(B2SidebarContent, (prevProps, nextProps) => {
    return false;
});

export default B2Sidebar;
B2Sidebar.displayName = "B2Sidebar";