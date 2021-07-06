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
import { connect } from 'react-redux';
import { clearAlert, clearInput, setInput, clearErrors, sendResetPasswordLink } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    alert: state.alert,
    input: state.input,
    errors: state.errors
  };
};

const mapDispatchToProps = {
  clearAlert: () => clearAlert(),
  clearInput: item => clearInput(item),
  setInput: (item, e) => setInput(item, e),
  clearErrors: () => clearErrors(),
  sendResetPasswordLink: email => sendResetPasswordLink(email)
};

class LinkRequestComponent extends Component {
  componentDidMount = () => {
    this.props.clearAlert();
    this.props.clearInput('user');
    this.props.clearErrors();
  }

  handleInput = e => {
    this.props.setInput('user', e);
  }

  handleClick = () => {
    const refs = {
      email: this.inputEmail
    }

    this.props.sendResetPasswordLink(this.props.input.user.email, refs);
  }

  render() {
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
                <Input type="text" name="email" id="email" placeholder="Enter email" ref={el => (this.emailInput = el)} invalid={this.props.errors.errors.hasOwnProperty('email')} onChange={e => this.handleInput(e)} value={this.props.input.email} />
                <FormFeedback>
                  {this.props.errors.errors.hasOwnProperty('email') ? this.props.errors.errors.email[0] : ''}
                </FormFeedback>
              </FormGroup>
              <FormGroup>
                <Button color="secondary" onClick={() => this.handleClick()}>Send Password Reset Link</Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkRequestComponent);