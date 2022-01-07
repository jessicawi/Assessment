import React, {useState, useEffect} from "react";
import B2Text from "../../../components/b2Text/b2Text";
import B2Input from "../../../components/b2Form/b2Input/b2Input";
import B2Button from "../../../components/b2Button/b2Button";
import uiVariables from "../../../config/uiVariables";
import B2Row from "../../../components/b2Row/b2Row";

const WeatherForm=({city, setCity, country, setCountry, getWeather, resetForm})=>{
    return(
        <B2Row alignItems={"center"} className={"mb-4"}>
            <B2Text className={"pe-2"}>City</B2Text>
            <B2Input classes={"me-2"}
                     value={city}
                     onChangeText={(e) => setCity(e.target.value)}/>
            <B2Text className={"pe-2"}>Country</B2Text>
            <B2Input classes={"me-2"}
                     value={country}
                     onChangeText={(e) => setCountry(e.target.value)}/>
            <B2Button classes={"me-2"} onClick={getWeather}> Search</B2Button>
            <B2Button color={uiVariables.color.error} onClick={resetForm}> Clear</B2Button>
        </B2Row>
    )
}

export default WeatherForm