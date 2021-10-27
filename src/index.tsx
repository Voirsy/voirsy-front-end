import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'views/Root';
import store from 'store/store';
import { Provider } from 'react-redux';

import 'global.scss';
import 'localization/i18n';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
