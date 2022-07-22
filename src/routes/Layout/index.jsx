import React, {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import logo from '../../assets/logo-delos-white.png';
import { formatCurrency } from '../../helpers/currency';

import './styles.scss'

const Layout = (props) => {
  const userCoins = localStorage.getItem('userCoins');
  const [coins, setCoins] = useState({userCoins})

  useEffect(() => {
    setCoins(userCoins);
  }, [userCoins])
  
  return(
    <Router>
      <div>
        <div className="layout-header">
          <div className="menubar">
            <div>
              <img className="logo" src={logo} alt="" />
            </div>
            <div className='menu-btn'>
              <Link className="btn-nav" to="/">Home</Link>
              <Link className="btn-nav" to="/article">Article</Link>
              <Link className="btn-nav" to="/my-article">My Article</Link>
              <span className="btn-nav coins">Coins: <b>{formatCurrency(coins)}</b></span>
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