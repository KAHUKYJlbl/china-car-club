import { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet-async';

import { SvgSprite } from '../../../shared/ui/svg-sprite';

import { NewHeader } from './new-header';
import classes from './layout.module.sass';

type LayoutProps = {
 title?: string;
};

export const Layout = ({ title, children }: PropsWithChildren<LayoutProps>): JSX.Element => {
  return (
    <div className={classes.wrapper} id='layout'>
      <Helmet>
        <title>{title || 'Купить новый автомобиль из Китая под ключ по цене завода'}</title>
        <meta
          name='description'
          content='Заказать новый авто из Китая по выгодной цене. Быстрый онлайн расчёт под ключ. По цене завода и с пожизненной поддержкой запчастями.'
        />
      </Helmet>

      <SvgSprite />

      <NewHeader />

      <div className={classes.headingWrapper}>
        <h1 className={classes.heading}>
          Новые автомобили из Китая
        </h1>

        <p className={classes.subheading}>
          По цене завода и с поддержкой запчастями
        </p>
      </div>

      {children}
    </div>
  )
}
