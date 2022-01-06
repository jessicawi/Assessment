import React from "react";
import uiVariables from "../../config/uiVariables";
import B2Text from "../b2Text/b2Text";

const B2Section = ({title, children, style, marginTop, marginBottom = 15, padding, paddingHorizontal}) => {
    return (
        <div
            style={{marginBottom:marginBottom,marginTop:marginTop, padding :padding, paddingHorizontal:paddingHorizontal}}>
            {title ? <B2Text style={{marginBottom: 10}} fontSize={uiVariables.font.lg} bold>{title}</B2Text> : null}
            {children}
        </div>
    );
};

export default B2Section;
