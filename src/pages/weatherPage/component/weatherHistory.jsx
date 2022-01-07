import React from "react";
import B2Row from "../../../components/b2Row/b2Row";
import B2Text from "../../../components/b2Text/b2Text";
import B2Icon from "../../../components/b2Icon/b2Icon";
import uiVariables from "../../../config/uiVariables";

const WeatherHistory = ({getWeather, setCity, setCountry, handleDeleteHistory, history}) => {

    const handleSearch = (d) => {
        setCity(d?.city);
        setCountry(d?.country);
        getWeather();
    };
    let historyNode;
    if (history?.length) {
        historyNode = history?.map((d, i) => {
            let index = i + 1;
            const {city, country, time} = d || {};

            return (
                <B2Row spaceBetween className={"border-bottom pb-2 mb-2"} key={i}>
                    <B2Text>{index}. {city}{country && `, ${country}`}</B2Text>
                    <B2Row>
                        <B2Text className={"me-2"}>{time}</B2Text>
                        <B2Icon style={{cursor: "pointer"}} className={"me-2"} icon={"search"}
                                onClick={() => handleSearch(d)}/>
                        <B2Icon style={{cursor: "pointer"}} className={"me-2 error"} icon={"trash"}
                                onClick={() => handleDeleteHistory(i)}/>
                    </B2Row>
                </B2Row>
            );
        });
    }else{
        historyNode = (
            <B2Row justifyContent={"center"} className={"py-3"}>
                <B2Text color={uiVariables.color.secondary}>No Record</B2Text>
            </B2Row>
        )
    }

    return (
        <>
            {historyNode}
        </>

    );
};

export default WeatherHistory;