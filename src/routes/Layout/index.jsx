import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import logo from '../../assets/logo-delos.png';
import './styles.scss'

const Layout = (props) => {
  return(
    <Router>
      <div>
        <div className="layout-header">
          <div>
            <img className="logo" src={logo} alt="" />
          </div>
          <Link className="btn-nav" to="/">Home</Link>
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