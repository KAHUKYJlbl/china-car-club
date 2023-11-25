import classes from './not-found.module.css';
import { Link } from 'react-router-dom';

export const NotFound = (): JSX.Element => (
  <Link to="/">
    <div className={classes.container404}>
      <figure className={classes.figure404}>
        <figcaption className={classes.figcaption404}>
          <span className={classes.e}></span>
          <span className={classes.r}></span>
          <span className={classes.r}></span>
          <span className={classes.o}></span>
          <span className={classes.r}></span>
          <span className={classes['_4']}></span>
          <span className={classes['_0']}></span>
          <span className={classes['_4']}></span>
          <span className={classes.n}></span>
          <span className={classes.o}></span>
          <span className={classes.t}></span>
          <span className={classes.f}></span>
          <span className={classes.o}></span>
          <span className={classes.u}></span>
          <span className={classes.n}></span>
          <span className={classes.d}></span>
        </figcaption>
      </figure>
    </div>
  </Link>
);
