import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Menu from './menu/Menu'
import Footer from './footer/Footer'
import Home from '../containers/Home'
import About from '../containers/About'
import Post from '../containers/Post'

const Layout = () => (
  <div className="body">
    <Switch>
      <div>
        <Menu />
        <div className="content-body">
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/post/:title" component={Post} />
        </div>
        <Footer />
      </div>
    </Switch>
  </div>
)

export default Layout
