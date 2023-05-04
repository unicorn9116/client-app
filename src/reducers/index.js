import { combineReducers } from 'redux';

const getHomeDataReducers = (state = [], action) => {

    if(action.type === "GET_HOME_DATA"){
        var dt = state['homeData'] = action.payload;
        return dt;
    }
    return state;
}

export default combineReducers({
    HomeData : getHomeDataReducers
});