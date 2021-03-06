import React from 'react';
import {connect, connectAdvanced} from 'react-redux';
import Renderer from 'react-test-renderer';
import OffersMap from './offers-map.jsx';

jest.mock(`../rentObjectCardList/rent-object-card-list.jsx`);
jest.mock(`react-redux`);

it(`renders and connects correctly`, () => {
  const tree = Renderer
    .create(
        <OffersMap
          cityCoordinates={[]}
          offersCoordinates={[]}
        />)
    .toJSON();

  expect(connect).toHaveBeenCalledTimes(1);
  expect(connect).toHaveBeenCalledWith(expect.any(Function), null);

  const mapStateToProps = connect.mock.calls[0][0];
  const mappedProps = mapStateToProps({offers: [], activeOfferId: null});
  expect(mappedProps).toHaveProperty(`activeOfferId`);

  expect(connectAdvanced).toHaveBeenCalledWith(OffersMap);

  expect(tree).toMatchSnapshot();
});
