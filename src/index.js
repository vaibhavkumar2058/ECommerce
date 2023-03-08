import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from "./actions/store";
import {Provider, useDispatch} from 'react-redux';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
      <Provider store={store}> {/* HERE */}
        <App /> {/* Now, App is wrapped in Provider and hence can read from store */}
      </Provider>,
    document.getElementById('root')
  )

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
