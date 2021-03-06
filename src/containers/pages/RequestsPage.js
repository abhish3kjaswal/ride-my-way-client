import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar';
import loadRequests, { requestResponse } from '../../actions/requests';
import RideInfo from '../../components/RideInfo';
import RequestsInfo from '../../components/RequestsInfo';

class RequestsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleResponse = this.handleResponse.bind(this);
  }

  componentDidMount() {
    const { dispatch, match: { params: { rideId }} } = this.props;
    dispatch(loadRequests(rideId));
  }

  handleResponse(e) {
    const { dispatch } = this.props;
    const { requestId, rideId, action } = e.target.dataset;
    dispatch(requestResponse(rideId, requestId, action));
  }

  render() {
    const {
      loading,
      ride,
      requests,
      responseLoading,
    } = this.props;

    return (
      <React.Fragment>
        <header className="app-grid">
          <Navbar />
        </header>
        <section className="app-grid site-content">
          <div className="layout-grid">
            <div className="instructions">
              <h2>Trip details </h2>
              <p>Respond to requests for this ride offer.</p>
            </div>
            <div className="ride-requests">
              {
                loading
                  ? <i style={{ textAlign: 'center', display: 'block' }} className="fa fa-spinner fa-spin fa-pulse fa-5x" aria-hidden="true" />
                  : (
                    <React.Fragment>
                      <RideInfo ride={ride} />
                      <RequestsInfo
                        responseLoading={responseLoading}
                        handleResponse={this.handleResponse}
                        requests={requests}
                      />
                    </React.Fragment>
                  )
              }
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

RequestsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  ride: PropTypes.object.isRequired,
  requests: PropTypes.array.isRequired,
  responseLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: state.requests.loading,
  ride: state.requests.rideInfo.data,
  requests: state.requests.requestInfo.data,
  responseLoading: state.requests.requestResponseLoading,
});

export default connect(mapStateToProps)(RequestsPage);
