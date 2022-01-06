import React, {useEffect, useState} from "react";
import ReactPinField from "react-pin-field"
import "./b2PinInput.scss"
import B2Row from "../../b2Row/b2Row";
const B2PinInput=({handleInputChange})=>{
    return(
        <B2Row justifyContent={"center"} className={"m-auto my-2"}>
            <ReactPinField className="pin-field" length={6} onChange={handleInputChange} />
        </B2Row>
    )
}

export default B2PinInput