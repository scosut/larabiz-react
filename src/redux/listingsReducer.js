import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  errMess: '',
  listings: []
};

export const listingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_LISTINGS:
      return { ...state, errMess: '', listings: action.payload };

    case actionTypes.LISTINGS_FAILED:
      return { ...state, errMess: action.payload, listings: [] };

    default:
      return state;
  }
};