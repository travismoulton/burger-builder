import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    laoding: false,
    error: false,
  };

  componentDidMount() {
    // axios
    //   .get('/ingredients.json')
    //   .then((res) => {
    //     this.setState({ ingredients: res.data });
    //   })
    //   .catch((err) => this.setState({ error: true }));
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCanceledHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinuedHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          '=' +
          +encodeURIComponent(this.state.ingredients[i])
      );
    }

    queryParams.push(`price=${this.props.totalPrice}`);

    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    });
  };

  render() {
    const disableInfo = { ...this.props.ingredients };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.state.loading) orderSummary = <Spinner />;

    console.log(this.props.ingredients);

    if (this.props.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disableInfo}
            purchasable={this.state.purchasable}
            price={this.props.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseCanceled={this.purchaseCanceledHandler}
          purchaseContinued={this.purchaseContinuedHandler}
          price={this.props.totalPrice}
        />
      );
    }
    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCanceledHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { ingredients: state.ingredients, totalPrice: state.totalPrice };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
    onIngredientRemoved: (ingredientName) =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
