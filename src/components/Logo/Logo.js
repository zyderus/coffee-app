import classes from './Logo.module.css'
import coffeeLogo from '../../assets/images/coffee-logo2.svg'

const Logo = props => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={coffeeLogo} alt="MyCoffee" />
  </div>
)

export default Logo
