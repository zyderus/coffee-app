import { useEffect, Suspense, lazy, useCallback } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Layout from './hoc/Layout/Layout'
import CoffeeBuilder from './containers/CoffeeBuilder/CoffeeBuilder'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'

const Auth = lazy(() => import('./containers/Auth/Auth'))
const Orders = lazy(() => import('./containers/Orders/Orders'))
const Checkout = lazy(() => import('./containers/Checkout/Checkout'))

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.token !== null)

  const dispatch = useDispatch()
  const onTryAutoSignup = useCallback(() => dispatch(actions.authCheckState()), [dispatch])

  useEffect(() => {
    onTryAutoSignup()
  }, [onTryAutoSignup])

  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/" exact component={CoffeeBuilder} />
      <Redirect to="/" />
    </Switch>
  )

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Route path="/orders" render={props => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/" exact component={CoffeeBuilder} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <div className="App">
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>
      </Layout>
    </div>
  )
}

export default App
