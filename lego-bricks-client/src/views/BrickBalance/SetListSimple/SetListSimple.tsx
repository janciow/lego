import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom'

import * as actions from '../../../store/actions/index';
import * as selectors from '../../../store/selectors/index';
import LegoSet from '../../Set/LegoSet.model';





interface SetListSimpleProps {
    sets: LegoSet[]
}


interface SetListSimpleDispatchProps {
    getSetsList: () => Promise<void>
}

class SetListSimple extends React.Component<SetListSimpleProps & SetListSimpleDispatchProps & RouteComponentProps> {

    componentDidMount() {
        this.props.getSetsList()
    }

    goToSet = (setNumber: string) => {

        if (setNumber === '7676' || setNumber === '7675' || setNumber === '10195') {  
            this.props.history.push(`brick-balance/${setNumber}/sw`)
        } else {
            this.props.history.push(`brick-balance/${setNumber}/pirates`)
        }
    }

    render() {
        const { sets } = this.props

        return <>
            <h2>Lista zestawów uproszczona </h2>
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
                                    <tr key={set_number} onClick={this.goToSet.bind(this, set_number)} className="cursor-pointer">
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SetListSimple));