import Select from "react-select";
import React, {useState, useEffect} from "react";

const B2Select=({placeholder, onChange, isLoading, disabled, isClearable, value, name, options, className, style})=>{
    return(
            <Select
                className={`${className} `}
                value={value || null}
                name={name} id={`${name}id`}
                options={options}
                placeholder={placeholder}
                onChange={onChange}
                isLoading={isLoading}
                isDisabled={disabled}
                isOptionDisabled={option => option.disabled}
                isClearable={isClearable}
                isSearchable={false}
            />
    )
}

export default B2Select