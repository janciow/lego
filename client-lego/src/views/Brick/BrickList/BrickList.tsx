import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

// import QuantityTableInput from "../../../components/inputs/QuantityTableInput";

import * as actions from "../../../store/actions/index";
import * as selectors from "../../../store/selectors/index";
import LegoBrick from "../../Set/LegoBrick.model";

interface BrickListProps {
  bricks: LegoBrick[];
  colors: any[];
}

export interface BrickQueryParams {
  colorId: string
}

interface BrickListDispatchProps {
  getBricksList: (qp?: BrickQueryParams) => Promise<void>;
  getColorsList: () => Promise<void>;
}

class BrickList extends React.Component<
  BrickListProps & BrickListDispatchProps & any
> {
  componentDidMount() {
    this.props.getBricksList();
    this.props.getColorsList();
  }

  handleChange = (event: any) => {
    console.log(event.target.value);

    this.props.getBricksList({ colorId: event.target.value });

  }

  render() {
    const { bricks, colors } = this.props;

    return (
      <>
        <h2>Lista klocków 1</h2>

        <div className="input-group mb-3">
          <select className="custom-select" id="inputGroupSelect02" onChange={this.handleChange}>
            <option selected value="">Choose...</option>

            {colors.map(({ id, name }: any) => {
              return <option value={id}>{name}</option>;
            })}
          </select>
          <div className="input-group-append">
            <label className="input-group-text" htmlFor="inputGroupSelect02">
              Options
            </label>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-sm table-bordered table-responsive-1">
            <thead>
              <tr>
                <th>Lp</th>
                <th>obrazek</th>
                <th>model_id</th>
                {/* <th>ilość</th> */}
                {/* <th>ilość (build in)</th> */}
                <th>wolne klocki</th>
                <th>wszystkie klocki</th>
                {/* <th>aktualizacja wbudowanych klockow</th> */}
                {/* <th>aktualizacja wszystkich klockow</th> */}
                <th>opis</th>
              </tr>
            </thead>
            <tbody>
              {bricks.map(
                (
                  {
                    img_pathname,
                    description,
                    model_id,
                    quantity_total,
                    quantity_free_bricks,
                  }: any,
                  index: any
                ) => {
                  return (
                    <tr key={description}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={`/img/${img_pathname}`}
                          alt={model_id?.toString() || ""}
                        ></img>
                      </td>
                      <td className="text-center align-middle">{model_id}</td>
                      {/* <td className="text-center align-middle">{quantity}</td> */}
                      {/* <td className="text-center align-middle">
                        {quantity_in_set}
                      </td> */}
                      <td className="text-center align-middle">
                        {quantity_free_bricks}
                      </td>
                      <td className="text-center align-middle">
                        {quantity_total}
                      </td>
                      {/* <td className="align-middle">
                        <QuantityTableInput
                          element_id={element_id}
                          lego_set_id={lego_set_id}
                          updateTotalValue={this.updateBuildInValue}
                        />
                      </td>
                      <td className="align-middle">
                        <QuantityTableInput
                          element_id={element_id}
                          lego_set_id={lego_set_id}
                          updateTotalValue={this.updateTotalValue}
                        />
                      </td> */}
                      <td className="align-middle">{description}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    colors: selectors.selectColorsExactList(state),
    bricks: selectors.selectBrickList(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getBricksList: (qp: any) => dispatch(actions.getBricksList(qp)),
    getColorsList: () => dispatch(actions.getColorsList()),
  };
};

export default  connect(mapStateToProps, mapDispatchToProps)(BrickList)

