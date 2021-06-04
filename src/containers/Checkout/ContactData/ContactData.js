import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.module.css'
import Input from '../../../components/UI/Input/Input'
import * as actions from '../../../store/actions/index'
import { updateObject, checkValidity } from '../../../shared/utility'

const ContactData = props => {
  const { ings, price, loading, token, userId } = useSelector(state => ({
    ings: state.coffeeBuilder.ingredients,
    price: state.coffeeBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  }))

  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Name',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP',
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'County',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Quick' },
          { value: 'cheapest', displayValue: 'Cheap' },
        ],
      },
      value: 'fastest',
      validation: {},
      valid: true,
    },
  })
  const [formIsValid, setFormIsValid] = useState(false)

  const dispatch = useDispatch()
  const onOrderCoffee = (orderData, token) => dispatch(actions.purchaseCoffee(orderData, token))

  const orderHandler = event => {
    event.preventDefault()

    const formData = {}
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value
    }
    const order = {
      ingredients: ings,
      price: price,
      orderData: formData,
      userId: userId,
    }

    onOrderCoffee(order, token)
  }

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
      touched: true,
    })
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement,
    })

    let formIsValid = true
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }
    setOrderForm(updatedOrderForm)
    setFormIsValid(formIsValid)
  }

  const formElementsArray = []
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    })
  }
  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button btnType="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  )
  if (loading) {
    form = <Spinner />
  }
  return (
    <div className={classes.ContactData}>
      <h4>Delivery</h4>
      {form}
    </div>
  )
}

export default ContactData
