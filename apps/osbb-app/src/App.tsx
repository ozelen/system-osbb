import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { UsersList } from './UsersList';

function App() {
  return (
    <Router>
      <React.Fragment>
        <CssBaseline />
        <Container>
        <Switch>
            <Route path="/users/create">
              Create
            </Route>
            <Route path="/users">
              <UsersList />
            </Route>
            <Route path="/">
              Home
            </Route>
          </Switch>
        </Container>
      </React.Fragment>
    </Router>
  );
}

export default App;
