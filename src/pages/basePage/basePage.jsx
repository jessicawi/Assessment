import "./basePage.scss";
import React, {useEffect, useContext, useState} from "react";
import Check from "../../components/customIf/customIf";
import {RootContext} from "../../app";
import B2Loader from "../../components/b2Loader/b2Loader";
import K2Button from "../../components/k2Button/k2Button";
import assets from "../../assets/assets";
import Toast from "../../helpers/toast";
import B2Popover from "../../components/b2Popover/b2PopOver";
import DataSource from "../../data/datasource";
import B2Text from "../../components/b2Text/b2Text";
import uiVariables from "../../config/uiVariables";
import {constLocale} from "../../const/constCommon";
import constDispatch from "../../redux/constDispatch";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {useMediaQuery} from "react-responsive";
import {B2Row} from "../../components";
import useMenuToggle from "../../layout/useMenuToggle";
import LanguageDropdown from "../../componentUX/languageDropdown/languageDropdown";

const BasePage = ({isLoading, title, className = "", children}) => {
    const {commonContentStore} = useContext(RootContext);
    const [popoverOpen, setPopoverOpen] = useState(false)
    const isMobile = useMediaQuery({query: '(max-width: 768px)'})
    const [menuCollapse, toggleMenu] = useMenuToggle();

    // useEffect(() => {
    //     if (title) {
    //         dispatch({type: "setTitle", data: title});
    //     }
    // }, [title]);
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: constDispatch.setMenuCollapse, payload: true});
    },[])
    let buttonsNode = null;
    const node = [];
    React.Children.forEach(children, (child, i) => {
        if (child?.type?.displayName === "BasePageButtons") {
            buttonsNode = child;
        } else {
            node.push(child);
        }
    });

    const handleButton = () => {

    }

    const handleLogout = async () => {
        await DataSource.shared.logout()
    }

    const handleMenu=()=>{
        toggleMenu()
        dispatch({type: constDispatch.setMenuCollapse, payload: menuCollapse});
    }
    return (
        <div className={`base-page ${className}`}>
            <div className={"base-page-header"}>
                {title && <h1 className="page-title">{title}</h1>}
                {buttonsNode}
                <div className={"d-flex"}>
                    <K2Button color={uiVariables.color.fourth} id={"account"} withoutbackground
                              className={"rounded-circle me-2 mb-2 headerIcon"}
                              onClick={handleButton}
                              style={{backgroundColor: "#221A64"}}>
                        <img src={assets.icon.account} height={23}/>
                    </K2Button>
                    <B2Popover placement={"bottom"} popoverOpen={popoverOpen} setPopoverOpen={setPopoverOpen}
                               target={"account"}>
                        <a onClick={handleLogout}>{t("common.logout")}</a>
                    </B2Popover>
                    <LanguageDropdown/>

                    {isMobile &&
                    <B2Text className={"ms-2"} link onClick={handleMenu}>
                        <img src={assets.icon.menu} height={30}/>
                    </B2Text>
                    }
                </div>
            </div>
            {isLoading && <B2Loader/>}
            {node}
            <div className={"base-page-footer"}>
                <B2Text color={uiVariables.color.secondary}>© 2021 - Nuxio</B2Text>
            </div>
        </div>
    );
};


// optimize rendering by return cached component if not active
const MemoBasePage = React.memo(BasePage, (prevProps, nextProps) => {
    return nextProps.active === false;
});

export default BasePage;
