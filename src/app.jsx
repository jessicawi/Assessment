import 'react-toastify/dist/ReactToastify.css';
import "./theme/app.scss";
import React, {useState, useEffect} from "react";
import {toast} from "react-toastify";
// import DataSource from "./data/datasource";
// import {autoUpdateState} from "./data/fetchData";
// import constApi from "./data/constApi";
import "./assets/bootstrap.min.css"
import "./assets/font-awesome.min.css"
import Toast from "./helpers/toast";
import WeatherPage from "./pages/weatherPage/weatherPage";
import {Container} from "reactstrap"


toast.configure({
    autoClose: 5000,
    draggable: false,
    closeOnClick: false,
    pauseOnFocusLoss: false
});

const App = () => {
    const [isReady, setIsReady] = useState(true); //permission ready when login
    useEffect(() => {
        const init = async () => {
            getApiOptions().then();
        };
        init().then();
    }, []);

    const getApiOptions = async () => {
        try {
            // await autoUpdateState(constApi.profile.getProfile)
        } catch (e) {
            console.log(e)
            Toast.init.error.show(e)
        }
        setIsReady(false)
    };

    return (
        <Container className={"p-4"}>
            <WeatherPage/>
        </Container>
    );
};

export default App;