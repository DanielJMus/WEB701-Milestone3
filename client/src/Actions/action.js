export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const IS_SELLER = 'IS_SELLER';
export const USER_ID = 'USER_ID';
const bcrypt = require('bcryptjs');

// Whether the site is waiting for the user to try logging in
export function setLoginPending(isLoginPending) {
    return {
        type: LOGIN_PENDING,
        isLoginPending
    };
}

// Whether the user is successfully logged into their account
export function setLoginSuccess (isLoginSuccess) {
    return {
        type: LOGIN_SUCCESS,
        isLoginSuccess
    };
}

// Any errors that occur when logging into an account
export function setLoginError (isLoginError) {
    return {
        type: LOGIN_ERROR,
        isLoginError
    };
}

// Any errors that occur when logging into an account
export function setIsSeller (isSeller) {
    return {
        type: IS_SELLER,
        isSeller
    };
}

export function setUserID (userID) {
    return {
        type: USER_ID,
        userID
    };
}

export function login(username, password) {
    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(false));
        dispatch(setIsSeller(false));
        dispatch(setUserID(-1));

        sendLoginRequest(username, password)
            .then(json => {
                    dispatch(setLoginPending(false));
                    dispatch(setLoginSuccess(true));
                    dispatch(setUserID(json.ID));
                    if(json.USERTYPE === 1)
                    {
                        dispatch(setIsSeller(true));
                    }
            })
            .catch(error => {
                dispatch(setLoginPending(false));
                dispatch(setLoginError(error));
                dispatch(setUserID(-1));
            })
    }
}

// Log the user out and reset the state values
export function logout() {
    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(false));
        dispatch(setIsSeller(false));
        dispatch(setUserID(-1));
    }
}

/* Handles login credential checking for user, checks their email and password within
the user database and returns whether the login was successful or not. */
function sendLoginRequest (email, password) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:4200/api/users/' + email, {
            method: 'get'
        }).then(res =>
            res.json().then(json => {
                if(json.length > 0) {
                    bcrypt.compare(password, json[0].PASSWORD).then((result) => {
                        console.log(result);
                        if (result) {
                            return resolve(json[0]);
                        } else {
                            return reject(new Error("Invalid username or password"));
                        }
                    });
                }
                
            })
        );
    });
}