import React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";

// import QuantityTableInput from "../../../components/inputs/QuantityTableInput";

import * as actions from "../../../store/actions/index";
import * as selectors from "../../../store/selectors/index";
import LegoBrick from "../../Set/LegoBrick.model";

interface BrickListProps {
  bricks: LegoBrick[];
}

interface BrickListDispatchProps {
    getBricksList: () => Promise<void>;
}

class BrickList extends React.Component<
  BrickListProps & BrickListDispatchProps & RouteComponentProps
> {
  componentDidMount() {
    this.props.getBricksList();
  }

//   goToSet = (setNumber: string) => {
//     this.props.history.push(`sets/${setNumber}`);
//   };

  render() {
    const { bricks } = this.props;

    return (
      <>
        <h2>Lista klocków</h2>
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
                    element_id,
                    // brick_id,
                    img_pathname,
                    description,
                    // quantity,
                    model_id,
                    // quantity_in_set,
                    quantity_total,
                    // lego_set_id,
                    quantity_free_bricks,
                  },
                  index
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

const mapStateToProps = (state) => {
  return {
    colors: selectors.selectColorsExactList(state),
    bricks: selectors.selectBrickList(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBricksList: () => dispatch(actions.getBricksList()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BrickList)
);
