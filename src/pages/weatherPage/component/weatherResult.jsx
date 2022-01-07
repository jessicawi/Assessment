import React from "react";
import B2Section from "../../../components/b2Section/b2Section";
import B2Text from "../../../components/b2Text/b2Text";
import B2Heading from "../../../components/b2Heading/b2Heading";
import B2Row from "../../../components/b2Row/b2Row";
import uiVariables from "../../../config/uiVariables";
import moment from "moment";

const WeatherResult = ({result}) => {
    const {name, sys, weather, main} = result || {};
    return (
        <div className={"px-3 mb-4"}>
            <B2Text fontSize={uiVariables.font.sm}>{name}, {sys?.country}</B2Text>
            <B2Heading bold type={"h3"}>{weather?.[0]?.main}</B2Heading>
            <B2Row>
                <B2Text className={"resultLabel"} color={uiVariables.color.secondary}>Description:</B2Text>
                <B2Text>{weather?.[0]?.description}</B2Text>
            </B2Row>
            <B2Row>
                <B2Text className={"resultLabel"} color={uiVariables.color.secondary}>Temperature:</B2Text>
                <B2Text>{main?.temp_min}°C ~ {main?.temp_max}°C</B2Text>
            </B2Row>
            <B2Row>
                <B2Text className={"resultLabel"} color={uiVariables.color.secondary}>Humidity:</B2Text>
                <B2Text>{main?.humidity}%</B2Text>
            </B2Row>
            <B2Row>
                <B2Text className={"resultLabel"} color={uiVariables.color.secondary}>Time:</B2Text>
                <B2Text>{moment().format("YYYY-MM-DD HH:mm A")}</B2Text>
            </B2Row>
        </div>
    );
};

export default WeatherResult;