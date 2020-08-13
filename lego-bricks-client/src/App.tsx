import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        lego app
      </header>

      <main>
        <Router>
          <Switch>
            <Route path="/checkout" > <div>1</div></Route>
            <Route path="/orders" >  <div>1</div></Route>
            <Route path="/" exact >  <div>1</div></Route>
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
