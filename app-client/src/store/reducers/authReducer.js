const INITIAL_STATE = {
  isLoggedIn: false,
  user: null,
  isLoading: false,
  error: null,
};

const authReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...currentState,
        user: action.payload.user,
        isLoggedIn: action.payload.isLoggedIn,
      };

    case 'REQUEST_LOGIN':
      return {
        ...currentState,
        isLoading: true,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...currentState,
        isLoading: false,
        isLoggedIn: true,
        error: null,
        user: action.resp,
      };

    case 'LOGIN_FAILED':
      return {
        ...currentState,
        isLoading: false,
        error: { type: 'login', msg: action.resp.msg },
        isLoggedIn: false,
      };

    default:
      return currentState;
  }
};

export default authReducer;
