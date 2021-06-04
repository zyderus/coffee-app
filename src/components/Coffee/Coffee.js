import classes from './Coffee.module.css'
import CoffeeIngredient from './CoffeeIngredient/CoffeeIngredient'

const Coffee = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <CoffeeIngredient key={igKey + i} type={igKey} />
      })
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, [])
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }
  return (
    <div className={classes.Coffee}>
      <CoffeeIngredient type="cup" />
      {transformedIngredients}
    </div>
  )
}

export default Coffee
