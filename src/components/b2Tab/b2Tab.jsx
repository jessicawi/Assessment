import React, {useState} from "react";
import "./b2Tab.scss"
import classNames from "classnames";

const B2Tab = ({options, setSelectedTab, selectedTab, isHorizontal = false}) => {
    const handleTabClick = (i) => {
        setSelectedTab(i)
    }
    const tabItem = options?.map((d, i) => {
        return (
            <div onClick={() => handleTabClick(i)}
                 className={classNames(isHorizontal ? "tabLine" : "tabItem", selectedTab === i && "selected")}>
                {d?.image && <img src={d?.image}/>}
                {isHorizontal ?
                    <strong>{d?.label}</strong>
                    :
                    d?.label
                }
            </div>
        )
    })

    return (
        <div className={"row b2Tab"}>
            <div className={classNames(isHorizontal ? "d-flex" : "col-3")}>
                {tabItem}
            </div>
        </div>
    )
}

export default B2Tab