import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom'


import * as actions from '../../../store/actions/index';
import * as selectors from '../../../store/selectors/index';
import LegoSet from '../LegoSet.model';
import { WithRefTest } from '../../../components/RefTest/WithRefTest';


interface SetDetailsProps {
    set: LegoSet,
    setBricks: any[]
}

interface SetDetailDispatchProps {
    getLegoSetDetails: (legoSetNumber: string) => Promise<void>
    getSetBricksBySetId: (legoSetNumber: string) => Promise<void>
}

class SetDetail extends React.Component<SetDetailsProps & SetDetailDispatchProps & RouteComponentProps<{ setId: string }>> {

    componentDidMount() {
        const { setId } = this.props.match.params
        this.props.getLegoSetDetails(setId)
        this.props.getSetBricksBySetId(setId)
    }

    render() {
        const { set, setBricks } = this.props


        return <>

            <h1>{set?.set_number} {set?.name}</h1>
            <h4>{set?.description}</h4>
            <h2>Lista klcków </h2>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Lp</th>
                            <th>obrazek</th>
                            <th>model_id</th>
                            <th>ilosc</th>
                            <th>opis</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            setBricks.map(({ brick_id, img_pathname, description, quantity, model_id }, index) => {
                                return (
                                    <tr key={brick_id} >
                                        <td>{index + 1}</td>
                                        <td><img src={`/img/${img_pathname}`} alt={description}></img></td>
                                        <td>{model_id}</td>
                                        <td>{quantity}</td>
                                        <td>{description}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                   
                </table>
                <WithRefTest />
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
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SetDetail));