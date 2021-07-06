import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  errMess: '',
  listing: {
    id: '',
    name: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    user_id: ''
  }
};

export const listingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_LISTING:
      return { ...state, isLoading: false, errMess: '', listing: action.payload };

    case actionTypes.LISTING_LOADING:
      return { ...state, isLoading: true, errMess: '', listing: { id: '', name: '', website: '', email: '', phone: '', address: '', bio: '', user_id: '' } }

    case actionTypes.LISTING_FAILED:
      return { ...state, isLoading: false, errMess: action.payload, listing: { id: '', name: '', website: '', email: '', phone: '', address: '', bio: '', user_id: '' } };

    default:
      return state;
  }
};