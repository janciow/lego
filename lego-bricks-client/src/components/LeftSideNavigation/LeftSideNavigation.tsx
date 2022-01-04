import React from "react";
import { NavLink } from "react-router-dom";

const LeftSideNavigation = () => {
  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">

          <li className="nav-item">
            <NavLink className="nav-link" to="/bricks">
              <span data-feather="home"></span> klocki
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/sets">
              <span data-feather="home"></span> Lego zestawy
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/sets-list">
              <span data-feather="home"></span>Lista zestawów 
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/brick-balance/6274/pirates">
              <span data-feather="home"></span> Pirates
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/brick-balance/7675/sw">
              <span data-feather="home"></span> Star wars
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default LeftSideNavigation;
