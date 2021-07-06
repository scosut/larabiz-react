import React, { Component } from 'react';
import {
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
import { clearAlert, clearRedirect, clearInput, setInput, clearErrors, registerUser } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
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
  registerUser: (name, email, password, confirm, refs) => registerUser(name, email, password, confirm, refs)
};

class RegisterComponent extends Component {
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
      name: this.nameInput,
      email: this.emailInput,
      password: this.passwordInput,
      password_confirmation: this.confirmInput
    };

    this.props.registerUser(this.props.input.user.name, this.props.input.user.email, this.props.input.user.password, this.props.input.user.password_confirmation, refs);
  }

  render() {
    if (this.props.redirect.url) {
      return <Redirect to={this.props.redirect.url} />;
    }
    else {
      return (
        <Container>
          <Card>
            <CardHeader>
              <CardTitle tag="h5">
                Register
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input type="text" name="name" id="name" placeholder="Enter name" ref={el => (this.nameInput = el)} invalid={this.props.errors.errors.hasOwnProperty('name')} onChange={e => this.handleInput(e)} value={this.props.input.user.name} />
                  <FormFeedback>
                    {this.props.errors.errors.hasOwnProperty('name') ? this.props.errors.errors.name[0] : ''}
                  </FormFeedback>
                </FormGroup>
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
                  <Button color="secondary" onClick={() => this.handleClick()}>Register</Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Container>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);