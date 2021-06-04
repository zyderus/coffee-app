import classes from './CoffeeIngredient.module.css'

const CoffeeIngredient = props => {
  let ingredient = null

  switch (props.type) {
    case 'cup':
      ingredient = <div className={classes.Cup}></div>
      break
    case 'size':
      ingredient = <div className={classes.Size} />
      break
    case 'coffee':
      ingredient = <div className={classes.Coffee} />
      break
    case 'milk':
      ingredient = <div className={classes.Milk} />
      break
    case 'sugar':
      ingredient = <div className={classes.Sugar} />
      break
    default:
      ingredient = null
  }

  return ingredient
}

export default CoffeeIngredient
