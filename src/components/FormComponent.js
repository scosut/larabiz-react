import React, { Component } from 'react';
import {
  Container,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Button
} from 'reactstrap';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAlert, clearRedirect, clearInput, setInput, clearErrors, fetchListing, postListing, putListing } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    input: state.input,
    errors: state.errors,
    listing: state.listing,
    redirect: state.redirect,
    user: state.user
  };
};

const mapDispatchToProps = {
  clearAlert: () => clearAlert(),
  clearRedirect: () => clearRedirect(),
  clearInput: item => clearInput(item),
  setInput: (item, e) => setInput(item, e),
  clearErrors: () => clearErrors(),
  fetchListing: (listingId, inputFlag) => fetchListing(listingId, inputFlag),
  postListing: (name, website, email, phone, address, bio, userId, refs) => postListing(name, website, email, phone, address, bio, userId, refs),
  putListing: (listingId, name, website, email, phone, address, bio, userId, refs) => putListing(listingId, name, website, email, phone, address, bio, userId, refs),
};

class FormComponent extends Component {
  componentDidMount = () => {
    this.props.clearAlert();
    this.props.clearRedirect();
    this.props.clearInput('listing');
    this.props.clearErrors();

    const listingId = this.props.match.params.listingId;

    if (listingId) {
      this.props.fetchListing(listingId, true);
    }
  }

  handleInput = e => {
    this.props.setInput('listing', e);
  }

  handleClick = () => {
    const refs = {
      name: this.nameInput,
      website: this.websiteInput,
      email: this.emailInput,
      phone: this.phoneInput,
      address: this.addressInput,
      bio: this.bioInput,
    };

    if (this.props.create) {
      this.props.postListing(this.props.input.listing.name, this.props.input.listing.website, this.props.input.listing.email, this.props.input.listing.phone, this.props.input.listing.address, this.props.input.listing.bio, this.props.user.id, refs);
    }

    if (this.props.edit) {
      this.props.putListing(this.props.input.listing.id, this.props.input.listing.name, this.props.input.listing.website, this.props.input.listing.email, this.props.input.listing.phone, this.props.input.listing.address, this.props.input.listing.bio, this.props.user.id, refs);
    }
  }

  render() {
    if (this.props.redirect.url) {
      return <Redirect to={this.props.redirect.url} />;
    }
    else {
      if (this.props.listing.isLoading) {
        return (
          <Container>
            <h5>Loading...</h5>
          </Container>
        );
      }
      if (this.props.listing.errMess) {
        return (
          <Container>
            <h5>{this.props.errMess}</h5>
          </Container>
        );
      }
      if (!this.props.listing.isLoading) {
        return (
          <Container>
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <CardTitle tag="h5">
                  {this.props.title}
                </CardTitle>
                <Link to='/dashboard' className="btn btn-secondary btn-xs">Go Back</Link>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" placeholder="Enter name" ref={el => (this.nameInput = el)} invalid={this.props.errors.errors.hasOwnProperty('name')} onChange={e => this.handleInput(e)} value={this.props.input.listing.name} />
                    <FormFeedback>
                      {this.props.errors.errors.hasOwnProperty('name') ? this.props.errors.errors.name[0] : ''}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="website">Website</Label>
                    <Input type="text" name="website" id="website" placeholder="Enter website" ref={el => (this.websiteInput = el)} invalid={this.props.errors.errors.hasOwnProperty('website')} onChange={e => this.handleInput(e)} value={this.props.input.listing.website} />
                    <FormFeedback>
                      {this.props.errors.errors.hasOwnProperty('website') ? this.props.errors.errors.website[0] : ''}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="text" name="email" id="email" placeholder="Enter email" ref={el => (this.emailInput = el)} invalid={this.props.errors.errors.hasOwnProperty('email')} onChange={e => this.handleInput(e)} value={this.props.input.listing.email} />
                    <FormFeedback>
                      {this.props.errors.errors.hasOwnProperty('email') ? this.props.errors.errors.email[0] : ''}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input type="text" name="phone" id="phone" placeholder="Enter phone" ref={el => (this.phoneInput = el)} invalid={this.props.errors.errors.hasOwnProperty('phone')} onChange={e => this.handleInput(e)} value={this.props.input.listing.phone} />
                    <FormFeedback>
                      {this.props.errors.errors.hasOwnProperty('phone') ? this.props.errors.errors.phone[0] : ''}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="address">Address</Label>
                    <Input type="text" name="address" id="address" placeholder="Enter address" ref={el => (this.addressInput = el)} invalid={this.props.errors.errors.hasOwnProperty('address')} onChange={e => this.handleInput(e)} value={this.props.input.listing.address} />
                    <FormFeedback>
                      {this.props.errors.errors.hasOwnProperty('address') ? this.props.errors.errors.address[0] : ''}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="bio">Bio</Label>
                    <Input type="textarea" name="bio" id="bio" placeholder="Enter bio" ref={el => (this.bioInput = el)} invalid={this.props.errors.errors.hasOwnProperty('bio')} onChange={e => this.handleInput(e)} value={this.props.input.listing.bio} />
                    <FormFeedback>
                      {this.props.errors.errors.hasOwnProperty('bio') ? this.props.errors.errors.bio[0] : ''}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Button color="secondary" onClick={() => this.handleClick()}>Submit</Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Container>
        );
      }
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormComponent));