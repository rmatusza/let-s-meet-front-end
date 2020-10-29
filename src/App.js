import React from 'react';
import HomePage from './components/HomePage';
import Theme from './Theme';
import {
  CssBaseline,
} from "@material-ui/core";
const App = () => {

  return (
    <>
      <CssBaseline />
      <Theme>
        <HomePage />
      </Theme>
    </>
  );
}

export default App;
