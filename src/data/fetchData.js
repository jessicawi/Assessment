import DataSource from "./datasource";
import constDispatch from "../redux/constDispatch";
import {dispatchState} from "../redux/dispatcher";
import {constPackageTypeName, constTransactionType} from "../const/constContract";
import {batch} from "react-redux";
import {getDateString, getStartOfMonth, getTodayDateString} from "../helper/util";
import constApi from "./constApi";

export const autoUpdateProfile = async () => {
    try {
        const profile = await DataSource.shared.getProfile();
        if (profile) {
            dispatchState(constDispatch.setUser, profile?.Data);
        }
    } catch (e) {
        console.log("autoUpdateProfile err", e);
        if (e?.Message === "Authorization has been denied for this request.") {
            throw e;
        }
    }
};

export const autoUpdateMemoList = async () => {
    try {
        const memo = await DataSource.shared.GetMemoList();
        if (memo) {
            let activeMemoList = memo?.Data?.ItemList.filter(d => d.Status > 0);
            dispatchState(constDispatch.setMemoList, activeMemoList);
        }
    } catch (e) {
        console.log("autoUpdateMemo err", e);
    }
};

export const autoUpdateTeam = async () => {
    try {
        const response = await DataSource.shared.getTeam();
        if (response) {
            dispatchState(constDispatch.setUserTeam, response);
        }
    } catch (e) {
        console.log('autoUpdateTeam err', e);
    }
};

export const autoUpdateInviteQrcode = async () => {
    try {
        const response = await DataSource.shared.getInviteQRCodeBase64();
        if (response) {
            dispatchState(constDispatch.setQrcode, response?.Data?.QR || response);
        }
    } catch (e) {
        console.log('autoUpdateInviteQrcode err', e);
    }
};

export const autoUpdateInvitation = async () => {
    try {
        const response = await DataSource.shared.getInvitation();
        if (response) {
            dispatchState(constDispatch.setInvitation, response?.Data);
        }
    } catch (e) {
        console.log('autoUpdateInvitation err', e);
    }
};

export const autoUpdateWalletAddressQR = async () => {
    const response = await DataSource.shared.getWalletQRCodeBase64();
    if (response) {
        dispatchState(constDispatch.setWalletQrcode, response?.Data);
    }
};

export const autoUpdateTradeList = async () => {
    try {
        const result = await DataSource.shared.getTradeList();
        if (result?.Data) {
            dispatchState(constDispatch.setTradeList, result?.Data);
        }
    } catch (e) {
        console.log("autoUpdateTradeList err", e);
    }
};

export const autoUpdateComplainList = async () => {
    try {
        const result = await DataSource.shared.getComplainList();
        if (result?.Data?.ItemList) {
            dispatchState(constDispatch.setComplainList, result?.Data?.ItemList);
        }
    } catch (e) {
        console.log("autoUpdateTradeList err", e);
    }
};

export const autoUpdateMiningPackageList = async () => {
    try {
        const result = await DataSource.shared.getMiningPackageList();
        // if (result?.Data?.ItemList) {
        //     dispatchState(constDispatch.setComplainList, result?.Data?.ItemList);
        // }
    } catch (e) {
        console.log("autoUpdateMiningPackageList err", e);
    }
};

export const autoUpdateTransactionList = async (DateFrom, DateTo) => {
    try {
        if (!DateFrom) {
            const startOfMonth = getStartOfMonth();
            DateFrom = getDateString(startOfMonth);
        }
        if (!DateTo) {
            DateTo = getTodayDateString();
        }

        const [migos, migo] = await Promise.all([
            DataSource.shared.getTransactionByType({
                id: 0,
                TransactionType: constTransactionType.RW6,
                DateFrom,
                DateTo
            }),
            DataSource.shared.getTransactionByType({
                id: 0,
                TransactionType: constTransactionType.RW1,
                DateFrom,
                DateTo
            })
        ]);

        let result = [];
        if (migos?.Data?.ItemList) {
            result = migo?.Data?.ItemList;
        }

        if (migo?.Data?.ItemList) {
            result = [...migo?.Data?.ItemList];
        }

        const cateResult = _categorizeByPackageID(result);

        batch(() => {
            dispatchState(constDispatch.setTransactionGroup, cateResult);
            dispatchState(constDispatch.setTransactionList, result);
        });

        return result;
    } catch (e) {
        console.log('err', e);
    }
};

const _categorizeByPackageID = (array) => {
    const result = [];
    array?.forEach(d => {
        const exist = result.find(v => v.PackageID === d.PackageID);
        if (exist) {
            exist.list = [...exist.list, d];
        } else {
            const obj = {
                PackageID: d.PackageID,
                PackageName: d.PackageName,
                list: [d]
            };
            result.push(obj);
        }
    });
    return result;
};

export const autoUpdateTransactionListByPackageList = async (packageArr, isMyRecord) => {
    if (!Array.isArray(packageArr)) {
        console.log("autoUpdateTransactionListByPackageList not arr");
        return;
    }

    try {
        const promises = [];
        for (const packageObj of packageArr) {
            const promise = _getTransactionByType(packageObj, isMyRecord);
            promises.push(promise);
        }

        const result = await Promise.all(promises);
        // console.log("autoUpdateTransactionListByPackageList", result?.map(d => d.PackageName_CN));
        if (result) {
            dispatchState(constDispatch.setTransaction, result);
        }
    } catch (e) {
        console.log("autoUpdateTransactionListByPackageList err", e);
    }
};

const _getTransactionByType = async (packageObj, isMyRecord) => {
    const {PackageID, packageType, PackageName_CN, PackageName_EN} = packageObj;

    let transactionType;
    if (packageType === constPackageTypeName.MIGO) {
        transactionType = constTransactionType.RW1;
    }
    if (packageType === constPackageTypeName.MIGOs) {
        transactionType = constTransactionType.RW6;
    }
    if (transactionType) {
        const result = await DataSource.shared.getTransactionByType({
            id: PackageID,
            TransactionType: transactionType
        });

        if (result?.Data?.ItemList) {
            return {
                PackageID,
                transactionType,
                packageType,
                PackageName_CN,
                PackageName_EN,
                list: result?.Data?.ItemList
            };
        }
    }
};

export const autoUpdateDownLine = async () => {
    try {
        const result = await DataSource.shared.getFirstLevel();
        if (result?.Data) {
            dispatchState(constDispatch.setDownLine, result?.Data);
        }
    } catch (e) {
        console.log("autoUpdateDownLine err", e);
    }
};

export const autoUpdateContentURLList = async () => {
    try {
        const result = await DataSource.shared.getContentURLList();
        if (result?.Data?.ItemList) {
            dispatchState(constDispatch.setContentURLList, result?.Data?.ItemList);
        }
    } catch (e) {
        console.log("autoUpdateContentURLList err", e);
    }
};


export const autoUpdateGiftList = async () => {
    try {
        const result = await DataSource.shared.getGiftList();
        if (result?.Data?.ItemList) {
            dispatchState(constDispatch.setGiftList, result?.Data?.ItemList);
        }
    } catch (e) {
        console.log("autoUpdateContentURLList err", e);
    }
};

export const autoUpdateCountryCodeList = async () => {
    try {
        const result = await DataSource.shared.getCountryCodeList();
        if (result?.Data?.ItemList) {
            dispatchState(constDispatch.setCountryCodeList, result?.Data?.ItemList);
        }
    } catch (e) {
        console.log("autoUpdateCountryCodeList err", e);
    }
};

export const autoUpdateRewardRecordList = async () => {
    try {
        const result = await DataSource.shared.getRewardRecord();
        if (result?.Data?.ItemList) {
            dispatchState(constDispatch.setRewardRecordList, result?.Data?.ItemList);
        }
    } catch (e) {
        console.log("autoUpdateRewardRecordList err", e);
    }
};

export const autoUpdateState = async (apiObj, queryObject, requestBody, responseDataName, doNotUpdateState) => {
    // console.log("autoUpdateState", apiObj.url);
    if (!apiObj?.url) {
        throw "Invalid Url";
    }

    try {
        const response = await DataSource.shared.callAPI2(apiObj.url, apiObj?.method || "GET", queryObject, requestBody);
        // console.log("responseresponse",response)

        const data = responseDataName ? response?.[responseDataName] : response?.Data;
        if (data && !doNotUpdateState) {
            dispatchState(constDispatch.setData, {name: apiObj.state, data: data});
        }
        return data;
    } catch (e) {
        console.log(`${apiObj?.url} err`, e);
        throw e;
    }
};

export const dispatchData = (apiObj, response, responseDataName) => {
    const data = responseDataName ? response?.[responseDataName] : response?.Data;
    if (data) {
        dispatchState(constDispatch.setData, {name: apiObj.state, data: data});
    }
    return data;
};

export const callApi = async (apiObj, queryObj, requestBody) => {
    if (typeof apiObj !== "object") {
        throw  "callApi param is not object";
    }
    // console.log("queryObj", queryObj);
    console.log("requestBody", requestBody);
    if (requestBody && typeof requestBody !== "object") {
        throw  "requestBody must be object";
    }

    try {
        const {url, method = "GET", queryObject, reqBody} = apiObj || {};
        let reqBodyToSend = {};
        if (reqBody) {
            Object.keys(reqBody).forEach(d => {
                const exist = requestBody[d] !== undefined;
                if (exist) {
                    reqBodyToSend[d] = requestBody[d];
                }
            });
        } else {
            reqBodyToSend = requestBody;
        }

        let queryObjToSend = {};
        if (queryObject) {
            Object.keys(queryObj).forEach(d => {
                const exist = queryObj[d] !== undefined;
                if (exist) {
                    queryObjToSend[d] = queryObj[d];
                }
            });
        } else {
            queryObjToSend = queryObj;
        }
        // console.log(":queryObjToSend", queryObjToSend);
        const response = await DataSource.shared.callAPI2(url, method, queryObjToSend, reqBodyToSend);
        return response;
    } catch (e) {
        throw e;
    }
};


export const generateDialCodes = async () => {
    try {
        const result = await autoUpdateState(constApi.common.countryList, undefined, undefined, undefined, true);
        if (result?.ItemList) {
            const array = result?.ItemList.map(d => {
                const countryName = d.CountryName?.replace(/\s/g, "");
                return {
                    label: `${countryName}(+${d.Dialcode})`,
                    value: d.Dialcode,
                    currency: d.Currency
                };
            });
            dispatchState(constDispatch.setData, {name: constApi.common.countryList.state, data: array});
        }
    } catch (e) {
        console.log("autoUpdateCountryCodeList err", e);
    }
};

export const fetchAllDataBeforeLogin = async () => {
    try {
        await Promise.all([
            autoUpdateState(constApi.system.systemVersion),
            generateDialCodes()
        ]);
    } catch (e) {

    }
};

export const fetchAllDataAfterLogin = async () => {
    try {
        await Promise.all([
            autoUpdateState(constApi.mining.pointDeductionOptions),
            autoUpdateState(constApi.wallet.deposit.a10Address),
            autoUpdateState(constApi.market.watchList),
            autoUpdateState(constApi.profile.activateCost)
        ]);
        autoUpdateInviteQrcode().then();
        autoUpdateInvitation().then();
        autoUpdateContentURLList().then();
        autoUpdateState(constApi.dapp.dappList).then();
        autoUpdateState(constApi.article.articleList).then();
        autoUpdateState(constApi.trade.tradeList).then();
    } catch (e) {

    }
};

export const autoUpdateLocale = async () => {
    try {
        const response = await DataSource.shared.getLanguage()
        dispatch({type: constDispatch.setLocale, payload: response});
        return response
    } catch (e) {
        console.log(e)
    }
}