import React, {useEffect} from 'react';
import SignIn from '../signIn/sign-in.jsx';
import MainPage from '../mainPage/main-page.jsx';
import FavoritesPage from '../favoritesPage/favorites-page.jsx';
import RentObjectDetails from '../rentObjectDetails/rent-object-details.jsx';
import {connect} from 'react-redux';
import {Router, Switch, Route} from 'react-router-dom';
import history from '../../history';
import PropTypes from './prop-types';
import Operation from '../../operation';
import {Routes} from '../../constants/route-constants';
import withAuth from '../../hocs/withAuth/with-auth.jsx';

const AuthFavoritePage = withAuth(FavoritesPage);

const App = ({tryToAuthorize}) => {
  useEffect(() => tryToAuthorize(), []);

  return <Router history={history}>
    <Switch>
      <Route exact path={Routes.MAIN_PAGE} component={MainPage}/>
      <Route exact path={Routes.LOGIN_PAGE} component={SignIn}/>
      <Route exact path={Routes.FAVORITES} component={AuthFavoritePage}/>
      <Route exact path={Routes.OFFER_DETAILS} component={RentObjectDetails}/>
    </Switch>
  </Router>;
};

App.propTypes = PropTypes;

const mapDispatchToProps = {
  tryToAuthorize: () => Operation.tryToAuthorize()
};

export default connect(null, mapDispatchToProps)(App);
