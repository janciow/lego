import React from 'react';
import { connect } from 'react-redux';
import { useParams} from 'react-router-dom'
import QuantityTableInput from '../../../components/inputs/QuantityTableInput';

import * as actions from '../../../store/actions/index';
import * as selectors from '../../../store/selectors/index';
import { BrickBalanceLegoPiratesShip } from '../types';
import classNames from 'classnames';

interface BrickBalanceLegoPiratesShipsListProps {
    legoPiratesShipBrickList: BrickBalanceLegoPiratesShip[]
}

interface BrickBalanceLegoPiratesShipsListDispatchProps {
    getLegoPiratesShipBrickListById: (setId: string) => Promise<void>;
    updateLegoBrickTotalQuantity: (elementId: string, setId: string, quantityTotal: number) => Promise<void>;
}

function withParams(Component: any) {
    return (props: any) => <Component {...props} params={useParams()} />;
  }

class BrickBalanceLegoPiratesShipsList extends React.Component<BrickBalanceLegoPiratesShipsListProps & BrickBalanceLegoPiratesShipsListDispatchProps & any> {

    componentDidMount() {
        const { setId } = this.props.params
        this.props.getLegoPiratesShipBrickListById(setId);
    }

    componentDidUpdate(prevProps:any) {
        if (this.props.params.setId !== prevProps.params.setId) {
            const { setId } = this.props.params
            this.props.getLegoPiratesShipBrickListById(setId);
        }
    }

    goToSet = (setNumber: string) => {
        this.props.history.push(`/brick-balance/${setNumber}/pirates`)
    }

    getClassNameAllBrickBuildIn = (setNumber: string, listRow: any) => {
        return classNames('text-center align-middle', { 'all-bricks-build-in': listRow[`set_${setNumber}_q_build_in`] !== null && listRow[`set_${setNumber}_q`] !== null && listRow[`set_${setNumber}_q_build_in`] >= listRow[`set_${setNumber}_q`] })
    }

    updateTotalValue = (elementId: string, setsId: string, quantityTotal: number): any => {
        this.props.updateLegoBrickTotalQuantity(elementId, setsId, quantityTotal).then(() => {
            this.props.getLegoPiratesShipBrickListById(setsId);
        })
    }

    render() {
        const { legoPiratesShipBrickList } = this.props
        const { setId } = this.props.match.params

        return <>
            <div>  <h2>Lista klocków</h2>
                <ul className="nav">
                    <li className="nav-item cursor-pointer" onClick={this.goToSet.bind(this, '6271')}><span className="nav-link" >Imperial FS</span></li>
                    <li className="nav-item cursor-pointer" onClick={this.goToSet.bind(this, '6274')}><span className="nav-link" >Clipper</span></li>
                    <li className="nav-item cursor-pointer" onClick={this.goToSet.bind(this, '6285')}><span className="nav-link" >Barracuda</span></li>
                    <li className="nav-item cursor-pointer" onClick={this.goToSet.bind(this, '6286')}><span className="nav-link" >Skull</span></li>
                    <li className="nav-item cursor-pointer" onClick={this.goToSet.bind(this, '10210')}><span className="nav-link" >Imperial</span></li>
                    <li className="nav-item cursor-pointer" onClick={this.goToSet.bind(this, '6243')}><span className="nav-link" >Brickbeard's</span></li>
                    <li className="nav-item cursor-pointer" onClick={this.goToSet.bind(this, '4195')}><span className="nav-link" >Queen</span></li>
                    <li className="nav-item cursor-pointer" onClick={this.goToSet.bind(this, '70413')}><span className="nav-link" >Bounty</span></li>
                </ul>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm table-bordered table-responsive-2">
                    <thead>
                        <tr>

                            <th></th>
                            <th></th>
                            <th>set_6271_q</th>
                            <th>set_6274_q</th>
                            <th>set_6285_q</th>
                            <th>set_6286_q</th>
                            <th>set_10210_q</th>
                            <th>set_6243_q</th>
                            <th>set_4195_q</th>
                            <th>set_70413_q</th>

                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>

                        </tr>
                        <tr >

                            <th>Obrazek</th>
                            <th>model_id</th>



                            <th className="cursor-pointer" onClick={this.goToSet.bind(this, '6271')}>imperisl fs</th>
                            <th className="cursor-pointer" onClick={this.goToSet.bind(this, '6274')}>Clipper</th>
                            <th className="cursor-pointer" onClick={this.goToSet.bind(this, '6285')}>Barracuda</th>
                            <th className="cursor-pointer" onClick={this.goToSet.bind(this, '6286')}>Skull</th>
                            <th className="cursor-pointer" onClick={this.goToSet.bind(this, '10210')}>Imperial</th>
                            <th className="cursor-pointer" onClick={this.goToSet.bind(this, '6243')}>Brickbeard's</th>
                            <th className="cursor-pointer" onClick={this.goToSet.bind(this, '4195')}>Queen</th>
                            <th className="cursor-pointer" onClick={this.goToSet.bind(this, '70413')}>Bounty</th>
                            <th>Suma wbudowanych</th>
                            <th>Suma potrzebnych do zestawów</th>
                            <th>wolne klocki</th>
                            <th>Wszystkie klocki</th>
                            <th>aktualizacja</th>
                            <th>Opis</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            legoPiratesShipBrickList.map((listRow: any) => {


                                const {
                                    quantity_total,
                                    model_id,
                                    set_6286_q,
                                    set_6271_q,
                                    set_6285_q,
                                    q_total_needed,
                                    img_pathname,
                                    description,
                                    set_10210_q,
                                    set_4195_q,
                                    set_6274_q,
                                    set_6243_q,
                                    element_id,
                                    set_70413_q,
                                    sum_quantity_build_in,
                                } = listRow

                                return (
                                    <tr key={element_id} className={classNames({ 'table-success': quantity_total !== null && quantity_total >= q_total_needed })}>

                                        <td className="text-center align-middle"><img src={`/img/${img_pathname}`} alt={img_pathname}></img></td>
                                        <td className="text-center align-middle">{model_id}</td>
                                        <td
                                            className={this.getClassNameAllBrickBuildIn('6271', listRow)}
                                        >{set_6271_q}</td>
                                        <td
                                            className={this.getClassNameAllBrickBuildIn('6274', listRow)}
                                        >{set_6274_q}</td>
                                        <td
                                            className={this.getClassNameAllBrickBuildIn('6285', listRow)}
                                        >{set_6285_q}</td>
                                        <td
                                            className={this.getClassNameAllBrickBuildIn('6286', listRow)}
                                        >{set_6286_q}</td>
                                        <td
                                            className={this.getClassNameAllBrickBuildIn('10210', listRow)}
                                        >{set_10210_q}</td>
                                        <td
                                            className={this.getClassNameAllBrickBuildIn('6243', listRow)}
                                        >{set_6243_q}</td>
                                        <td
                                            className={this.getClassNameAllBrickBuildIn('4195', listRow)}
                                        >{set_4195_q}</td>
                                        <td
                                            className={this.getClassNameAllBrickBuildIn('70413', listRow)}
                                        >{set_70413_q}</td>
                                        <td
                                            className="text-center align-middle"
                                        >{sum_quantity_build_in}</td>

                                        <td
                                            className={classNames('text-center align-middle', { 'all-bricks-build-in': sum_quantity_build_in >= q_total_needed })}


                                        >{q_total_needed}</td>


                                        <td className="text-center align-middle" >{(quantity_total === null ? 0 : quantity_total) - sum_quantity_build_in}</td>

                                        <td className="text-center align-middle" >{quantity_total}</td>
                                        <td className="text-center align-middle" >
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

const mapStateToProps = (state:any) => {
    return {
        legoPiratesShipBrickList: selectors.selectLegoPiratesShipBrickList(state),
    };
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        getLegoPiratesShipBrickListById: (setId: string) => dispatch(actions.getLegoPiratesShipBrickListById(setId)),
        updateLegoBrickTotalQuantity: (elementId: string, setId: string, quantityTotal: number) => dispatch(actions.updateLegoBrickTotalQuantity(elementId, setId, quantityTotal)),
    }
}

export default withParams(connect(mapStateToProps, mapDispatchToProps)(BrickBalanceLegoPiratesShipsList));