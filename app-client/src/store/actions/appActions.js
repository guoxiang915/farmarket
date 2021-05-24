export const toggleNavigation = payload => ({
  type: 'TOGGLE_NAVIGATION',
  payload,
});

export const toggleSidebar = payload => ({
  type: 'TOGGLE_SIDEBAR',
  payload,
});

export const openModal = (modalId, payload) => ({
  type: 'OPEN_MODAL',
  modalId,
  payload,
});

export const closeModal = payload => ({
  type: 'CLOSE_MODAL',
  modalId: payload,
});

export const showSnackbar = payload => ({
  type: 'SHOW_SNACKBAR',
  payload,
});

export const selectPlace = placeId => ({
  type: 'SELECT_PLACE',
  payload: placeId,
});
