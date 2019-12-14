import {requiredString, requiredFunc, requiredNumber, requiredBoolean} from '../../prop-types';
import PropTypes from 'prop-types';

const propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape({
    name: requiredString,
    coordinates: PropTypes.arrayOf(requiredNumber)
  })),
  activeCity: PropTypes.shape({
    name: requiredString,
    coordinates: PropTypes.arrayOf(requiredNumber)
  }),
  isCityOffersExist: requiredBoolean,
  loadOffers: requiredFunc,
  changeActiveCity: requiredFunc
};

export default propTypes;
