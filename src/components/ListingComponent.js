import React, { Component } from 'react';
import { Container, Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAlert, fetchListing } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    listing: state.listing,
    redirect: state.redirect
  };
};

const mapDispatchToProps = {
  clearAlert: () => clearAlert(),
  fetchListing: (listingId) => fetchListing(listingId),
};

class ListingComponent extends Component {
  componentDidMount() {
    this.props.clearAlert();

    const listingId = this.props.match.params.listingId;

    if (listingId) {
      this.props.fetchListing(listingId);
    }
  }

  render() {
    return (
      <Container>
        <Card>
          <CardHeader className="d-flex justify-content-between">
            <CardTitle tag="h5">
              {this.props.listing.listing.name}
            </CardTitle>
            <Link to='/' className="btn btn-secondary btn-xs">Go Back</Link>
          </CardHeader>
          <CardBody>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Address:</strong>&nbsp;
                {this.props.listing.listing.address}
              </li>
              <li className="list-group-item">
                <strong>Website:</strong>&nbsp;
                <a href={this.props.listing.listing.website} target="_blank" rel="noreferrer">
                  {this.props.listing.listing.website}
                </a>
              </li>
              <li className="list-group-item">
                <strong>Email:</strong>&nbsp;
                {this.props.listing.listing.email}
              </li>
              <li className="list-group-item">
                <strong>Phone:</strong>&nbsp;
                {this.props.listing.listing.phone}
              </li>
            </ul>
            <Card>
              <CardBody>
                {this.props.listing.listing.bio}
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingComponent);