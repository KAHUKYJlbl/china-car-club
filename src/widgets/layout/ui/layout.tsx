import { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet-async';

import { SvgSprite } from '../../../shared/ui/svg-sprite';

import { Header } from './header';
import { NewHeader } from './new-header';
import classes from './layout.module.sass';

type LayoutProps = {
 title?: string;
 newHeader?: boolean;
 heading: {
  heading: string;
  subheading: string | null;
 }
};

export const Layout = ({ title, children, heading, newHeader = false }: PropsWithChildren<LayoutProps>): JSX.Element => {
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

      {
        newHeader
        ? <NewHeader />
        : <Header />
      }

      <div className={classes.headingWrapper}>
        <h1 className={classes.heading}>
          {heading.heading}
        </h1>

        {
          heading.subheading &&
          <p className={classes.subheading}>
            {heading.subheading}
          </p>
        }
      </div>

      {children}
    </div>
  )
}
