import classes from './Auth.module.css'
import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'
import { updateObject, checkValidity } from '../../shared/utility'

const Auth = props => {
  const status = useSelector(state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingCoffee: state.coffeeBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  }))

  const dispatch = useDispatch()
  const onAuth = (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
  const onSetAuthRedirectPath = useCallback(() => dispatch(actions.setAuthRedirectPath('/')), [dispatch])

  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'email...',
      },
      ref: 'emailInput',
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'password...',
      },
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  })
  const [isSignup, setIsSignup] = useState(true)

  const { buildingCoffee, authRedirectPath } = status

  useEffect(() => {
    if (!buildingCoffee && authRedirectPath !== '/') {
      onSetAuthRedirectPath()
    }
  }, [buildingCoffee, authRedirectPath, onSetAuthRedirectPath])

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, authForm[controlName].validation),
        touched: true,
      }),
    })
    setAuthForm(updatedControls)
  }

  const submitHandler = event => {
    event.preventDefault()
    onAuth(authForm.email.value, authForm.password.value, isSignup)
  }

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup)
  }

  const formElementsArray = []
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key],
    })
  }

  let form = formElementsArray.map(formElement => (
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
  ))

  if (status.loading) {
    form = <Spinner />
  }

  let errorMessage = null

  if (status.error) {
    errorMessage = <p>{status.error.message}</p>
  }

  let authRedirect = null
  if (status.isAuthenticated) {
    authRedirect = <Redirect to={status.authRedirectPath} />
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">{isSignup ? 'Register' : 'Login'}</Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType="Danger">
        {isSignup ? 'Already registered?' : 'Register here...'}
      </Button>
    </div>
  )
}

export default Auth
