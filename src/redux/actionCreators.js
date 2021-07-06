import * as actionTypes from './actionTypes';
import ReactDOM from 'react-dom';

// listings
export const fetchUserListings = userId => dispatch => {
  return fetch(`http://www.local-larabiz-api.com/api/dashboard/${userId}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        const error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }
    },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(response => dispatch(addListings(response.data)))
    .catch(error => dispatch(listingsFailed(error.message)));
};

export const fetchListings = () => dispatch => {
  return fetch('http://www.local-larabiz-api.com/api/listings')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        const error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }
    },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(response => dispatch(addListings(response.data)))
    .catch(error => dispatch(listingsFailed(error.message)));
};

export const fetchListing = (listingId, inputFlag = false) => (dispatch) => {
  dispatch(listingLoading());
  return fetch(`http://www.local-larabiz-api.com/api/listings/${listingId}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        const error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }
    },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(response => {
      if (inputFlag) {
        let user = sessionStorage.getItem('user');
        user = user ? JSON.parse(user) : user;

        if (user && user.id === response.data.user_id) {
          dispatch(addListing(response.data));
          dispatch(setInputFromObject('listing', response.data));
        }
        else {
          dispatch(listingFailed(''));
          dispatch(setRedirect('/dashboard'));
        }
      }
      else {
        dispatch(addListing(response.data));
      }
    })
    .catch(error => dispatch(listingFailed(error.message)));
};

export const postListing = (name, website, email, phone, address, bio, userId, refs) => dispatch => {
  const newListing = {
    name: name,
    website: website,
    email: email,
    phone: phone,
    address: address,
    bio: bio,
    user_id: userId
  };

  return fetch('http://www.local-larabiz-api.com/api/listings', {
    method: 'POST',
    body: JSON.stringify(newListing)
  })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch(clearErrors());
        dispatch(clearInput('listing'));
        dispatch(setRedirect('/dashboard'));
        dispatch(addAlert(response.message, 'success'));
      }
      else {
        dispatch(addErrors(response.errors));
        setFocus(response.errors, refs);
      }
    })
    .catch(error => {
      console.log('add listing: ', error.message);
    });
};

export const putListing = (listingId, name, website, email, phone, address, bio, userId, refs) => dispatch => {
  const oldListing = {
    name: name,
    website: website,
    email: email,
    phone: phone,
    address: address,
    bio: bio,
    user_id: userId
  };

  return fetch(`http://www.local-larabiz-api.com/api/listings/${listingId}?_method=PUT`, {
    method: 'POST',
    body: JSON.stringify(oldListing)
  })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch(clearErrors());
        dispatch(clearInput('listing'));
        dispatch(setRedirect('/dashboard'));
        dispatch(addAlert(response.message, 'success'));
      }
      else {
        dispatch(addErrors(response.errors));
        setFocus(response.errors, refs);
      }
    })
    .catch(error => {
      console.log('edit listing: ', error.message);
    });
};

export const deleteListing = listingId => dispatch => {
  return fetch(`http://www.local-larabiz-api.com/api/listings/${listingId}?_method=DELETE`, {
    method: 'POST'
  })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch(setRedirect('/dashboard'));
        dispatch(addAlert(response.message, 'success'));
      }
      else {
        dispatch(addErrors(response.errors));
      }
    })
    .catch(error => {
      console.log('delete listing: ', error.message);
    });
};

export const listingsFailed = errMess => ({
  type: actionTypes.LISTINGS_FAILED,
  payload: errMess
});

export const addListings = listings => ({
  type: actionTypes.ADD_LISTINGS,
  payload: listings
});

export const listingFailed = errMess => ({
  type: actionTypes.LISTING_FAILED,
  payload: errMess
});

export const addListing = listing => ({
  type: actionTypes.ADD_LISTING,
  payload: listing
});

export const listingLoading = () => ({
  type: actionTypes.LISTING_LOADING
});


// USERS
export const loginUser = (email, password, refs) => dispatch => {
  const oldUser = {
    email: email,
    password: password
  };

  return fetch('http://www.local-larabiz-api.com/api/login', {
    method: 'POST',
    body: JSON.stringify(oldUser)
  })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch(clearErrors());
        dispatch(clearInput('user'));
        dispatch(addUser(response.data));
        dispatch(setRedirect('/dashboard'));
        dispatch(addAlert(response.message, 'success'));
      }
      else {
        if (response.errors) {
          dispatch(addErrors(response.errors));
          setFocus(response.errors, refs);
        }
        else {
          dispatch(addAlert(response.message, 'danger'));
        }
      }
    })
    .catch(error => {
      console.log('login user: ', error.message);
    });
};

export const registerUser = (name, email, password, password_confirmation, refs) => dispatch => {
  const newUser = {
    name: name,
    email: email,
    password: password,
    password_confirmation: password_confirmation
  };

  return fetch('http://www.local-larabiz-api.com/api/register', {
    method: 'POST',
    body: JSON.stringify(newUser)
  })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch(clearErrors());
        dispatch(clearInput('user'));
        dispatch(setRedirect('/login'));
        dispatch(addAlert(response.message, 'success'));
      }
      else {
        dispatch(addErrors(response.errors));
        setFocus(response.errors, refs);
      }
    })
    .catch(error => {
      console.log('add user: ', error.message);
    });
};

export const sendResetPasswordLink = (email, refs) => dispatch => {
  const userEmail = {
    email: email
  };

  return fetch('http://www.local-larabiz-api.com/api/password/email', {
    method: 'POST',
    body: JSON.stringify(userEmail)
  })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch(clearErrors());
        dispatch(clearInput('user'));
        dispatch(addAlert(response.message, 'success'));
      }
      else {
        if (response.errors) {
          dispatch(addErrors(response.errors));
          setFocus(response.errors, refs);
        }
        else {
          dispatch(clearErrors());
          dispatch(addAlert(response.message, 'danger'));
        }
      }
    })
    .catch(error => {
      console.log('send reset password link: ', error.message);
    });
};

export const resetPassword = (token, email, password, password_confirmation, refs) => dispatch => {
  const oldUser = {
    token: token,
    email: email,
    password: password,
    password_confirmation: password_confirmation
  };

  return fetch('http://www.local-larabiz-api.com/api/password/reset', {
    method: 'POST',
    body: JSON.stringify(oldUser)
  })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch(clearErrors());
        dispatch(clearInput('user'));
        dispatch(setRedirect('/login'));
        dispatch(addAlert(response.message, 'success'));
      }
      else {
        if (response.errors) {
          dispatch(addErrors(response.errors));
          setFocus(response.errors, refs);
        }
        else {
          dispatch(clearErrors());
          dispatch(addAlert(response.message, 'danger'));
        }
      }
    })
    .catch(error => {
      console.log('reset password: ', error.message);
    });
};

export const addUser = user => ({
  type: actionTypes.ADD_USER,
  payload: { id: user.id, name: user.name }
});

export const clearUser = () => ({
  type: actionTypes.CLEAR_USER
});

//ALERT
export const addAlert = (alert, status) => ({
  type: actionTypes.ADD_ALERT,
  payload: { message: alert, status: status }
});

export const clearAlert = () => ({
  type: actionTypes.CLEAR_ALERT
});

// TOGGLERS
export const toggleNavigation = () => {
  return {
    type: actionTypes.TOGGLE_NAVIGATION
  };
};

// INPUT
export const setInput = (item, e) => ({
  type: actionTypes.SET_INPUT,
  payload: e.target.value,
  key: e.target.name,
  item: item
});

export const setInputFromObject = (item, obj) => ({
  type: actionTypes.SET_INPUT_FROM_OBJECT,
  payload: obj,
  item: item
});

export const clearInput = item => ({
  type: actionTypes.CLEAR_INPUT,
  item: item
});

// FORMS
export const addErrors = errors => ({
  type: actionTypes.ADD_ERRORS,
  payload: errors
});

export const clearErrors = () => ({
  type: actionTypes.CLEAR_ERRORS
});

export const setFocus = (errs, refs) => {
  const keys = Object.keys(errs);
  const el = keys.length > 0 ? refs[keys[0]] : null;

  if (el) {
    ReactDOM.findDOMNode(el).scrollIntoView();
    ReactDOM.findDOMNode(el).focus();
  }
};

// REDIRECT
export const setRedirect = url => ({
  type: actionTypes.SET_REDIRECT,
  payload: url
});

export const clearRedirect = () => ({
  type: actionTypes.CLEAR_REDIRECT
});