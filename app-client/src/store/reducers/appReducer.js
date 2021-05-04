const INITIAL_STATE = {
  isShowNavigation: false,
  modalId: null,
};

const appReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOGGLE_NAVIGATION':
      return {
        ...currentState,
        isShowNavigation: action.payload,
      };

    case 'OPEN_MODAL':
      return {
        ...currentState,
        modalId: action.modalId,
      };

    case 'CLOSE_MODAL':
      return {
        ...currentState,
        modalId: null,
      };

    default:
      return currentState;
  }
};

export default appReducer;
