const INITIAL_STATE = {
  isShowNavigation: false,
};

const appReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOGGLE_NAVIGATION':
      return {
        ...currentState,
        isShowNavigation: action.payload,
      };

    default:
      return currentState;
  }
};

export default appReducer;
