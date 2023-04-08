import { NavLink } from "react-router-dom";

const LeftSideNavigation = () => {
  return (
    // <nav classNameName="col-md-2 d-none d-md-block bg-light sidebar">
    //   <div classNameName="sidebar-sticky">
    //     <ul classNameName="nav flex-column">

    //       <li classNameName="nav-item">
    //         <NavLink classNameName="nav-link" to="/bricks">
    //           <span data-feather="home"></span> klocki
    //         </NavLink>
    //       </li>

    //       <li classNameName="nav-item">
    //         <NavLink classNameName="nav-link" to="/sets">
    //           <span data-feather="home"></span> Lego zestawy
    //         </NavLink>
    //       </li>

    //       <li classNameName="nav-item">
    //         <NavLink classNameName="nav-link" to="/sets-list">
    //           <span data-feather="home"></span>Lista zestawów 
    //         </NavLink>
    //       </li>

    //       <li classNameName="nav-item">
    //         <NavLink classNameName="nav-link" to="/brick-balance/6274/pirates">
    //           <span data-feather="home"></span> Pirates
    //         </NavLink>
    //       </li>

    //       <li classNameName="nav-item">
    //         <NavLink classNameName="nav-link" to="/brick-balance/7675/sw">
    //           <span data-feather="home"></span> Star wars
    //         </NavLink>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>


    <div className="flex-shrink-0 p-3">
      <a href="/" className="d-flex pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
        <span className="fs-5 fw-semibold">Ban Lego Colection</span>
      </a>
      <ul className="list-unstyled ps-0">
        <li className="mb-1">
          <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
            Klocki
          </button>
          <div className="collapse show" id="home-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <NavLink
                  to="/bricks"
                  className="link-body-emphasis d-inline-flex text-decoration-none rounded">
                  klocki
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button className="btn btn-toggle d-inline-flex text-start rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
            Lego zestawy
          </button>
          <div className="collapse" id="dashboard-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><NavLink to="/sets" className="link-body-emphasis d-inline-flex text-decoration-none rounded">zestawy</NavLink></li>
              <li><NavLink to="/sets-list" className="link-body-emphasis d-inline-flex text-decoration-none rounded">zestawy klocki</NavLink></li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button className="btn btn-toggle d-inline-flex text-start  rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
            Moje klocki w zestawach
          </button>
          <div className="collapse" id="orders-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <NavLink
                  to="/brick-balance/6274/pirates"
                  className="link-body-emphasis d-inline-flex text-decoration-none rounded">
                  Pirates
                </NavLink></li>
              <li>
                <NavLink
                  to="/brick-balance/7675/sw"
                  className="link-body-emphasis d-inline-flex text-decoration-none rounded">
                  Star wars
                </NavLink></li>
            </ul>
          </div>
        </li>
        <li className="border-top my-3"></li>
        <li className="mb-1">
          <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
            Account
          </button>
          <div className="collapse" id="account-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">New...</a></li>
              <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Profile</a></li>
              <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Settings</a></li>
              <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Sign out</a></li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default LeftSideNavigation;
