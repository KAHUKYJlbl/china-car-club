import classes from './calculator.module.sass';

export const Calculator = (): JSX.Element => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.model}>
        Model
      </div>

      <div className={classes.price}>
        Price
      </div>

      <div className={classes.currency}>
        Currency
      </div>

      <div className={classes.delivery}>
        Delivery
      </div>

      <div className={classes.filter}>
        Filter
      </div>

      <div className={classes.gallery}>
        Gallery
      </div>
    </div>
  )
}
