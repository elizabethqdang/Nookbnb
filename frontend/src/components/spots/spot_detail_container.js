import { connect } from 'react-redux';
import { fetchSpot } from '../../actions/spot_actions';
import { openSpotModal, closeModal } from '../../actions/modal_actions';
import SpotDetail from './spot_detail';

// Mapping value of spotId from URL to props
const mapStateToProps = (state, ownProps) => ({
  spotId: ownProps.match.params.spotId,
  currentSpot: state.currentSpot
});

// Mapping thunk action to props
const mapDispatchToProps = dispatch => ({
  fetchSpot: id => dispatch(fetchSpot(id)),
  openSpotModal: (formType, imageNum) => dispatch(openSpotModal(formType, imageNum)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotDetail);