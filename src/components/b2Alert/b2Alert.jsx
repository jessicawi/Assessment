import React, {useState, useReducer, useEffect} from "react";


const B2Alert = ({children})=>{
    return(
        <span className={"text-danger small p-2"}>
            {children}
        </span>
    )
}

export default B2Alert