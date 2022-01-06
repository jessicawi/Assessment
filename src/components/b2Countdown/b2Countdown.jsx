import React, {useEffect} from "react";
import useAutoRefresh from "../../helper/useAutoRefresh";
import B2Row from "../b2Row/b2Row";
import B2Text from "../b2Text/b2Text";
import uiVariables from "../../config/uiVariables";
import "./b2countdown.scss"
import {useTranslate} from "../../translations/i18n";

const B2CountDown = ({countDownDate, onCountdownDone, shouldRerun, type = 1}) => {
    const [refreshCount, setRefresh] = useAutoRefresh();
    const now = new Date().getTime();
    // Find the distance between now and the count down date
    const distance = countDownDate - now;
    const {t} = useTranslate()
    useEffect(() => {
        setRefresh(handleCountdownCallback, distance);
        return () => setRefresh(null);
    }, []);

    const handleCountdownCallback = async () => {
        if (onCountdownDone) {
            await onCountdownDone();
        }
        if (shouldRerun) {
            setRefresh(handleCountdownCallback, distance);
        }
    };
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (days < 0) {
        days = "0";
    }

    if (hours < 0) {
        hours = "0";
    }
    if (minutes < 0) {
        console.log(minutes,"minutes")

        minutes = "0" ;
    }
    if (seconds < 0) {
        seconds = "0";
    }


    return (
        <B2Row>
            <CountItem title={t("common.day")}>
                <B2Text bold color={"white"} text={`${days}`} marginRight={10}
                        fontSize={uiVariables.font.lg}/><br/>
            </CountItem>
            <CountItem title={t("common.hours")}>
                <B2Text bold color={"white"} text={hours} fontSize={uiVariables.font.lg}/>
            </CountItem>
            <CountItem title={t("common.min")}>
                <B2Text bold color={"white"} text={minutes} fontSize={uiVariables.font.lg}/>
            </CountItem>
            <CountItem title={t("common.second")}>
                <B2Text bold color={"white"} text={seconds} fontSize={uiVariables.font.lg}/>
            </CountItem>
        </B2Row>
    )
}

export default B2CountDown

const CountItem = ({title, children}) => {
    return (
        <div>

            <div className={"countItem"} style={{background: uiVariables.color.bg2}}>
                {children}
            </div>
            <B2Text className={"text-center d-block small mt-1"}>{title}</B2Text>
        </div>
    )
}