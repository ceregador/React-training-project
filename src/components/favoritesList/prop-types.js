import {requiredNumber, requiredBoolean, requiredString} from '../../prop-types';
import PropTypes from 'prop-types';

export default {
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: requiredNumber,
    name: requiredString,
    isPremium: requiredBoolean,
    image: requiredString,
    type: requiredString,
    price: requiredNumber,
    isBookmarked: requiredBoolean
  }))
};
