import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'views/Root';

import 'global.scss';
import 'localization/i18n';

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
