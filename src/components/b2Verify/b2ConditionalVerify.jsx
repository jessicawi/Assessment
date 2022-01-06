import B2PinInput from "../b2Form/b2PinInput/b2PinInput";
import B2Verify from "./b2Verify";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import constApi from "../../data/constApi";
import Toast from "../../helpers/toast";
import B2Modal from "../b2Modal/b2Modal";
import {B2Row} from "../index";
import K2Button from "../k2Button/k2Button";
import {FormGroup} from "reactstrap";
import i18n, {useTranslate} from "../../translations/i18n";
import i18next from "i18next";

const B2ConditionalVerify = ({handleInputChange, state, verifyType, modal, setModal, onSubmit}) => {
    const userInfo = useSelector(d => d.data[constApi.profile.getProfile.state]);
    const [isVerifyCodeSent, setIsVerifyCodeSent] = useState(false);
    const {t} = useTranslate()
    const handleGetVerifyCodeSuccess = () => {
        Toast.init.success.show(`Please check ${verifyType} for verification Code`)
        setIsVerifyCodeSent(true);
    };

    const handleRequestingVerifyCode = () => {
        setIsVerifyCodeSent(false);
    };

    let node;
    switch (verifyType) {
        case 1:
            node = (
                <B2Modal isOpen={modal === "password"} setModal={setModal} modal={modal}
                         title={t("form.secondPassword")}>
                    <B2PinInput handleInputChange={(e) => handleInputChange(e, "SecondPassword")}/>
                    <B2Row justifyContent={"center"}>
                        <K2Button size={"lg"} width={100} onClick={onSubmit}>{i18n.t("common.submit")}</K2Button>
                    </B2Row>
                </B2Modal>
            )
            break;
        case 3 :
            node = (
                <B2Verify value={state?.VerificationCode}
                          onChange={(e) => handleInputChange(e.target.value, "TempPassword")}
                          marginBottom={30}
                          email={userInfo?.Email}
                          isEmail
                          onRequesting={handleRequestingVerifyCode}
                          onGetVerifyCodeSuccess={handleGetVerifyCodeSuccess}
                          inputName={"VerificationCode"}/>
            )
            break;
        case 2 :
            node = (
                <B2Verify value={state?.VerificationCode}
                          onChange={(e) => handleInputChange(e.target.value, "TempPassword")}
                          marginBottom={30}
                          email={userInfo?.MobileNo}
                          countryCode={userInfo?.MobileDialCode}
                          isEmail
                          onRequesting={handleRequestingVerifyCode}
                          onGetVerifyCodeSuccess={handleGetVerifyCodeSuccess}
                          inputName={"VerificationCode"}/>
            )
            break;
    }

    return (
        <>
            {node}
        </>
    )
}

export default B2ConditionalVerify