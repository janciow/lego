import React from 'react';
import { NavLink } from 'react-router-dom';

const LeftSideNavigation = () => {
    return (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink  className="nav-link" to="/sets">
                            <span data-feather="home"></span> Lego zestawy <span className="sr-only">(current)</span>
                        </NavLink  >
                    </li>

                    <li className="nav-item">
                        <NavLink  className="nav-link" to="/brick-balance">
                            <span data-feather="file"></span> Brick inventory
                        </NavLink  >
                    </li>

                    <li className="nav-item">
                        <NavLink  className="nav-link" to="/brick-balance/6274/pirates">
                            <span data-feather="file"></span> Pirates
                        </NavLink  >
                    </li>

                    <li className="nav-item">
                        <NavLink  className="nav-link" to="/brick-balance/7675/sw">
                            <span data-feather="file"></span> Star wars
                        </NavLink  >
                    </li>


                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Saved reports</span>
                    <a className="d-flex align-items-center text-muted" href="/#">
                        <span data-feather="plus-circle"></span>
                    </a>
                </h6>

                <ul className="nav flex-column mb-2">
                    <li className="nav-item">
                        <a className="nav-link" href="/#">
                            <span data-feather="file-text"></span> Current month </a>
                    </li>
                </ul>
            </div>
        </nav>
    )

}

export default LeftSideNavigation;