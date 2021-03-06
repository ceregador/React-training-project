import React, {useState} from 'react';
import PropTypes from 'prop-types';


const withActiveItem = (Component) => {
  return function WithActiveItem(props) {
    const {onChangeActiveItem} = props;
    const [activeItem, updateActiveItem] = useState();

    const onHocChangeActiveItem = (item) => {
      if (item !== activeItem) {
        onChangeActiveItem(item);
        updateActiveItem(item);
      }
    };

    WithActiveItem.propTypes = {
      onChangeActiveItem: PropTypes.func.isRequired,
      getDefaultItem: PropTypes.func
    };

    return <Component
      activeItem={activeItem}
      onActiveItemChange={onHocChangeActiveItem}
      {...props}
    />;
  };
};

export default withActiveItem;
