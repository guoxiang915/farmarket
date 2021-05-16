const INITIAL_STATE = {
  isShowNavigation: false,
  modalId: null,
  modalInfo: null,
  snackbar: {
    open: false,
  },
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
        modalInfo: action.payload,
      };

    case 'CLOSE_MODAL':
      return {
        ...currentState,
        modalId: null,
      };

    case 'SHOW_SNACKBAR':
      return {
        ...currentState,
        snackbar: action.payload,
      };

    default:
      return currentState;
  }
};

export default appReducer;
