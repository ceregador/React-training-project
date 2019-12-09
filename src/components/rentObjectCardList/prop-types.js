import {requiredString, requiredBoolean, requiredNumber, requiredFunc} from '../prop-types';
import PropTypes from 'prop-types';

const propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: requiredNumber,
    name: requiredString,
    isPremium: requiredBoolean,
    image: requiredString,
    type: requiredString,
    price: requiredNumber,
    isBookmarked: requiredBoolean,
    onTitleClick: requiredFunc,
    onActiveOfferChanged: requiredFunc
  })),
  cityName: requiredString
};

export default propTypes;