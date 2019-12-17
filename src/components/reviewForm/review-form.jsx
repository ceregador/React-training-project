import React, {useRef, useEffect} from 'react';
import {connect} from 'react-redux';
import RatingStar from '../ratingStar/rating-star.jsx';
import Operation from '../../operation';
import Selector from '../../selectors/selector';
import withForm from '../../hocs/withForm/with-form.jsx';
import Constants from '../../constants/constants';
import propTypes from './prop-types';

const ReviewForm = ({addReview, activeOfferId, onFormFieldChange, formFields}) => {
  const buttonRef = useRef();
  const textAreaRef = useRef();

  useEffect(() => {
    buttonRef.current.disabled = !isFormValid();
  });

  const renderRatingStar = (rate, title) => {
    return <RatingStar
      title={title}
      rate={rate}
      onClick={() => onStarClick(rate)}
      isToggled={formFields[`rating`] >= rate}
    />;
  };

  const onStarClick = (value) => {
    onFormFieldChange(`rating`, value);
    if (buttonRef.current) {
      buttonRef.current.disabled = !isFormValid();
    }
  };

  const onSubmitForm = (evt) => {
    evt.preventDefault();

    textAreaRef.current.disabled = true;
    buttonRef.current.disabled = true;

    try {
      addReview(formFields[`rating`], formFields[`comment`], activeOfferId);
      clearForm();
    } finally {
      textAreaRef.current.disabled = false;
      buttonRef.current.disabled = false;
    }
  };

  const clearForm = () => {
    textAreaRef.current.value = null;
    onFormFieldChange(`rating`, 0);
    onFormFieldChange(`comment`, null);
  };

  const onChangeComment = (evt) => {
    const {target: {value}} = evt;
    onFormFieldChange(`comment`, value);
    buttonRef.current.disabled = !isFormValid();
  };

  const isFormValid = () => {
    const comment = formFields[`comment`];

    if (!comment) {
      return false;
    }

    return formFields[`rating`] > 0
      && (comment.length >= Constants.DETAILS_PAGE_COMMENT_MIN_LENGTH
      && comment.length <= Constants.DETAILS_PAGE_COMMENT_MAX_LENGTH);
  };

  return <form className="reviews__form form" action="post">
    <label className="reviews__label form__label" htmlFor="review">Your review</label>
    <div className="reviews__rating-form form__rating">
      {renderRatingStar(5, `perfect`)}
      {renderRatingStar(4, `good`)}
      {renderRatingStar(3, `not bad`)}
      {renderRatingStar(2, `badly`)}
      {renderRatingStar(1, `terribly`)}
    </div>
    <textarea
      ref={textAreaRef}
      className="reviews__textarea form__textarea"
      id="review"
      name="review"
      placeholder="Tell how was your stay, what you like and what can be improved"
      minLength={Constants.DETAILS_PAGE_COMMENT_MIN_LENGTH}
      maxLength={Constants.DETAILS_PAGE_COMMENT_MAX_LENGTH}
      required
      onChange={onChangeComment}
    />
    <div className="reviews__button-wrapper">
      <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{Constants.DETAILS_PAGE_COMMENT_MIN_LENGTH} characters</b>.
      </p>
      <button
        onClick={onSubmitForm}
        ref={buttonRef}
        className="reviews__submit form__submit button"
        type="submit">Submit</button>
    </div>
  </form>;
};

ReviewForm.propTypes = propTypes;

const mapStateToProps = (state) => ({
  activeOfferId: Selector.getActiveOfferId(state)
});

const mapDispatchToProps = {
  addReview: (rating, text, offerId) => Operation.addReview(rating, text, offerId)
};

export default connect(mapStateToProps, mapDispatchToProps)(withForm(ReviewForm));