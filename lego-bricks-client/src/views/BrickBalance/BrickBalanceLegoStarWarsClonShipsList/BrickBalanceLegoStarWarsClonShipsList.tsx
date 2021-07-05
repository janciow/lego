import React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import QuantityTableInput from "../../../components/inputs/QuantityTableInput";

import * as actions from "../../../store/actions/index";
import * as selectors from "../../../store/selectors/index";
import { BrickBalanceLegoStarWarsClonShips } from "../types";
import classNames from "classnames";

interface BrickBalanceLegoStarWarsClonShipsListProps {
  legoStarWarsCloneShipBrickList: BrickBalanceLegoStarWarsClonShips[];
}

interface BrickBalanceLegoStarWarsClonShipssListDispatchProps {
  getLegoStarWarsCloneShipBrickListById: (
    setId: string,
    orderBy: string | null,
    orderDirection: string | null
  ) => Promise<void>;
  updateLegoBrickTotalQuantity: (
    elementId: string,
    setIds: string,
    quantityTotal: number
  ) => Promise<void>;
}

class BrickBalanceLegoStarWarsCloneShipsList extends React.Component<
  BrickBalanceLegoStarWarsClonShipsListProps &
    BrickBalanceLegoStarWarsClonShipssListDispatchProps &
    RouteComponentProps<{
      setId: string;
      orderBy: string;
      orderDirection: string;
    }>
> {
  componentDidMount() {
    const { setId, orderBy, orderDirection } = this.props.match.params;
    this.props.getLegoStarWarsCloneShipBrickListById(
      setId,
      orderBy,
      orderDirection
    );
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.match.params.setId !== prevProps.match.params.setId) {
  //     const { setId } = this.props.match.params;

  //     const qs = new URLSearchParams(this.props.location.search);

  //     this.props.getLegoStarWarsCloneShipBrickListById(
  //       setId,
  //       qs.get("orderBy") || "brick.description",
  //       qs.get("orderDirection") || "asc"
  //     );
  //   }
  // }

  orderBy = (setNumber: string, orderBy: string, orderDirection: string) => {
    this.props.history.push(
      `/brick-balance/${setNumber}/sw?orderBy=${orderBy}&orderDirection=${orderDirection}`
    );

    this.props.getLegoStarWarsCloneShipBrickListById(
      setNumber,
      orderBy || "brick.description",
      orderDirection || "asc"
    );
  };

  goToSet = (setNumber: string) => {
    this.props.history.push(`/brick-balance/${setNumber}/sw`);

    const qs = new URLSearchParams(this.props.location.search);

    this.props.getLegoStarWarsCloneShipBrickListById(
      setNumber,
      qs.get("orderBy") || "brick.description",
      qs.get("orderDirection") || "asc"
    );
  };

  updateTotalValue = (
    elementId: string,
    setIds: string,
    quantityTotal: number
  ): any => {
    this.props
      .updateLegoBrickTotalQuantity(elementId, setIds, quantityTotal)
      .then(() => {
        const { orderBy, orderDirection } = this.props.match.params;
        this.props.getLegoStarWarsCloneShipBrickListById(
          setIds,
          orderBy,
          orderDirection
        );
      });
  };

  render() {
    const { legoStarWarsCloneShipBrickList } = this.props;
    const { setId } = this.props.match.params;

    return (
      <>
        <div>
          {" "}
          <h2>Lista klocków</h2>
          <ul className="nav">
            <li
              className="nav-item cursor-pointer"
              onClick={this.goToSet.bind(this, "7675")}
            >
              <span className="nav-link"> AT-TE Walker</span>
            </li>
            <li
              className="nav-item cursor-pointer"
              onClick={this.goToSet.bind(this, "7676")}
            >
              <span className="nav-link"> Republic Attack Gunship</span>
            </li>
            <li
              className="nav-item cursor-pointer"
              onClick={this.goToSet.bind(this, "10195")}
            >
              <span className="nav-link">Republic Dropship with AT-OT</span>
            </li>
            <li
              className="nav-item cursor-pointer"
              onClick={this.goToSet.bind(this, "75151")}
            >
              <span className="nav-link">Clone Turbo Tank</span>
            </li>
          </ul>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-sm table-bordered table-responsive-2">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th
                  className="cursor-pointer"
                  onClick={this.goToSet.bind(this, "7675")}
                >
                  AT-TE Walker
                </th>
                <th
                  className="cursor-pointer"
                  onClick={this.goToSet.bind(this, "7676")}
                >
                  Republic Attack Gunship
                </th>
                <th
                  className="cursor-pointer"
                  onClick={this.goToSet.bind(this, "10195")}
                >
                  Republic Dropship with AT-OT
                </th>
                <th
                  className="cursor-pointer"
                  onClick={this.goToSet.bind(this, "75151")}
                >
                  Clone Turbo Tank
                </th>

                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
              <tr>
                <th>Obrazek</th>
                <th>model_id</th>
                <th
                  onClick={this.orderBy.bind(
                    this,
                    "7675",
                    "set_7675_q",
                    "desc"
                  )}
                >
                  set_7675_q
                </th>
                <th
                  onClick={this.orderBy.bind(
                    this,
                    "7676",
                    "set_7676_q",
                    "desc"
                  )}
                >
                  set_7676_q
                </th>
                <th
                  onClick={this.orderBy.bind(
                    this,
                    "10195",
                    "set_10195_q",
                    "desc"
                  )}
                >
                  set_10195_q
                </th>
                <th
                  onClick={this.orderBy.bind(
                    this,
                    "75151",
                    "set_75151_q",
                    "desc"
                  )}
                >
                  set_75151_q
                </th>

                <th onClick={this.orderBy.bind(this, setId, "total_q", "desc")}>
                  Suma potrzebnych do zestawów
                </th>
                <th>Wszystkie klocki</th>
                <th>aktualizacja</th>
                <th
                  onClick={this.orderBy.bind(
                    this,
                    setId,
                    "brick.description",
                    "asc"
                  )}
                >
                  Opis
                </th>
              </tr>
            </thead>
            <tbody>
              {legoStarWarsCloneShipBrickList.map(
                ({
                  quantity_total,
                  model_id,
                  set_7675_q,
                  set_7676_q,
                  set_75151_q,
                  set_10195_q,
                  total_q,
                  img_pathname,
                  description,
                  element_id,
                }) => {
                  return (
                    <tr
                      key={element_id}
                      className={classNames({
                        "table-success":
                          quantity_total !== null && quantity_total >= total_q,
                      })}
                    >
                      <td className="text-center align-middle">
                        <img
                          src={`/img/${img_pathname}`}
                          alt={img_pathname}
                        ></img>
                      </td>
                      <td className="text-center align-middle">{model_id}</td>
                      <td className="text-center align-middle">{set_7675_q}</td>
                      <td className="text-center align-middle">{set_7676_q}</td>
                      <td className="text-center align-middle">
                        {set_10195_q}
                      </td>
                      <td className="text-center align-middle">
                        {set_75151_q}
                      </td>

                      <td className="text-center align-middle">{total_q}</td>
                      <td className="text-center align-middle">
                        {quantity_total}
                      </td>
                      <td className="text-center align-middle">
                        <QuantityTableInput
                          element_id={element_id}
                          lego_set_id={setId}
                          updateTotalValue={this.updateTotalValue}
                        />
                      </td>
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
    legoStarWarsCloneShipBrickList:
      selectors.selectLegoStarWarsClonesShipBrickList(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLegoStarWarsCloneShipBrickListById: (
      setId: string,
      orderBy: string,
      orderDirection: string
    ) =>
      dispatch(
        actions.getLegoStarWarsCloneShipBrickListById(
          setId,
          orderBy,
          orderDirection
        )
      ),
    updateLegoBrickTotalQuantity: (
      elementId: string,
      setId: string,
      quantityTotal: number
    ) =>
      dispatch(
        actions.updateLegoBrickTotalQuantity(elementId, setId, quantityTotal)
      ),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BrickBalanceLegoStarWarsCloneShipsList)
);
