import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Size', type: 'size' },
  { label: 'Coffee', type: 'coffee' },
  { label: 'Milk', type: 'milk' },
  { label: 'Sugar', type: 'sugar' },
]

const BuildControls = props => (
  <div className={classes.BuildControls}>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <p>
      <strong>
        price: <span style={{ color: 'darkgreen' }}>${props.price.toFixed(2)}</span>
      </strong>
    </p>
    <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>
      {props.isAuth ? 'Order Now' : 'Go to Basket'}
    </button>
  </div>
)

export default BuildControls
