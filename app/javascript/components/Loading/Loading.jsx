import React from 'react';
import PropTypes from 'prop-types';

import loadingIcon from './loading.svg';

const Loading = () => (
  <div className='loading-container'>
    <h2>Loading...</h2>
    <img
      src={loadingIcon}
      className='loading-icon'
    />
  </div>
);

export default Loading;
