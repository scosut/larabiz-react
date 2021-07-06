import React, { Component } from 'react';
import { Alert, Container, Card, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAlert, clearRedirect, fetchListings } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    alert: state.alert,
    listings: state.listings,
    user: state.user
  };
};

const mapDispatchToProps = {
  clearAlert: () => clearAlert(),
  clearRedirect: () => clearRedirect(),
  fetchListings: () => fetchListings()
};

class ListingsComponent extends Component {
  componentDidMount() {
    this.props.clearAlert();
    this.props.clearRedirect();
    this.props.fetchListings();
  }

  render() {
    return (
      <Container>
        {this.props.alert.message.length > 0 &&
          <Alert color={this.props.alert.status}>
            {this.props.alert.message}
          </Alert>
        }

        <Card className="sidebar">
          <CardBody>
            <CardTitle tag="h5">Latest Business Listings</CardTitle>
            {this.props.listings.errMess.length > 0 &&
              <p>{this.props.listings.errMess}</p>
            }

            {this.props.listings.listings.length === 0 &&
              <p>No Listings have been submitted.</p>
            }

            {this.props.listings.listings.length > 0 &&
              <ul className="list-group">
                {this.props.listings.listings.map(listing => {
                  return (
                    <li className="list-group-item" key={listing.id}>
                      <Link to={`/listings/${listing.id}`}>{listing.name}</Link>
                    </li>
                  )
                })}
              </ul>}
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingsComponent);