


import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';

import Login from './Login.jsx';
import Home from './Home.jsx';


ReactDOM.render((
    
    <Router history ={browserHistory}>
        <Route path = "/" component = {Login}> </Route>
        <Route path = "/home" component = {Home}> </Route>
         
    </Router>
    
    ), document.getElementById('container'));
