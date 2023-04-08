import React, { Component } from 'react';
import {  Outlet} from "react-router-dom";
import './Layout.scss';
import LeftSideNavigation from '../../components/LeftSideNavigation/LeftSideNavigation';

class Layout extends Component<any> {
    render() {
        return (
            <>
                <main role="main" >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-3">
                                <LeftSideNavigation />

                            </div>
                            <div className="col-9">
                                {/* <div className="b-example-divider b-example-vr"> */}

                                <Outlet />
                                {/* </div> */}
                             
                            </div>

                        </div>
                    </div>
                </main>
            </>
        )
    }
}

export default Layout;