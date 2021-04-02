
import React from 'react';
import Main from './components/Main';
import { createStore, applyMiddleware, Store } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk";
import reducer from './store/reducer';

const App = () => {

  const store: Store<WeatherState, WeatherAction> & {
    dispatch: DispatchType
  } = createStore(reducer, applyMiddleware(thunk))

  return (
    <Provider store={store}>  
      <Main />
    </Provider>
  );
};


export default App;
