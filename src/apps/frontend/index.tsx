import React from 'react';
import ReactDOM from 'react-dom';

import App from './app.component';
import { ModelContextProvider } from './contexts/modal.context';
import { TodoContextProvider } from './contexts/todo.context';
import { UserContextProvider } from './contexts/user.context';

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  ReactDOM.render(
    <ModelContextProvider>
      <UserContextProvider>
        <TodoContextProvider>
          <App />
        </TodoContextProvider>
      </UserContextProvider>
    </ModelContextProvider>,
    document.getElementById('app'),
  );
});
