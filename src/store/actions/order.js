import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseCoffeeSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_COFFEE_SUCCESS,
    orderId: id,
    orderData: orderData,
  }
}

export const purchaseCoffeeFail = error => {
  return {
    type: actionTypes.PURCHASE_COFFEE_FAIL,
    error: error,
  }
}

export const purchaseCoffeeStart = () => {
  return {
    type: actionTypes.PURCHASE_COFFEE_START,
  }
}

export const purchaseCoffee = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseCoffeeStart())
    axios
      .post('orders.json?auth=' + token, orderData)
      .then(response => {
        dispatch(purchaseCoffeeSuccess(response.data.name, orderData))
      })
      .catch(error => {
        dispatch(purchaseCoffeeFail(error))
      })
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  }
}

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  }
}

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  }
}

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    const queryParams = '?auth=' + token + `&orderBy=${userId}&equalTo=` + userId
    axios
      .get('/orders.json' + queryParams)
      .then(res => {
        const fetchedOrders = []
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          })
        }
        dispatch(fetchOrdersSuccess(fetchedOrders))
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err))
      })
  }
}
