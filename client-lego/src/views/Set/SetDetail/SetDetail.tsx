import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'
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
    getSetBricksBySetId: (legoSetNumber: string, resetTable?: boolean) => Promise<void>;
    updateLegoBrickTotalQuantity: (elementId: string, setIds: string, quantityTotal: number) => Promise<void>;
    updateLegoBrickQuantityInSet: (elementId: string, setIds: string, quantityTotal: number) => Promise<void>;
}

function withParams(Component: any) {
    return (props: any) => <Component {...props} params={useParams()} />;
}

class SetDetail extends React.Component<SetDetailsProps & SetDetailDispatchProps & any> {

    componentDidMount() {
        const { setId } = this.props.params
        this.props.getLegoSetDetails(setId)
        this.props.getSetBricksBySetId(setId, true)
    }

    updateTotalValue = (elementId: string, setIds: string, quantityTotal: number): any => {
        this.props.updateLegoBrickTotalQuantity(elementId, setIds, quantityTotal).then(() => {
            this.props.getSetBricksBySetId(setIds);
        })
    }

    updateBuildInValue = (elementId: string, setIds: string, quantityTotal: number): any => {
        this.props.updateLegoBrickQuantityInSet(elementId, setIds, quantityTotal).then(() => {
            this.props.getSetBricksBySetId(setIds);
        })
    }

    render() {
        const { set, setBricks } = this.props
        return <>
            <h1>{set?.set_number} {set?.name}</h1>
            <h4>{set?.description}</h4>
            <h2>Lista klocków</h2>
            <div className="table-responsive">
                <table className="table table-striped table-sm table-bordered table-responsive-1">
                    <thead>
                        <tr>
                            <th>Lp</th>
                            <th>obrazek</th>
                            <th>model_id</th>
                            <th>ilość</th>
                            <th>ilość (build in)</th>
                            <th>wolne klocki</th>
                            <th>wszystkie klocki</th>
                            <th>aktualizacja wbudowanych klockow</th>
                            <th>aktualizacja wszystkich klockow</th>
                            <th>opis</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            setBricks.map(({ element_id, brick_id, img_pathname, description, quantity, model_id, quantity_in_set, quantity_total, lego_set_id, quantity_free_bricks }: any, index: any) => {
                                return (
                                    <tr key={brick_id} className={classNames({ 'table-success': quantity !== null && quantity_in_set !== null && quantity_in_set >= quantity })}>
                                        <td>{index + 1}</td>
                                        <td><img src={`/img/${img_pathname}`} alt={model_id?.toString() || ''}></img></td>
                                        <td className="text-center align-middle">{model_id}</td>
                                        <td className="text-center align-middle">{quantity}</td>
                                        <td className="text-center align-middle">{quantity_in_set}</td>
                                        <td className="text-center align-middle">{quantity_free_bricks}</td>
                                        <td className="text-center align-middle">{quantity_total}</td>
                                        <td className="align-middle">
                                            <QuantityTableInput element_id={element_id} lego_set_id={lego_set_id} updateTotalValue={this.updateBuildInValue} />
                                        </td>
                                        <td className="align-middle">
                                            <QuantityTableInput element_id={element_id} lego_set_id={lego_set_id} updateTotalValue={this.updateTotalValue} />
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

const mapStateToProps = (state: any) => {
    return {
        set: selectors.selectSetDetails(state),
        setBricks: selectors.selectSetsBricks(state),
    };
}

const mapDispatchToProps = (dispatch: any): SetDetailDispatchProps => {
    return {
        getLegoSetDetails: (legoSetNumber: string) => dispatch(actions.getLegoSetDetails(legoSetNumber)),
        getSetBricksBySetId: (legoSetNumber: string, resetTable?: boolean) => dispatch(actions.getSetBricksBySetId(legoSetNumber, resetTable)),
        updateLegoBrickTotalQuantity: (elementId: string, setIds: string, quantityTotal: number) => dispatch(actions.updateLegoBrickTotalQuantity(elementId, setIds, quantityTotal)),
        updateLegoBrickQuantityInSet: (elementId: string, setIds: string, quantityTotal: number) => dispatch(actions.updateLegoBrickQuantityInSet(elementId, setIds, quantityTotal)),
    }
}

export default withParams(connect(mapStateToProps, mapDispatchToProps)(SetDetail));