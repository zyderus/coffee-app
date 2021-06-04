import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Coffee from '../../components/Coffee/Coffee'
import BuildControls from '../../components/Coffee/BuildControls/Build-Controls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Coffee/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

const CoffeeBuilder = props => {
  const [purchasing, setPurchasing] = useState(false)

  const ings = useSelector(state => state.coffeeBuilder.ingredients)
  const price = useSelector(state => state.coffeeBuilder.totalPrice)
  const error = useSelector(state => state.coffeeBuilder.error)
  const isAuthenticated = useSelector(state => state.auth.token !== null)

  const dispatch = useDispatch()
  const onIngredientAdded = ingName => dispatch(actions.addIngredient(ingName))
  const onIngredientRemoved = ingName => dispatch(actions.removeIngredient(ingName))
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch])
  const onInitPurchase = () => dispatch(actions.purchaseInit())
  const onSetAuthRedirectPath = path => dispatch(actions.setAuthRedirectPath(path))

  useEffect(() => {
    onInitIngredients()
  }, [onInitIngredients])

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    return sum > 0
  }

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true)
    } else {
      onSetAuthRedirectPath('/checkout')
      props.history.push('/auth')
    }
  }

  const purchaseCancelHandler = () => setPurchasing(false)

  const purchaseContinueHandler = () => {
    onInitPurchase()
    props.history.push('/checkout')
  }

  const disabledInfo = { ...ings }
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }
  let orderSummary = null
  let coffee = error ? <p>Ingredients can't be loaded!</p> : <Spinner />

  if (ings) {
    coffee = (
      <>
        <Coffee ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
          price={price}
        />
      </>
    )
    orderSummary = (
      <OrderSummary
        ingredients={ings}
        price={price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    )
  }
  return (
    <>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {coffee}
    </>
  )
}

export default CoffeeBuilder
