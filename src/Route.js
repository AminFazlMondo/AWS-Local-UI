import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Cloudwatch from './components/Cloudwatch'
import Header from './components/Header'
import Home from './components/Home'
import Lambda from './components/Lambda'
import StateMachines from './components/StateMachines'

function RouteSwitch() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path='/cloudwatch' component={Cloudwatch} />
        <Route path='/lambda' component={Lambda} />
        <Route path='/state-machines' component={StateMachines} />
        <Route path='/' component={Home} />
      </Switch>
    </div>
  )
}

export default RouteSwitch
