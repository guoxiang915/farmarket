const INITIAL_STATE = {
  isShowNavigation: false,
  modals: [],
  snackbar: {
    open: false,
  },
  selectedPlace: null,
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
        modals: [
          ...currentState.modals,
          {
            modalId: action.modalId,
            modalInfo: action.payload,
          },
        ],
      };

    case 'CLOSE_MODAL': {
      const { modals } = currentState;
      const modalIndex = modals.findIndex(
        modal => modal.modalId === action.modalId
      );
      if (modalIndex !== -1) {
        modals.splice(modalIndex, 1);
      }
      return {
        ...currentState,
        modals: [...modals],
      };
    }

    case 'SHOW_SNACKBAR':
      return {
        ...currentState,
        snackbar: action.payload,
      };

    case 'SELECT_PLACE':
      return {
        ...currentState,
        selectedPlace: action.payload,
      };

    default:
      return currentState;
  }
};

export default appReducer;
