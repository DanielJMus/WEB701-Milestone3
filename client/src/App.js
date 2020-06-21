import React from 'react';
import Home from './Components/home-content.js';
import Browse from './Components/browse-content.js';
import Product from './Components/product-content.js';
// import About from './Components/about-content.js';
import Contact from './Components/contact-content.js';
import Login from './Components/database/log-in/login-content.js';
import Register from './Components/register-content.js';
import CreateListing from './Components/createListing-content.js';
import Dashboard from './Components/database/admin/dashboard-content.js';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import {login } from './Actions/action';
import { connect } from 'react-redux';
import Chat from './Components/Chat.js';


class App extends React.Component {
  render () {
    return (
      <div>
        {/* <Chat/> */}
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/browse/" component={Browse} />
            {/* <Route path="/about/" component={About} /> */}
            <Route path="/product/:productID" component={Product}/>
            <Route path="/contact/" component={Contact} />
            <Route path="/createListing/" component={CreateListing} />
            <Route path="/login/:source" component={Login}/>
            <Route path="/register/" component={Register}/>
            <Route path="/dashboard/" component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

  
const mapStateToProps = (state) => {
  return {
      isLoginPending: state.isLoginPending,
      isLoginSuccess: state.isLoginSuccess,
      isLoginError: state.isLoginError,
      isSeller : state.isSeller
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      login: (username, password) => dispatch(login(username, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
