import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Cookie from './utils/cookie';
import App from './components/App';
import Home from './components/Home';
import Essay from './components/Essay';
import Samples from './components/Samples';
import Editor from './components/Editor';
import Loading from './components/Loading';
import Login from './components/Login';
import LoginStore from './stores/LoginStore';

const checkLogin = (nextState, replaceState) => {
  try {
    if (window.document) {
      let sessionId = Cookie.get('sessionId');
      if (sessionId) {
        replaceState({ successPath: '/', failPath: '/login', sessionId: sessionId}, 'loading');
      } else {
        return true;
      }
    } else {
      replaceState(null, '/');
    }
  } catch(e) {
    replaceState(null, '/');
  }
  
}

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='essay' component={Essay} />
    <Route path='samples' component={Samples} />
    <Route path='editor'component={Editor} />
    <Route path='loading'component={Loading} />
    <Route path='login' onEnter={checkLogin}  component={Login} />
  </Route>
)