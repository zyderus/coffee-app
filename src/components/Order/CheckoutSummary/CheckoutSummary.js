import classes from './CheckoutSummary.module.css'
import Coffee from '../../Coffee/Coffee'
import Button from '../../UI/Button/Button'

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Your coffee</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Coffee ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  )
}

export default CheckoutSummary
