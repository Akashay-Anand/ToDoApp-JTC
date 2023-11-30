import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.component';
import { ModelContextProvider } from './contexts/modal.context';

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  ReactDOM.render(
    <ModelContextProvider>
      <App />
    </ModelContextProvider>,
    document.getElementById('app'),
  );
});
