
import React from 'react';
import { Provider } from "react-redux"
import { store } from './store'
import Routes from './routes';
import { ThemeProvider } from 'styled-components';
import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    text: '#fcfcfc',
    main: '#5e00b3',
  }
};

const App = () => {

  return (
    <Provider store={store}>  
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Provider>
  );
};


export default App;
