import React, { Component } from 'react';
import { Alert, Container, Card, CardHeader, CardBody, CardTitle, Table, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAlert, clearRedirect, fetchUserListings, deleteListing } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    alert: state.alert,
    user: state.user,
    listings: state.listings,
    redirect: state.redirect
  };
};

const mapDispatchToProps = {
  clearAlert: () => clearAlert(),
  clearRedirect: () => clearRedirect(),
  fetchUserListings: userId => fetchUserListings(userId),
  deleteListing: (userId, listingId) => deleteListing(userId, listingId)
};

class DashboardComponent extends Component {
  componentDidMount() {
    this.props.clearAlert();
    this.props.clearRedirect();

    if (this.props.user.id) {
      this.props.fetchUserListings(this.props.user.id);
    }
  }

  handleDelete = listing => {
    const del = window.confirm(`You have chosen to delete ${listing.name}. Click 'OK' to confirm or 'CANCEL' to abort.`);

    if (del) {
      this.props.deleteListing(listing.id);
    }
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
            <CardHeader className="d-flex justify-content-between">
              <CardTitle tag="h5">
                Dashboard
              </CardTitle>
              <Link to="/listings/create" className="btn btn-success btn-xs">Add Listing</Link>
            </CardHeader>
            <CardBody>
              <CardTitle tag="h3">
                Your Listings
              </CardTitle>
              {this.props.listings.errMess.length > 0 &&
                <p>{this.props.listings.errMess}</p>
              }

              {this.props.listings.listings.length === 0 &&
                <p>No Listings have been submitted.</p>
              }

              {this.props.listings.listings.length > 0 &&
                <Table striped>
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.listings.listings.map(listing => {
                      return (
                        <tr key={listing.id}>
                          <td>{listing.name}</td>
                          <td>
                            <Link to={`/listings/${listing.id}/edit`} className="btn btn-secondary float-right">Edit</Link>
                          </td>
                          <td>
                            <Button color="danger" className="float-left" onClick={() => this.handleDelete(listing)}>Delete</Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              }
            </CardBody>
          </Card>
        </Container>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);