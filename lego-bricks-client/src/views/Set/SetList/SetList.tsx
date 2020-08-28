import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom'

import * as actions from '../../../store/actions/index';
import * as selectors from '../../../store/selectors/index';
import LegoSet from '../LegoSet.model';



interface SetListProps {
    sets: LegoSet[]
}

interface SetListDispatchProps {
    getSetsList: () => Promise<void>
}

class SetList extends React.Component<SetListProps & SetListDispatchProps & RouteComponentProps> {

    componentDidMount() {
        this.props.getSetsList()
    }

    goToSet = (setNumber: string) => {
        this.props.history.push(`sets/${setNumber}`)
    }

    render() {
        const { sets } = this.props

        return <>
            <h2>Lista zestawów </h2>
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
                            sets.map(({ set_number, name, description }, index) => {
                                return (
                                    <tr key={set_number} onClick={this.goToSet.bind(this, set_number)}>
                                        <td>{index + 1}</td>
                                        <td>{set_number}</td>
                                        <td>{name}</td>
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
        sets: selectors.selectSetsList(state),
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getSetsList: () => dispatch(actions.getSetsList()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SetList));