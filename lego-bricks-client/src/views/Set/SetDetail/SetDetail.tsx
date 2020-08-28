import React from 'react';
import { connect } from 'react-redux';


import * as actions from '../../../store/actions/index';
import * as selectors from '../../../store/selectors/index';
import LegoSet from '../LegoSet.model';



interface SetDetailsProps {
    set: LegoSet
}

interface SetDetailDispatchProps {
    getLegoSetDetails: (legoSetNumber: string) => Promise<void>
}

class SetDetail extends React.Component<SetDetailsProps & SetDetailDispatchProps> {

    componentDidMount() {
        this.props.getLegoSetDetails('10210')
    }

    render() {
        const { set } = this.props
        console.log(set)

        const legoSet = set ? set : new LegoSet()

        return <>
            <h2>Lista klcków </h2>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Lp</th>
                            <th>set_number</th>
                            <th>name</th>
                            <th>description</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            // sets.map(({ set_number, name, description }, index) => {
                            //     return (
                            //         <tr key={set_number} onClick={this.goToSet.bind(this, set_number)}>
                            //             <td>{index + 1}</td>
                            //             <td>{set_number}</td>
                            //             <td>{name}</td>
                            //             <td>{description}</td>
                            //         </tr>
                            //     )
                            // })
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
    };
}

const mapDispatchToProps = (dispatch): SetDetailDispatchProps => {
    return {
        getLegoSetDetails: (legoSetNumber: string) => dispatch(actions.getLegoSetDetails(legoSetNumber)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetDetail);