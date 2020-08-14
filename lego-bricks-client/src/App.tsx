import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Layout from './hoc/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout>




        <Router>
          <Switch>
            <Route path="/checkout" > <div>1</div></Route>
            <Route path="/orders" >  <div>1</div></Route>
            <Route path="/" exact >  <div>1</div></Route>
          </Switch>
        </Router>


      </Layout>
    </div>
  );
}

export default App;
