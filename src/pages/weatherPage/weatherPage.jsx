import React, {useState} from "react";
import B2Heading from "../../components/b2Heading/b2Heading";
import uiVariables from "../../config/uiVariables";
import DataSource from "../../data/datasource";
import Toast from "../../helpers/toast";
import WeatherForm from "./component/weatherForm";
import moment from "moment";
import WeatherHistory from "./component/weatherHistory";
import WeatherResult from "./component/weatherResult";

const WeatherPage = () => {
    const [city, setCity] = useState("Penang");
    const [country, setCountry] = useState("Malaysia");
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    const getWeather = async () => {
        try {
            const response = await DataSource.shared.getWeatherByCity(city, country);
            if(response){
                setResult(response)
            }
            handleHistory();
        } catch (e) {
            Toast.init.error.show(e);
            console.log(e, "getWeather err");
        }
    };

    const handleHistory = () => {
        let search = {
            city: city,
            country: country,
            time: moment().format("HH:mm:ss A")
        };
        if (history?.length) {
            setHistory(d => {
                return [
                    search,
                    ...d,
                ];
            });
        } else {
            setHistory([search]);
        }
    };

    const resetForm = () => {
        setCountry("");
        setCity("");
    };

    const handleDeleteHistory = (index) => {
        const tempHistory = history.filter((d, i) => i !== index);
        setHistory(tempHistory);
    };

    return (
        <div className={"rounded p-4"} style={{backgroundColor: uiVariables.color.bg2, minHeight: "80vh"}}>
            <B2Heading type={"h3"} bold className={"border-bottom pb-3 mb-3"}>Today's Weather</B2Heading>
            <WeatherForm getWeather={getWeather} country={country} setCountry={setCountry} city={city}
                         resetForm={resetForm} setCity={setCity}/>
            {result && <WeatherResult result={result} />}
            <B2Heading type={"h5"} bold className={"border-bottom pb-3 mb-3"} color={uiVariables.color.secondary}>Search
                History</B2Heading>
            <WeatherHistory history={history} getWeather={getWeather} setCountry={setCountry}
                            setCity={setCity} handleDeleteHistory={handleDeleteHistory}/>
        </div>
    );
};

export default WeatherPage;