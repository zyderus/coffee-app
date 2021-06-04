import { useState } from 'react'
import { useSelector } from 'react-redux'

import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const Layout = props => {
  const isAuthenticated = useSelector(state => state.auth.token !== null)
  console.log(isAuthenticated)

  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false)

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false)
  }

  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible)
  }

  return (
    <>
      <Toolbar isAuth={isAuthenticated} drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer isAuth={isAuthenticated} open={sideDrawerIsVisible} closed={sideDrawerClosedHandler} />
      <main className={classes.Content}>{props.children}</main>
    </>
  )
}

export default Layout
