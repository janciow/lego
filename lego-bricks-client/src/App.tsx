import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import SetList from './views/Set/SetList/SetList';
import SetDetail from './views/Set/SetDetail/SetDetail';

function App() {
  return (
    <div className="App">

      <Router>
        <Layout>
          <Switch>
            <Route path="/sets" exact> <SetList /></Route>
            <Route path="/sets/add" exact> <SetDetail /></Route>
            <Route path="/sets/:setId" exact> <SetDetail /></Route>
            <Route path="/sets/:setId/edit" exact> <div>set edit</div></Route>
            <Route path="/all-bricks" exact>  <div>all-bricks</div></Route>
            <Route path="/" exact >  <div>1</div></Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;