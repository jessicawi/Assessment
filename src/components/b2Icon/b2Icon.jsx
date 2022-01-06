import { MdFilterNone } from "react-icons/md";
import { FaTwitter, FaDiscord,FaTelegramPlane } from "react-icons/fa";
import React from "react";
import uiVariables from "../../config/uiVariables";

const B2Icon=({type, name, color=uiVariables.color.bgGrey2, marginRight=10, size="1em", onClick})=>{

    let iconNode;
    switch (type){
        case "ma":
            iconNode = <MaterialIcon name={name} color={color} size={size}/>
            break;
        case "fa":
            iconNode = <FAIcon name={name} color={color} size={size}/>
    }
    return(
        <div style={{marginRight:marginRight}} onClick={onClick}>
            {iconNode}
        </div>
    )
}

const MaterialIcon = ({name, color,size})=>{
    let maIcon;
    switch (name){
        case "MdFilterNone" : maIcon = <MdFilterNone color={color} size={size}/>; break;
    }
    return(
        <>
            {maIcon}
        </>
    )
}

const FAIcon = ({name, color,size})=>{
    let maIcon;
    switch (name){
        case "FaTwitter" : maIcon = <FaTwitter color={color} size={size}/>; break;
        case "FaDiscord" : maIcon = <FaDiscord color={color} size={size}/>; break;
        case "FaTelegramPlane" : maIcon = <FaTelegramPlane color={color} size={size}/>; break;
    }
    return(
        <>
            {maIcon}
        </>
    )
}

export default B2Icon