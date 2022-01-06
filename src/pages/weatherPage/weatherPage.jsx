import React from "react";
import B2Heading from "../../components/b2Heading/b2Heading";
import B2Row from "../../components/b2Row/b2Row";
import B2Text from "../../components/b2Text/b2Text";
import B2Input from "../../components/b2Form/b2Input/b2Input";
import B2Button from "../../components/b2Button/b2Button";
import uiVariables from "../../config/uiVariables";

const WeatherPage = () => {
    return (
        <div>
            <B2Heading type={"h3"} bold className={"border-bottom pb-3 mb-3"}>Today's Weather</B2Heading>
            <B2Row alignItems={"center"}>
                <B2Text className={"pe-2"}>City</B2Text>
                <B2Input classes={"me-2"}/>
                <B2Text className={"pe-2"}>Country</B2Text>
                <B2Input classes={"me-2"} />
                <B2Button classes={"me-2"}> Search</B2Button>
                <B2Button color={uiVariables.color.error}> Clear</B2Button>
            </B2Row>
        </div>
    )
}

export default WeatherPage