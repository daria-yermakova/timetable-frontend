import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks';
import AuthPage from './pages/auth/AuthPage';
import Main from './pages/desktop/Main';
import client from './api';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Switch>
            <Route path="/main/auth" component={AuthPage}/>
            <Route path="/main" component={Main}/>
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
  );
}

export default App;
