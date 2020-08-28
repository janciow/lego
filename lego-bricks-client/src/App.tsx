import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Layout from './hoc/Layout/Layout';
import SetList from './views/Set/SetList/SetList';

function App() {
  return (
    <div className="App">

      <Router>
        <Layout>
          <Switch>
            <Route path="/set-list" exact> <SetList /></Route>
            <Route path="/set-list/add" exact> <div>set add</div></Route>
            <Route path="/set-list/:setId" exact> <div>set details</div></Route>
            <Route path="/set-list/:setId/edit" exact> <div>set edit</div></Route>
            <Route path="/all-bricks" exact>  <div>all-bricks</div></Route>
            <Route path="/" exact >  <div>1</div></Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
