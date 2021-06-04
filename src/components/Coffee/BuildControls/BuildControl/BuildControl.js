import classes from './BuildControl.module.css'

const BuildControl = props => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button className={classes.Less} onClick={props.removed} disabled={props.disabled}>
      remove
    </button>
    <button className={classes.More} onClick={props.added}>
      add
    </button>
  </div>
)

export default BuildControl
