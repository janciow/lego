import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BrickList from './views/Brick/BrickList/BrickList';
import SetList from './views/Set/SetList/SetList';
import SetDetail from './views/Set/SetDetail/SetDetail';
import SetListSimple from './views/BrickBalance/SetListSimple/SetListSimple';
import BrickBalanceLegoPiratesShipsList from './views/BrickBalance/BrickBalanceLegoPiratesShipsList/BrickBalanceLegoPiratesShipsList';
import BrickBalanceLegoStarWarsClonShipsList from './views/BrickBalance/BrickBalanceLegoStarWarsClonShipsList/BrickBalanceLegoStarWarsClonShipsList';

function App() {
  return (
    <div className="App">

      <Router>
        <Layout>
          <Switch>
          <Route path="/bricks" exact> <BrickList /></Route>
            <Route path="/sets" exact> <SetList /></Route>
            <Route path="/sets/add" exact> <SetDetail /></Route>
            <Route path="/sets/:setId" exact> <SetDetail /></Route>
            <Route path="/sets/:setId/edit" exact> <div>set edit</div></Route>
            <Route path="/brick-balance" exact>  <SetListSimple/></Route>
            <Route path="/brick-balance/:setId/pirates" exact> <BrickBalanceLegoPiratesShipsList /></Route>
            <Route path="/brick-balance/:setId/sw" exact> <BrickBalanceLegoStarWarsClonShipsList /></Route>
            <Route path="/" exact >  <div>1</div></Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
