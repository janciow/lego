import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import QuantityTableInput from '../../../components/inputs/QuantityTableInput';

import * as actions from '../../../store/actions/index';
import * as selectors from '../../../store/selectors/index';
import LegoSet from '../LegoSet.model';
import LegoSetPart from '../LegoSetPart.model';
import classNames from 'classnames';


interface SetDetailsProps {
    set: LegoSet,
    setBricks: LegoSetPart[]
}

interface SetDetailDispatchProps {
    getLegoSetDetails: (legoSetNumber: string) => Promise<void>;
    getSetBricksBySetId: (legoSetNumber: string) => Promise<void>;
    updatLegoBrickTotalQuantity: (elementId: string, quantityTotal: number) => Promise<void>;
    updatLegoBrickQuantityInSet: (elementId: string, setIds: string ,quantityTotal: number) => Promise<void>;
}

class SetDetail extends React.Component<SetDetailsProps & SetDetailDispatchProps & RouteComponentProps<{ setId: string }>> {

    componentDidMount() {
        const { setId } = this.props.match.params
        this.props.getLegoSetDetails(setId)
        this.props.getSetBricksBySetId(setId)
    }

    updateTotalValue = (elementId: string, setIds: string, quantityTotal: number): any => {
        this.props.updatLegoBrickTotalQuantity(elementId, quantityTotal)
        const { setId } = this.props.match.params
        this.props.getSetBricksBySetId(setId);
    }

    updateBuidInValue = (elementId: string, setIds: string, quantityTotal: number): any => {
        this.props.updatLegoBrickQuantityInSet(elementId, setIds ,quantityTotal)
        const { setId } = this.props.match.params
        this.props.getSetBricksBySetId(setId);
    }

    render() {
        const { set, setBricks } = this.props
        return <>
            <h1>{set?.set_number} {set?.name}</h1>
            <h4>{set?.description}</h4>
            <h2>Lista klcków </h2>
            <div className="table-responsive">
                <table className="table table-striped table-sm table-bordered">
                    <thead>
                        <tr>
                            <th>Lp</th>
                            <th>obrazek</th>
                            <th>model_id</th>
                            <th>ilość</th>
                            <th>ilość (build in)</th>
                            <th>wszystkie klocki</th>
                            <th>aktualizacja wszystkich klockow</th>
                            <th>aktualizacja wbudowanych klockow</th>
                            <th>opis</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            setBricks.map(({ element_id, brick_id, img_pathname, description, quantity, model_id, quantity_in_set, quantity_total, lego_set_id }, index) => {
                                return (
                                    <tr key={brick_id} className={classNames({ 'table-success': quantity !== null && quantity_total !== null && quantity_total >= quantity })}>
                                        <td>{index + 1}</td>
                                        <td><img src={`/img/${img_pathname}`} alt={model_id?.toString() || ''}></img></td>
                                        <td className="text-center align-middle">{model_id}</td>
                                        <td className="text-center align-middle">{quantity}</td>
                                        <td className="text-center align-middle">{quantity_in_set}</td>
                                        <td className="text-center align-middle">{quantity_total}</td>
                                        <td className="align-middle">
                                            <QuantityTableInput element_id={element_id} lego_set_id={'lego_set_id'} updateTotalValue={this.updateTotalValue} />
                                        </td>
                                        <td className="align-middle">
                                            <QuantityTableInput element_id={element_id} lego_set_id={lego_set_id} updateTotalValue={this.updateBuidInValue} />
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
        set: selectors.selectSetdetails(state),
        setBricks: selectors.selectSetsBricks(state),
    };
}

const mapDispatchToProps = (dispatch): SetDetailDispatchProps => {
    return {
        getLegoSetDetails: (legoSetNumber: string) => dispatch(actions.getLegoSetDetails(legoSetNumber)),
        getSetBricksBySetId: (legoSetNumber: string) => dispatch(actions.getSetBricksBySetId(legoSetNumber)),
        updatLegoBrickTotalQuantity: (elementId: string, quantityTotal: number) => dispatch(actions.updatLegoBrickTotalQuantity(elementId, quantityTotal)),
        updatLegoBrickQuantityInSet: (elementId: string, setIds: string, quantityTotal: number) => dispatch(actions.updatLegoBrickQuantityInSet(elementId, setIds, quantityTotal)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SetDetail));