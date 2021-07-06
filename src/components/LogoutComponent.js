import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addAlert, clearUser } from '../redux/actionCreators';

const mapDispatchToProps = {
  addAlert: (message, status) => addAlert(message, status),
  clearUser: () => clearUser()
};

class LogoutComponent extends Component {
  componentDidMount() {
    this.props.clearUser();
    this.props.addAlert('You are now logged out.', 'success');
  }

  render() {
    return (
      <Redirect to={{
        pathname: '/login',
        logout: true
      }} />
    )
  }
}

export default connect(null, mapDispatchToProps)(LogoutComponent);