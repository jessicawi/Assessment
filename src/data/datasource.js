import {fetchWithTimeout, NewRequest, parseResponseAndHandleErrors, URLForEndpoint} from "./request";
import {ERROR_SERVER_UNREACHABLE} from "../const/constError";
// import Cookies from "js-cookie";
// import JWTDecode from "jwt-decode";
// import {dispatchState} from "../redux/dispatcher";
// import constDispatch from "../redux/constDispatch";

const COOKIES_EXPIRES = 365;

export default class DataSource {
    constructor() {

    }

    static get shared() {
        if (!DataSource.instance) {
            DataSource.instance = new DataSource();
        }
        return DataSource.instance;
    }

    async callAPI(endPoint, method = "GET", queryObject, requestBody, hasContentType = false) {
        const url = URLForEndpoint(endPoint, queryObject);
        const request = NewRequest(method, null, hasContentType);
        if (!hasContentType) {
            delete request.headers['Content-Type'];
            request.body = requestBody;
        } else if (method !== "GET" && requestBody) {
            request.body = JSON.stringify(requestBody);
        }
        let response;
        try {
            response = await fetch(url, request);
        } catch (err) {
            console.log("callAPI err", err);
            throw ERROR_SERVER_UNREACHABLE;
        }

        try {
            return await parseResponseAndHandleErrors(response);
        } catch (err) {
            console.log(err, "parseResponseAndHandleErrors");
        }
    }

    async callAPI2(endPoint, method = "GET", queryObject, requestBody, isJSON = true, isFormData, skipCodeCheck = false, timeOut, shouldThrow = false) {
        const url = URLForEndpoint(endPoint, queryObject);
        console.log("url", url);
        // console.log("requestBody", requestBody);
        let formBody = [], formData = null;
        if (isFormData && requestBody) {
            formData = new FormData();
            for (let property in requestBody) {
                // do not assigned undefined in body
                if (requestBody.hasOwnProperty(property) && requestBody[property] !== undefined) {
                    const isImages = property.startsWith("ImageFilePath");
                    if (isImages) {
                        const value = requestBody[property];
                        // split / and choose the last part ("file:///data/user/0/xx/xx/ImagePicker/randomFileName.jpg")
                        const filename = value?.uri?.split('/').pop();
                        const match = /\.(\w+)$/.exec(filename);
                        const type = match ? `image/${match[1]}` : `image`;
                        formData.append(property, {
                            uri: value?.uri,
                            name: filename,
                            type
                        });
                    } else {
                        formData.append(property, requestBody[property]);
                    }
                }
            }
        } else if (requestBody) {
            for (let property in requestBody) {
                const encodedKey = encodeURIComponent(property);
                const encodedValue = encodeURIComponent(requestBody[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
        }

        const request = {
            headers: {
                'Content-Type': isFormData ? 'multipart/form-data;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=UTF-8',
                "Authorization": "Bearer " + this.token
            },
            method: method,
        };

        if (method !== "GET") {
            request.body = isFormData ? formData : formBody;
        }

        let response;
        try {
            if (timeOut) {
                response = await fetchWithTimeout(url, request, timeOut);
            } else {
                response = await fetch(url, request);
            }
        } catch (err) {
            console.log('call api error', url, err);
            console.log(ERROR_SERVER_UNREACHABLE.message);
            if (shouldThrow) {
                throw err;
            } else {
                return;
            }
        }

        if (isJSON === true && response) {
            let result;
            try {
                result = await response.json();
            } catch (e) {
                console.log("Unable to parse response", e);
                return;
            }

            // invalid token, return nothing and show error
            if (result && result.Message === "Authorization has been denied for this request.") {
                console.log(result.Message);
                this.logout()
                // dispatchState(constDispatch.removeToken);
                return;
            }

            if (result?.error) {
                const errorMsg = result.Message || result.error || "Unknown Error";
                console.log(errorMsg);
                throw errorMsg;
            }

            if (skipCodeCheck) {
                return result;
            }

            if (result && Number(result?.Code) === 1) {
                // success data go here
                return result;
            } else {
                const errorMessage = result.Message || "Unknown error";
                console.log("err", url, errorMessage);
                // showToast(errorMessage);
                throw errorMessage;
            }
        } else {
            return response;
        }
    }

    /*
    |--------------------------------------------------------------------------
    | LOGIN / SIGN UP / GET PROFILE
    |--------------------------------------------------------------------------
    */

    getWeatherByCity(city, country) {
        const data = {
            city, country
        };
        return this.callAPI(`/data/2.5/weather?q=${city},${country}&appid=cac7896d4116c994e6bb052faeea0e21`, "GET", null, null);
    }

}
