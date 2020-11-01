import React from 'react';
import './NotFound.css';

import TagManager from 'react-gtm-module';

if (process.env.NODE_ENV === 'production' && !!process.env.REACT_APP_GTM_ID) {
  const tagManagerArgs = {
    dataLayer: {
      page: 'not_found', // Specific to each page
      pagePath: window.location.pathname + window.location.search, // "/login", //Specific to each page
      title: 'not found',
    },
    dataLayerName: 'PageDataLayer',
  };
  TagManager.dataLayer(tagManagerArgs);
}

export default function NotFound() {
  return (
    <div className="NotFound">
      <h3>Sorry, page not found!</h3>
    </div>
  );
}
