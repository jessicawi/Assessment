import React from "react";

const A2Heading = ({type, children, color="#000", bold, className}) => {

    let heading, headingStyle;

    headingStyle = {
        color: color,
        fontWeight: bold ? "bold" : "normal"
    };
    switch (type) {
        case "h1":
            heading = <h1 className={className} style={headingStyle}>{children}</h1>;
            break;
        case "h2":
            heading = <h2 className={className} style={headingStyle}>{children}</h2>;
            break;
        case "h3":
            heading = <h3 className={className} style={headingStyle}>{children}</h3>;
            break;
        case "h4":
            heading = <h4 className={className} style={headingStyle}>{children}</h4>;
            break;
        case "h5":
            heading = <h5 className={className} style={headingStyle}>{children}</h5>;
            break;
    }
    return (
        <>
            {heading}
        </>
    )
};

export default A2Heading