import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.component';
import { ModelContextProvider } from './contexts/modal.context';
import { UserContextProvider } from './contexts/user.context';
// import { UserContextProvider } from './UserContext';


document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  ReactDOM.render(
    <ModelContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ModelContextProvider>,
    document.getElementById('app'),
  );
});
