import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import logo from '../../assets/logo-delos-white.png';
import './styles.scss'

const Layout = (props) => {
  return(
    <Router>
      <div>
        <div className="layout-header">
          <div className="navbar">
            <div>
              <img className="logo" src={logo} alt="" />
            </div>
            <div>
              <Link className="btn-nav" to="/">Home</Link>
              <Link className="btn-nav" to="/">Home</Link>
              <Link className="btn-nav" to="/">Home</Link>
            </div>
          </div>
        </div>
        <Switch>
          {props.routes.map((route,index) => (
            <Route exact key={`layout-${index}`} path={route.path} component={route.component}/>
          ))}
        </Switch>
      </div>
    </Router>
  )
}

export default Layout;