import React, { Component } from 'react';
import './Layout.scss';
import LeftSideNavigation from '../../components/LeftSideNavigation/LeftSideNavigation';

class Layout extends Component {
    render() {
        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <LeftSideNavigation />
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                            <div id="myChart">{this.props.children}</div>
                        </main>
                    </div>
                </div>

            </>
        )
    }
}

export default Layout;