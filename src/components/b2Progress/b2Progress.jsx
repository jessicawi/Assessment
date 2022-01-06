import { Progress } from 'reactstrap';
import React from "react";
import uiVariables from "../../config/uiVariables";

const B2Progress=({progress})=>{
    const value = progress?.replace('%', '')
    return (
        <Progress value={value} barStyle={{backgroundColor:uiVariables.color.fourth}}>{progress}</Progress>
    );
}

export default B2Progress
