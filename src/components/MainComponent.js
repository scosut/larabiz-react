import React from 'react';
import ListingsComponent from './ListingsComponent';
import ListingComponent from './ListingComponent';
import DashboardComponent from './DashboardComponent';
import RegisterComponent from './RegisterComponent';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import LinkRequestComponent from './LinkRequestComponent';
import ResetPasswordComponent from './ResetPasswordComponent';
import FormComponent from './FormComponent';
import NavbarComponent from './NavbarComponent';
import FooterComponent from './FooterComponent';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import '../App.css';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const MainComponent = (props) => {
  const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => Boolean(authenticated) === true
          ? <Component {...rest} {...props} />
          : <Redirect to='/login' />}
      />
    )
  }

  return (
    <TransitionGroup>
      <CSSTransition timeout={1000} classNames='fade' key={props.location.key}>
        <div className="App">
          <NavbarComponent />
          <Switch location={props.location}>
            <Route exact path='/' component={ListingsComponent} />
            <PrivateRoute exact path='/listings/create'
              authenticated={props.user.id}
              component={FormComponent}
              create
              title='Create Listing' />
            <Route exact path='/listings/:listingId' component={ListingComponent} />
            <PrivateRoute exact path='/listings/:listingId/edit'
              authenticated={props.user.id}
              component={FormComponent}
              edit
              title='Edit Listing' />
            <PrivateRoute exact path='/dashboard'
              authenticated={props.user.id}
              component={DashboardComponent} />
            <Route exact path='/login' component={LoginComponent} />
            <Route exact path='/logout' component={LogoutComponent} />
            <Route exact path='/register' component={RegisterComponent} />
            <Route exact path='/password/reset' component={LinkRequestComponent} />
            <Route exact path='/password/reset/:token' component={ResetPasswordComponent} />
            <Redirect to='/' />
          </Switch>
          <FooterComponent />
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default withRouter(connect(mapStateToProps, null)(MainComponent));