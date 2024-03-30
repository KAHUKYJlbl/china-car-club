import { PropsWithChildren } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Helmet } from 'react-helmet-async';

import { SvgSprite } from '../../../shared/ui/svg-sprite';

import { Header } from './header';
import classes from './layout.module.sass';

type LayoutProps = {
 title?: string;
};

export const Layout = ({ title, children }: PropsWithChildren<LayoutProps>): JSX.Element => {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  return (
    <div className={classes.wrapper}>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <SvgSprite />

      <Header />

      <div className={classes.headingWrapper}>
        <h1 className={classes.heading}>
          Новый автомобиль из Китая в Россию {!isMobile && <br/>}по цене завода, {isMobile && <br/>}без посредников
        </h1>

        <p className={classes.subheading}>
          Безопасная растаможка и пожизненная поддержка по запчастям
        </p>
      </div>

      {children}
    </div>
  )
}
