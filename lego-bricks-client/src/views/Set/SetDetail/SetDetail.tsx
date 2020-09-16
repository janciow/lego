import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import QuantityTableInput from '../../../components/inputs/QuantityTableInput';

import * as actions from '../../../store/actions/index';
import * as selectors from '../../../store/selectors/index';
import LegoSet from '../LegoSet.model';
import LegoSetPart from '../LegoSetPart.model';


interface SetDetailsProps {
    set: LegoSet,
    setBricks: LegoSetPart[]
}

interface SetDetailDispatchProps {
    getLegoSetDetails: (legoSetNumber: string) => Promise<void>;
    getSetBricksBySetId: (legoSetNumber: string) => Promise<void>;
    updatLegoBrickTotalQuantity: (elementId: string, quantityTotal: number) => Promise<void>;
}

class SetDetail extends React.Component<SetDetailsProps & SetDetailDispatchProps & RouteComponentProps<{ setId: string }>> {

    componentDidMount() {
        const { setId } = this.props.match.params
        this.props.getLegoSetDetails(setId)
        this.props.getSetBricksBySetId(setId)
    }

    updateTotalValu = (elementId: string, quantityTotal: number): any => {
        this.props.updatLegoBrickTotalQuantity(elementId, quantityTotal)
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
                            <th>ilość przypisana</th>
                            <th>wszystkie klocki</th>
                            <th>opis</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            setBricks.map(({ element_id, brick_id, img_pathname, description, quantity, model_id, quantity_in_set, quantity_total }, index) => {
                                return (
                                    <tr key={brick_id} >
                                        <td>{index + 1}</td>
                                        <td><img src={`/img/${img_pathname}`} alt={description}></img></td>
                                        <td className="text-center align-middle">{model_id}</td>
                                        <td className="text-center align-middle">{quantity}</td>
                                        <td className="text-center align-middle">{quantity_in_set}</td>
                                        <td className="align-middle">
                                            <QuantityTableInput quantity_total={quantity_total} element_id={element_id} updateTotalValu={this.updateTotalValu}/>                                          
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
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SetDetail));