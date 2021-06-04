import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from './App'
import reportWebVitals from './reportWebVitals'
import coffeeBuilderReducer from './store/reducers/coffeeBuilder'
import orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'

const composeEnhancers =
  process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose

const rootReducer = combineReducers({
  coffeeBuilder: coffeeBuilderReducer,
  order: orderReducer,
  auth: authReducer,
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
