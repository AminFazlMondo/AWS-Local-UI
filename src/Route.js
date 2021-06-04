
import { Route, Switch } from 'react-router-dom';
import Cloudwatch from './components/Cloudwatch'
import Lambda from './components/Lambda'
import Home from './components/Home'
import Header from './components/Header'

function RouteSwitch() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path='/cloudwatch' component={Cloudwatch} />
        <Route path='/lambda' component={Lambda} />
        <Route path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default RouteSwitch;
