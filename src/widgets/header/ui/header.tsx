import classes from './header.module.sass';

export const Header = (): JSX.Element => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.header}>
        Новый автомобиль из Китая в Россию<br/>по цене завода, без посредников
      </h1>

      <p className={classes.subheader}>
        Безопасная растаможка и пожизненная поддержка по запчастям
      </p>
    </div>
  )
}
