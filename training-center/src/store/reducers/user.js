import * as actionTypes from '../actions/actions';
import updateObject from '../utility';

const initialState = {
    authorized: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_AUTHENTIFICATION:
            return updateObject(state, {authorized: action.value});
        default:
            return state;
    }
};

export default reducer;