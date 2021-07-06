import React, { Component } from 'react';
import {
  Alert,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Container,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Button
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAlert, clearRedirect, clearInput, setInput, clearErrors, resetPassword } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    alert: state.alert,
    input: state.input,
    errors: state.errors,
    redirect: state.redirect
  };
};

const mapDispatchToProps = {
  clearAlert: () => clearAlert(),
  clearRedirect: () => clearRedirect(),
  clearInput: item => clearInput(item),
  setInput: (item, e) => setInput(item, e),
  clearErrors: () => clearErrors(),
  resetPassword: (token, email, password, confirm, refs) => resetPassword(token, email, password, confirm, refs)
};

class ResetPasswordComponent extends Component {
  componentDidMount = () => {
    this.props.clearAlert();
    this.props.clearRedirect();
    this.props.clearInput('user');
    this.props.clearErrors();
  }

  handleInput = e => {
    this.props.setInput('user', e);
  }

  handleClick = () => {
    const refs = {
      email: this.inputEmail,
      password: this.inputPassword,
      password_confirmation: this.inputConfirm
    }

    this.props.resetPassword(this.props.match.params.token, this.props.input.user.email, this.props.input.user.password, this.props.input.user.password_confirmation, refs);
  }

  render() {
    if (this.props.redirect.url) {
      return <Redirect to={this.props.redirect.url} />;
    }
    else {
      return (
        <Container>
          {this.props.alert.message.length > 0 &&
            <Alert color={this.props.alert.status}>
              {this.props.alert.message}
            </Alert>
          }
          <Card>
            <CardHeader>
              <CardTitle tag="h5">
                Reset Password
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input type="text" name="email" id="email" placeholder="Enter email" ref={el => (this.emailInput = el)} invalid={this.props.errors.errors.hasOwnProperty('email')} onChange={e => this.handleInput(e)} value={this.props.input.user.email} />
                  <FormFeedback>
                    {this.props.errors.errors.hasOwnProperty('email') ? this.props.errors.errors.email[0] : ''}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input type="password" name="password" id="password" placeholder="Enter password" ref={el => (this.passwordInput = el)} invalid={this.props.errors.errors.hasOwnProperty('password')} onChange={e => this.handleInput(e)} value={this.props.input.user.password} />
                  <FormFeedback>
                    {this.props.errors.errors.hasOwnProperty('password') ? this.props.errors.errors.password[0] : ''}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="password_confirmation">Confirm Password</Label>
                  <Input type="password" name="password_confirmation" id="password_confirmation" placeholder="Enter confirm" ref={el => (this.confirmInput = el)} invalid={this.props.errors.errors.hasOwnProperty('password_confirmation')} onChange={e => this.handleInput(e)} value={this.props.input.user.password_confirmation} />
                  <FormFeedback>
                    {this.props.errors.errors.hasOwnProperty('password_confirmation') ? this.props.errors.errors.password_confirmation[0] : ''}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Button color="secondary" onClick={() => this.handleClick()}>Reset Password</Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Container>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordComponent);