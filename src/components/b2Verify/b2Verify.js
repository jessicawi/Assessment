import React, {useState} from "react";
import {FormGroup, Input} from "reactstrap";
import {useSelector} from "react-redux";
import constApi from "../../data/constApi";
import Toast from "../../helpers/toast";
import DataSource from "../../data/datasource";
import {useInterval} from "../../helper/hooks";
import K2Button from "../k2Button/k2Button";
import B2Input from "../b2Form/b2Input/b2Input";
import "./b2Verify.scss"
import uiVariables from "../../config/uiVariables";
import {useTranslate} from "../../translations/i18n";
const COUNT_DOWN = 60;

const B2Verify = ({
                      phoneNumber,
                      email,
                      isEmail,
                      value,
                      onChange,
                      style,
                      marginBottom,
                      inputName = "verifyCode",
                      onRequesting,
                      onGetVerifyCodeSuccess,
                      countryCode
                  }) => {

    const userInfo = useSelector(d => d.data[constApi.profile.getProfile.state]);
    const [disabled, setDisabled] = useState(false);
    const [count, setCount] = useState(COUNT_DOWN);
    const {t} = useTranslate()
    const handleSMSCodeClick = async () => {
        if (!email && isEmail) {
            Toast.init.error.show(t("form.emailInsert"));
            return;
        }

        if(!phoneNumber && !isEmail){
            Toast.init.error.show(t("form.mobileInsert"));
            return;
        }

        if (!disabled) {
            try {
                onRequesting && onRequesting();
                let result;
                if (isEmail) {
                    result = await DataSource.shared.getEmailVerifyCode(email);
                }else{
                    result = await DataSource.shared.getSMSVerifyCode(phoneNumber,countryCode);
                }
                if (result) {
                    setCount(COUNT_DOWN);
                    setDisabled(true);
                    onGetVerifyCodeSuccess && onGetVerifyCodeSuccess();
                }
            } catch (e) {
                Toast.init.error.show(e);
            }
        }
    };

    const countDown = () => {
        setCount(count - 1);
        if (count <= 0) {
            setDisabled(false);
        }
    };

    useInterval(countDown, disabled ? 1000 : null);

    return (
        <div className={"position-relative"}>

            <B2Input
                label={t("form.verification")}
                value={value}
                marginBottom={marginBottom}
                onChangeText={onChange}
                placeholder={t("form.verifyInsert")}
                style={style}/>

            <K2Button color={uiVariables.color.fourth} border borderRadius={5} onClick={handleSMSCodeClick} className={"small verifyButton "}>
                <span style={{color:uiVariables.color.fourth}}>{disabled ? `${t("form.verification")}(${count})` : t("form.verification")}</span>
            </K2Button>
        </div>
    )
}

export default B2Verify