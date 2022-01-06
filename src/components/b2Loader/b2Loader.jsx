import React, {useState, useReducer, useEffect} from "react";

const B2Loader=()=>{
    return(
        <div className={"d-flex align-items-center justify-content-center my-3"}>
            <div className="spinner-border text-primary" role="status">
            </div>
        </div>
    )
}

export default B2Loader