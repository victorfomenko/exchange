import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { store } from './store';

// components

import App from './components/App';

const rootEl = document.querySelector('#root');


render(
	<AppContainer>
	  <Provider store={store}>
	    <App/>
	  </Provider>
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
  	const NextApp = require('./components/App').default;
    render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      rootEl
    );
  });
}