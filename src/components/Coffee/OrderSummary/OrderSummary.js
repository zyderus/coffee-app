import React from 'react'

import Button from '../../UI/Button/Button'

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
      </li>
    )
  })

  return (
    <>
      <h3>Order:</h3>
      <p>Your coffee design:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Ready to go?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        I changed my mind
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        Payment
      </Button>
    </>
  )
}

export default OrderSummary
