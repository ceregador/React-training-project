import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import City from '../city/city.jsx';
import ActionCreator from '../../actions/action-creator';
import propTypes from './prop-types';

const CitiesList = ({cities, activeCityName, onChangeCity, loadOffers}) => {
  const isComponentUpdate = useRef(false);

  useEffect(() => {
    if (isComponentUpdate.current) {
      loadOffers(activeCityName);
    }
    isComponentUpdate.current = true;
  }, [activeCityName]);

  return <section className="locations container">
    <ul className="locations__list tabs__list">
      {cities.map((city) =>
        <City
          city={city}
          isActive={city.name === activeCityName}
          key={city.name}
          onClick={onChangeCity}/>)}
    </ul>
  </section>;
};

CitiesList.propTypes = propTypes;

const mapDispatchToProps = {
  loadOffers: (cityName) => ActionCreator.getOffers(cityName)
};

export default connect(null, mapDispatchToProps)(CitiesList);