import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

const Orders = () => {
  const { orderList, loading, token, userId } = useSelector(state => ({
    orderList: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  }))

  const dispatch = useDispatch()
  const onFetchOrders = useCallback((token, userId) => dispatch(actions.fetchOrders(token, userId)), [dispatch])

  useEffect(() => {
    onFetchOrders(token, userId)
  }, [onFetchOrders, token, userId])

  let orders = <Spinner />
  if (!loading) {
    orders = orderList.map(order => <Order key={order.id} ingredients={order.ingredients} price={order.price} />)
  }
  return <div>{orders}</div>
}

export default Orders
