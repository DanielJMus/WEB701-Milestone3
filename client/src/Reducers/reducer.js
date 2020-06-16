import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR, IS_SELLER, USER_ID } from '../Actions/action';

export default function reducer(state = {
    isLoginPending: false,
    isLoginSuccess: false,
    isLoginError: null,
    isSeller: false,
    userID:-1
}, action) {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoginSuccess: action.isLoginSuccess
            };

        case LOGIN_PENDING:
            return {
                ...state,
                isLoginPending: action.isLoginPending
            };

        case LOGIN_ERROR:
            return {
                ...state,
                isLoginError: action.isLoginError
            };

        case IS_SELLER:
            return {
                ...state,
                isSeller: action.isSeller
            };

        case USER_ID:
            return {
                ...state,
                userID: action.userID
            };
    

        default:
            return state;
    }
}