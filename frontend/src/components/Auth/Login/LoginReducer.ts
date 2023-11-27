export const SET_TOKEN = "SET_TOKEN";
export const UNSET_TOKEN = "UNSET_TOKEN";


const initialState = {
    isAuthenticated: false,
    token: ""
  };
  
  export const loginReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case SET_TOKEN:
        return {
          ...state,
          isAuthenticated: true,
          token: action.payload
        };
      case UNSET_TOKEN:
        return initialState;
      default:
        return state;
    }
  };
