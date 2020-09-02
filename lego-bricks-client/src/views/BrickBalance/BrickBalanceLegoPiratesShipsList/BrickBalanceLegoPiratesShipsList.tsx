import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom'

import * as actions from '../../../store/actions/index';
import * as selectors from '../../../store/selectors/index';

interface BrickBalanceLegoPiratesShip {
    img_pathname: string;
    price: number;
    model_id: string;
    element_id: string;
    set_6286_q: null | number;
    set_6285_q: null | number;
    set_10210_q: null | number;
    set_4195_q: null | number;
    set_6243_q: null | number;
    set_6274_q: null | number;
    set_70413_q: null | number;
    total_q: number;
    lego_set_id: string;
    description: string;
}


interface BrickBalanceLegoPiratesShipsListProps {
    legoPiratesShipBrickList: BrickBalanceLegoPiratesShip[]
}

interface BrickBalanceLegoPiratesShipsListDispatchProps {
    getLegoPiratesShipBrickListById: (setId: string) => Promise<void>
}

class BrickBalanceLegoPiratesShipsList extends React.Component<BrickBalanceLegoPiratesShipsListProps & BrickBalanceLegoPiratesShipsListDispatchProps & RouteComponentProps<{ setId: string }>> {

    componentDidMount() {
        const { setId } = this.props.match.params
        this.props.getLegoPiratesShipBrickListById(setId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.setId !== prevProps.match.params.setId) {
            const { setId } = this.props.match.params
            this.props.getLegoPiratesShipBrickListById(setId);
        }
    }

    goToSet = (setNumber: string) => {
        this.props.history.push(`${setNumber}`)
    }

    render() {
        const { legoPiratesShipBrickList } = this.props

        return <>
            <h2>Lista klockow </h2>
            <div className="table-responsive">
                <table className="table table-striped table-sm table-bordered">
                    <thead>
                        <tr>

                            <th></th>
                            <th></th>
                            <th className="cursor-pointer" onClick={this.goToSet.bind(this, '6274')}>Clipper</th>
                            <th className="cursor-pointer" onClick={this.goToSet.bind(this, '6285')}>Barracuda</th>
                            <th className="cursor-pointer" onClick={this.goToSet.bind(this, '6286')}>Skull</th>
                            <th className="cursor-pointer" onClick={this.goToSet.bind(this, '10210')}>Imperial</th>
                            <th className="cursor-pointer" onClick={this.goToSet.bind(this, '6243')}>Brickbeard's</th>
                            <th className="cursor-pointer" onClick={this.goToSet.bind(this, '4195')}>Queen</th>
                            <th className="cursor-pointer" onClick={this.goToSet.bind(this, '70413')}>bouty</th>


                            <th></th>
                            <th></th>

                        </tr>
                        <tr >

                            <th>img</th>
                            <th>model_id</th>
                            <th>set_6274_q</th>
                            <th>set_6285_q</th>
                            <th>set_6286_q</th>
                            <th>set_10210_q</th>
                            <th>set_6243_q</th>
                            <th>set_4195_q</th>
                            <th>set_70413_q</th>

                            <th>total_q</th>
                            <th>description</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            legoPiratesShipBrickList.map(({ model_id, set_6286_q, set_6285_q, total_q, img_pathname, description, set_10210_q, set_4195_q, set_6274_q, set_6243_q, element_id, set_70413_q }) => {
                                return (
                                    <tr key={element_id} >

                                        <td className="text-center"><img src={`/img/${img_pathname}`} alt={'ddd'}></img></td>
                                        <td>{model_id}</td>
                                        <td className="text-center">{set_6274_q}</td>
                                        <td className="text-center">{set_6285_q}</td>
                                        <td className="text-center">{set_6286_q}</td>
                                        <td className="text-center">{set_10210_q}</td>
                                        <td className="text-center">{set_6243_q}</td>
                                        <td className="text-center">{set_4195_q}</td>
                                        <td className="text-center">{set_70413_q}</td>
                                        <td className="text-center">{total_q}</td>
                                        <td>{description}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    }

}

const mapStateToProps = state => {
    return {
        legoPiratesShipBrickList: selectors.selectLegoPiratesShipBrickList(state),
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getLegoPiratesShipBrickListById: (setId: string) => dispatch(actions.getLegoPiratesShipBrickListById(setId)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BrickBalanceLegoPiratesShipsList));