import reducer from './reducer';
import ACTION_TYPE from '../actions/action-type';

it(`action FETCH_OFFERS sets offers`, () => {
  expect(reducer({},
      {
        type: ACTION_TYPE.FETCH_OFFERS,
        payload: [{
          id: 1,
          city: {name: `City`}
        }]
      })).toMatchObject({
    offers: [{
      id: 1,
      city: {name: `City`}}],
    cities: [{name: `City`}],
    activeCityName: `City`
  });
});

it(`action FETCH_REVIEWS sets reviews`, () => {
  expect(reducer({}, {
    type: ACTION_TYPE.FETCH_REVIEWS,
    payload: [{comment: `Test`}]
  })).toMatchObject({
    currentReviews: [{comment: `Test`}]
  });
});

it(`action AUTHORIZE sets isAuthorized and user`, () => {
  expect(reducer({isAuthorized: false}, {
    type: ACTION_TYPE.AUTHORIZE,
    payload: {
      name: `user`
    }
  })).toMatchObject({
    isAuthorized: true,
    user: {name: `user`}
  });
});

it(`action ADD_TO_FAVORITES updates offer's isBookmarked property`, () => {
  expect(reducer({offers: [{id: 1, isBookmarked: false}]}, {
    type: ACTION_TYPE.ADD_TO_FAVORITES,
    payload: {
      offerId: 1,
      isFavorite: true
    }
  })).toMatchObject({offers: [{id: 1, isBookmarked: true}]});
});

it(`action SET_CITY sets activeCityName properly`, () => {
  expect(reducer({
    offers: [{id: 1, city: {name: `City`}}]
  },
  {
    type: ACTION_TYPE.SET_CITY,
    payload: 1
  })).toHaveProperty(`activeCityName`, `City`);
});

it(`action UPDATE_ACTIVE_CARD sets activeOfferId if the previous value was NULL`, () => {
  expect(reducer({
    activeOfferId: null
  },
  {
    type: ACTION_TYPE.UPDATE_ACTIVE_CARD,
    payload: 1
  })).toHaveProperty(`activeOfferId`, 1);
});

it(`action UPDATE_ACTIVE_CARD updates activeOfferId correctly`, () => {
  expect(reducer({
    activeOfferId: 2
  },
  {
    type: ACTION_TYPE.UPDATE_ACTIVE_CARD,
    payload: 1
  })).toHaveProperty(`activeOfferId`, 1);
});
