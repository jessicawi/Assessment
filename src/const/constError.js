export const ERROR_STATUS_CODE = {
    BAD_REQUEST: 400, // Cannot process request
    NO_AUTH: 401, // Authentication required
    FORBIDDEN: 403, // Not allowed to access
    NOT_FOUND: 404, // Resources not found
    INVALID: 422, // Request validation error
    TOKEN_EXPIRED: 440, // Token is expired
    INTERNAL_SERVER_ERROR: 500, // Internal Server Error
};

export const ERROR_INVALID_RESPONSE = {
    type: "invalid_response",
    message: "Couldn't understand server response",
};

export const ERROR_SERVER_UNREACHABLE = {
    type: "could_not_contact_server",
    message: "Couldn't contact the server. Please check your internet connection and try again",
};

export const ERROR_ACCESS_DENIED = {
    type: "unauthorized",
    message: "Access is denied",
};

export const ERROR_TOKEN_EXPIRED = {
    type: "token_expired",
    message: "Session token has Expired. Please login again",
};
