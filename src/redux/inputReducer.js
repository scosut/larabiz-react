// import everything from action types
import * as actionTypes from './actionTypes';

// set up your initial state so you have a starting point
const INITIAL_STATE = {
  listing: {
    id: '',
    name: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    user_id: ''
  },
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }
};

export const inputReducer = (state = INITIAL_STATE, action) => {
  let obj;

  switch (action.type) {
    case actionTypes.SET_INPUT:
      obj = { ...state };
      obj[action.item][action.key] = action.payload;
      return obj;

    case actionTypes.SET_INPUT_FROM_OBJECT:
      obj = { ...state };
      Object.keys(action.payload).forEach(key => {
        obj[action.item][key] = action.payload[key];
      });
      return obj;

    case actionTypes.CLEAR_INPUT:
      obj = { ...state };
      Object.keys(obj[action.item]).forEach(key => {
        obj[action.item][key] = '';
      });
      return obj;

    default:
      return state;
  }
};