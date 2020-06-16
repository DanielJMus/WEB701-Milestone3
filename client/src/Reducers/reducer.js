import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR, IS_SELLER } from '../Actions/action';

export default function reducer(state = {
    isLoginPending: false,
    isLoginSuccess: false,
    isLoginError: null,
    isSeller: false
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
    

        default:
            return state;
    }
}