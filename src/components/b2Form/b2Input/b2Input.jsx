import {Input} from "reactstrap";
import React from "react";
import classNames from "classnames";
import "./b2Input.scss"
import B2Text from "../../b2Text/b2Text";
import uiVariables from "../../../config/uiVariables";

const B2Input = ({
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
                     onBlur,
                     classes
                 }) => {

    const node = (
        <Input bsSize="md" type={inputType} name={name} id={name} value={value} onChange={onChangeText} onBlur={onBlur}
               placeholder={placeholder} disabled={disabled}/>
    );

    const inputStyle = {
        style,
        marginBottom: marginBottom,
    };

    const labelStyle = {
        fontSize: fontSize
    };

    return (

        <div className={classes} style={inputStyle}>
            {label || isRequired &&
            <div className={"mb-2 d-block"}>
                {label && <B2Text bold style={labelStyle}>{label} </B2Text>}
                {isRequired && <B2Text color={uiVariables.color.red2} style={requiredStyle}>*</B2Text>}
            </div>
            }

            {node}
            <span className={classNames("hintStyle", "small")}>{hint}</span>
        </div>

    )
}

export default B2Input