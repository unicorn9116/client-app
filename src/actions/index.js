// Action Creator Approve application
export const getHomeData = (actionObject) => {
    // Return an Action 
    return{
        type : "GET_HOME_DATA",
        payload : actionObject
    };
};
