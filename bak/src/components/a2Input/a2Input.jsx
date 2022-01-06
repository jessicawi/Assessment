import {Input} from "reactstrap";
import React from "react";
import classNames from "classnames";
import A2Text from "../a2Text/a2Text";
import uiVariables from "../../config/uiVariables";

const A2Input = ({
                     marginBottom,
                     label,
                     fontSize,
                     hint,
                     name,
                     value,
                     onChangeText,
                     placeholder,
                     style,
                     disabled,
                     inputType = "text",
                     isRequired,
                     requiredStyle,
                     onBlur
                 }) => {

    const node = (
        <Input bsSize="lg" type={inputType} name={name} id={name} value={value} onChange={onChangeText} onBlur={onBlur}
               placeholder={placeholder} disabled={disabled}/>
    )

    const inputStyle = {
        style,
        marginBottom: marginBottom,
    }

    const labelStyle = {
        fontSize: fontSize
    }

    return (

        <div className={""} style={inputStyle}>
            <div className={"mb-2 d-block"}>
                {label && <A2Text bold style={labelStyle}>{label} </A2Text>}
                {isRequired && <A2Text color={uiVariables.color.red2} style={requiredStyle}>*</A2Text>}
            </div>
            {node}

            <span className={classNames("hintStyle", "small")}>{hint}</span>
        </div>

    )
}

export default A2Input