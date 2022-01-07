import QueryString from "querystring";
import {ERROR_INVALID_RESPONSE, ERROR_ACCESS_DENIED, ERROR_STATUS_CODE, ERROR_TOKEN_EXPIRED} from "../const/constError";
import Toast from "../helpers/toast";


const apiHost = "http://api.openweathermap.org";

function URLForEndpoint(endpoint, params = null) {
    let url = apiHost + endpoint;

    if (params !== null) {
        url += "?" + QueryString.stringify(params);
    }
    // console.log("endpoint", url);
    return url;
}

// function URLForEndpoint(endpoint, params = null) {
//     let url = apiHost + endpoint;
//     if (params !== null) {
//         if (params["query"] !== null) {
//             let temp = JSON.stringify(params["query"]);
//             params["query"] = temp;
//         }
//         url += "?" + QueryString.stringify(params);
//     }
//
//     return url;
// }

function NewRequest(method, authToken = null, hasContentType = false) {
    const headers = new Headers();
    // const mode = 'no-cors';
    if (hasContentType) {
        headers.append("Content-Type", "application/json");
    }

    if (authToken !== null) {
        headers.append("Authorization", "Bearer " + authToken);
    }

    return {
        method,
        headers,
    };
}

function NewHtmlRequest(method, authToken = null) {
    const headers = new Headers();
    headers.append("Content-Type", "text/html");
    if (authToken !== null) {
        headers.append("Authorization", "Bearer " + authToken);
    }

    // Return fetch request body
    return {
        method,
        headers,
    };
}

async function parseResponseAndHandleErrors(response) {
    // If not successful, throw JSON as response
    const responseStatusNumber = Number(response.status);
    // console.log(response,"response")

    if (responseStatusNumber >= 400 && responseStatusNumber <= 599) {
        switch (responseStatusNumber) {
            case ERROR_STATUS_CODE.NO_AUTH:
                throw ERROR_ACCESS_DENIED;

            case ERROR_STATUS_CODE.TOKEN_EXPIRED:
                throw ERROR_TOKEN_EXPIRED;

            case ERROR_STATUS_CODE.NOT_FOUND:
                Toast.init.error.show("Not Found");

            default:
                throw await response.json();
        }
    }

    // Parse response
    let json;
    try {
        json = await response.json();
    } catch (err) {
        throw ERROR_INVALID_RESPONSE;
    }

    if (json === undefined) {
        throw ERROR_INVALID_RESPONSE;
    }

    return json;
}

async function parseResponseAndHandleErrorsForDownload(response) {
    const responseStatusNumber = Number(response.status);
    if (responseStatusNumber >= 400 && responseStatusNumber <= 599) {
        switch (responseStatusNumber) {
            case ERROR_STATUS_CODE.NO_AUTH:
                throw ERROR_ACCESS_DENIED;

            case ERROR_STATUS_CODE.TOKEN_EXPIRED:
                throw ERROR_TOKEN_EXPIRED;

            default:
                throw await response.json();
        }
    }

    return response;
}

export const fetchWithTimeout = (url, options, timeout = 7000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ]);
};

export {
    URLForEndpoint,
    NewRequest,
    NewHtmlRequest,
    parseResponseAndHandleErrors,
    parseResponseAndHandleErrorsForDownload
};
