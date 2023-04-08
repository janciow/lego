import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
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
        {/* <Layout> */}

          <Routes>
            <Route path="/" element={<Layout/>} >
              <Route path="bricks" element={<BrickList />} > </Route>
              <Route path="sets" element={<SetList />} />
              <Route path="sets/add" element={<SetDetail />} />
              <Route path="sets/:setId" element={<SetDetail />}> </Route>
              <Route path="sets/:setId/edit" element={<div>set edit</div>} />
              <Route path="sets-list" element={<SetListSimple />} />
              <Route path="brick-balance/:setId/pirates" element={<BrickBalanceLegoPiratesShipsList />} />
              <Route path="brick-balance/:setId/sw" element={<BrickBalanceLegoStarWarsClonShipsList />} />
            </Route>
          </Routes>

        {/* </Layout> */}
      </Router>
    </div>
  );
}

export default App;
