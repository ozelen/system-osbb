import React from 'react';
import { SignupForm } from './SignupForm';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <SignupForm />
      </Container>
    </React.Fragment>
  );
}

export default App;
