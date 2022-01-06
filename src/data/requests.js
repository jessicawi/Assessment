import QueryString from "querystring";
import {ERROR_INVALID_RESPONSE} from "./datasourceConst";


const API_HOST = "http://api.openweathermap.org";

function URLForEndpoint(endpoint, params = null) {
    let url = API_HOST + endpoint;

    if (params !== null) {
        url += "?" + QueryString.stringify(params);
    }
    // console.log("endpoint", url);
    return url;
}

function NewRequest(method, authToken = null, hasContentType = true) {
    const headers = new Headers();
    if (hasContentType) {
        headers.append("Content-Type", "application/json");
    }

    if (authToken !== null) {
        headers.append("Authorization", "Bearer " + authToken);
    }

    // Return fetch request body
    return {
        method,
        headers,
    };
}

function NewWWWRequest(method, authToken = null, hasContentType = true) {
    const headers = new Headers();
    if (hasContentType) {
        headers.append("Content-Type", "application/json");
    }

    if (authToken !== null) {
        headers.append("Authorization", "Bearer " + authToken);
    }

    // Return fetch request body
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
    let responseStatusNumber = Number(response.status);
    if (responseStatusNumber >= 400 && responseStatusNumber <= 599) {
        throw await response.json();
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

async function parseObject(response) {
    // If not successful, throw JSON as response
    let responseStatusNumber = Number(response.status);
    if (responseStatusNumber >= 400 && responseStatusNumber <= 599) {
        throw await response.text();
    }

    // console.log(response);
    // console.log(response.d);
    // Parse response
    let json;
    try {
        json = await response.text();
        console.log(typeof json);
    } catch (err) {
        throw ERROR_INVALID_RESPONSE;
    }

    if (json === undefined) {
        throw ERROR_INVALID_RESPONSE;
    }

    return json;
}

export const fetchWithTimeout = (url, options, timeout = 7000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ]);
};

export {URLForEndpoint, NewRequest, NewHtmlRequest, parseObject, parseResponseAndHandleErrors};
