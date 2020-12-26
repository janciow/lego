import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import QuantityTableInput from '../../../components/inputs/QuantityTableInput';

import * as actions from '../../../store/actions/index';
import * as selectors from '../../../store/selectors/index';
import { BrickBalanceLegoStarWarsClonShips } from '../types';
import classNames  from 'classnames';

interface BrickBalanceLegoStarWarsClonShipsListProps {
    legoStarWarsCloneShipBrickList: BrickBalanceLegoStarWarsClonShips[]
}

interface BrickBalanceLegoStarWarsClonShipssListDispatchProps {
    getLegoStarWarsCloneShipBrickListById: (setId: string) => Promise<void>;
    updateLegoBrickTotalQuantity: (elementId: string,setIds: string ,quantityTotal: number) => Promise<void>;
}

class BrickBalanceLegoStarWarsCloneShipsList extends React.Component<BrickBalanceLegoStarWarsClonShipsListProps & BrickBalanceLegoStarWarsClonShipssListDispatchProps & RouteComponentProps<{ setId: string }>> {

    componentDidMount() {
        const { setId } = this.props.match.params
        this.props.getLegoStarWarsCloneShipBrickListById(setId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.setId !== prevProps.match.params.setId) {
            const { setId } = this.props.match.params
            this.props.getLegoStarWarsCloneShipBrickListById(setId);
        }
    }

    goToSet = (setNumber: string) => {
        this.props.history.push(`/brick-balance/${setNumber}/sw`)
    }

    updateTotalValue = (elementId: string, setIds: string, quantityTotal: number): any => {
        this.props.updateLegoBrickTotalQuantity(elementId, setIds,quantityTotal).then(() => {
            this.props.getLegoStarWarsCloneShipBrickListById(setIds);
        })
    }

    render() {
        const { legoStarWarsCloneShipBrickList } = this.props
        const { setId } = this.props.match.params

        return <>
            <h2>Lista klocków</h2>
            <div className="table-responsive">
                <table className="table table-striped table-sm table-bordered table-responsive-2">
                    <thead>
                        <tr>

                            <th></th>
                            <th></th>
                            <th className="cursor-pointer" onClick={this.goToSet.bind(this, '7675')}>AT-TE Walker</th>
                            <th className="cursor-pointer" onClick={this.goToSet.bind(this, '7676')}>Republic Attack Gunship</th>
                            <th className="cursor-pointer" onClick={this.goToSet.bind(this, '10195')}>Republic Dropship with AT-OT</th>       

                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>

                        </tr>
                        <tr >

                            <th>Obrazek</th>
                            <th>model_id</th>
                            <th>set_7675_q</th>
                            <th>set_7676_q</th>
                            <th>set_10195_q</th>
              
                            <th>Suma potrzebnych do zestawów</th>
                            <th>Wszystkie klocki</th>
                            <th>aktualizacja</th>
                            <th>Opis</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            legoStarWarsCloneShipBrickList.map(({ quantity_total, model_id, set_7675_q, set_7676_q, set_10195_q ,total_q, img_pathname, description, element_id }) => {
                                return (
                                    <tr key={element_id} className={classNames( { 'table-success':  quantity_total !== null && quantity_total >= total_q  })}>

                                        <td className="text-center align-middle"><img src={`/img/${img_pathname}`} alt={img_pathname}></img></td>
                                        <td className="text-center align-middle">{model_id}</td>
                                        <td className="text-center align-middle">{set_7675_q}</td>
                                        <td className="text-center align-middle">{set_7676_q}</td>
                                        <td className="text-center align-middle">{set_10195_q}</td>
                
                                        <td className="text-center align-middle">{total_q}</td>
                                        <td className="text-center align-middle">{quantity_total}</td>
                                        <td className="text-center align-middle">
                                            <QuantityTableInput
                                                element_id={element_id}
                                                lego_set_id={setId}
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
        legoStarWarsCloneShipBrickList: selectors.selectLegoStarWarsClonesShipBrickList(state),
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getLegoStarWarsCloneShipBrickListById: (setId: string) => dispatch(actions.getLegoStarWarsCloneShipBrickListById(setId)),
        updateLegoBrickTotalQuantity: (elementId: string, setId: string, quantityTotal: number) => dispatch(actions.updateLegoBrickTotalQuantity(elementId,setId ,quantityTotal)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BrickBalanceLegoStarWarsCloneShipsList));