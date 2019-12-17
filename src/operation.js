import ActionCreator from './actions/action-creator';
import Translator from './translator';
import {ApiRoutes} from './constants/routeConstants';

export default {
  fetchOffers: () => (dispatch, _, api) => {
    api
      .get(ApiRoutes.HOTELS)
      .then((responseData) => dispatch(
          ActionCreator.fetchOffers(
              responseData.data.map((hotel) => Translator.translateOffer(hotel)))));
  },

  tryToAuthorize: () => (dispatch, _, api) => {
    api
      .get(ApiRoutes.LOGIN)
      .then((responseData) => dispatch(
          ActionCreator.authorize(Translator.translateUser(responseData.data))))
      .catch(() => {});
  },

  authorize: (email, password) => (dispatch, _, api) => {
    api
      .post(ApiRoutes.LOGIN, ({email, password}))
      .then((responseData) => dispatch(
          ActionCreator.authorize(Translator.translateUser(responseData.data))));
  },

  addToFavorites: (offerId, isFavorite) => (dispatch, _, api) => {
    api
      .post(`${ApiRoutes.FAVORITE}/${offerId}/${isFavorite ? 1 : 0}`)
      .then(() => dispatch(ActionCreator.addToFavorites({offerId, isFavorite})));
  },
  addReview: (rating, text, offerId) => (dispatch, _, api) => {
    api
      .post(`${ApiRoutes.COMMENTS}/${offerId}`, {
        rating,
        comment: text})
      .then((response) => dispatch(ActionCreator.fetchReviews(
          response.data.map((review) => Translator.translateReview(review)))
      ));
  },

  fetchDataForHotel: (offerId) => (dispatch, _, api) => {
    api
      .get(ApiRoutes.HOTELS)
      .then((responseData) => dispatch(ActionCreator.fetchOffers(
          responseData.data.map((hotel) => Translator.translateOffer(hotel)))))
      .then(() => dispatch(ActionCreator.updateActiveCard(offerId)))
      .then(() => dispatch(ActionCreator.setCity(offerId)))
      .then(() => api.get(`${ApiRoutes.COMMENTS}/${offerId}`))
      .then((responseData) => dispatch(ActionCreator.fetchReviews(
          responseData.data.map((review) => Translator.translateReview(review)))));
  }
};
