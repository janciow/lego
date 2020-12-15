import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import QuantityTableInput from '../../../components/inputs/QuantityTableInput';

import * as actions from '../../../store/actions/index';
import * as selectors from '../../../store/selectors/index';
import { BrickBalanceLegoPiratesShip } from '../types';
import classNames  from 'classnames';

interface BrickBalanceLegoPiratesShipsListProps {
    legoPiratesShipBrickList: BrickBalanceLegoPiratesShip[]
}

interface BrickBalanceLegoPiratesShipsListDispatchProps {
    getLegoPiratesShipBrickListById: (setId: string) => Promise<void>;
    updatLegoBrickTotalQuantity: (elementId: string, quantityTotal: number) => Promise<void>;
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

    updateTotalValue = (elementId: string, setsId :string ,quantityTotal: number): any => {
        this.props.updatLegoBrickTotalQuantity(elementId, quantityTotal)
        const { setId } = this.props.match.params
        this.props.getLegoPiratesShipBrickListById(setId);
    }

    render() {
        const { legoPiratesShipBrickList } = this.props

        return <>
            <h2>Lista klocków</h2>
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
                            <th className="cursor-pointer" onClick={this.goToSet.bind(this, '70413')}>Bounty</th>

                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>

                        </tr>
                        <tr >

                            <th>Obrazek</th>
                            <th>model_id</th>
                            <th>set_6274_q</th>
                            <th>set_6285_q</th>
                            <th>set_6286_q</th>
                            <th>set_10210_q</th>
                            <th>set_6243_q</th>
                            <th>set_4195_q</th>
                            <th>set_70413_q</th>

                            <th>Suma potrzebnych do zestawów</th>
                            <th>Wszystkie klocki</th>
                            <th>aktualizacja</th>
                            <th>Opis</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            legoPiratesShipBrickList.map(({ quantity_total, model_id, set_6286_q, set_6285_q, total_q, img_pathname, description, set_10210_q, set_4195_q, set_6274_q, set_6243_q, element_id, set_70413_q }) => {
                                return (
                                    <tr key={element_id} className={classNames( { 'table-success':  quantity_total !== null && quantity_total >= total_q  })}>

                                        <td className="text-center align-middle"><img src={`/img/${img_pathname}`} alt={'ddd'}></img></td>
                                        <td className="text-center align-middle">{model_id}</td>
                                        <td className="text-center align-middle">{set_6274_q}</td>
                                        <td className="text-center align-middle">{set_6285_q}</td>
                                        <td className="text-center align-middle">{set_6286_q}</td>
                                        <td className="text-center align-middle">{set_10210_q}</td>
                                        <td className="text-center align-middle">{set_6243_q}</td>
                                        <td className="text-center align-middle">{set_4195_q}</td>
                                        <td className="text-center align-middle">{set_70413_q}</td>
                                        <td className="text-center align-middle">{total_q}</td>
                                        <td className="text-center align-middle">{quantity_total}</td>
                                        <td className="text-center align-middle">
                                            <QuantityTableInput
                                                element_id={element_id}
                                                lego_set_id={''}
                                                updateTotalValue={this.updateTotalValue}
                                            />
                                        </td>
                                        <td className="align-middle">{description}</td>
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
        updatLegoBrickTotalQuantity: (elementId: string, quantityTotal: number) => dispatch(actions.updatLegoBrickTotalQuantity(elementId, quantityTotal)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BrickBalanceLegoPiratesShipsList));