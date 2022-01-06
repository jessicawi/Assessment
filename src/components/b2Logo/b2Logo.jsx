import assets from "../../assets/assets";
import React, {useEffect, useContext} from "react";

const B2Logo=({type, height=60, width="auto"})=>{
    let source, sourceStyle;
    switch (type){
        case 1:
           source = assets.image.logo
           break;
        case 2:
            source = assets.image.logoIcon
            sourceStyle = {borderRadius:50, overflow:'hidden', maxWidth:"none"}
            break;
        case 3:
            source = assets.image.logoLong
            break;
        case 4:
            source = assets.image.logoWhite
            break;
    }
    return(
        <div>
            <img style={sourceStyle} src={source} width={width} height={height}/>
        </div>
    )
}

export default B2Logo