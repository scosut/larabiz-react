import * as actionTypes from './actionTypes';
let user = sessionStorage.getItem('user');

const INITIAL_STATE = user ? JSON.parse(user) : { id: '', name: '' };

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      sessionStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, id: action.payload.id, name: action.payload.name };

    case actionTypes.CLEAR_USER:
      sessionStorage.removeItem('user');
      return { ...state, id: '', name: '' };

    default:
      return state;
  }
};