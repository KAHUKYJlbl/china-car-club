import { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet-async';

import { SvgSprite } from '../../../shared/ui/svg-sprite';

import { Header } from './header';

type LayoutProps = {
 title?: string;
};

export const Layout = ({ title, children }: PropsWithChildren<LayoutProps>): JSX.Element => {
  return (
    <div>
      <Helmet><title>{title}</title></Helmet>

      <SvgSprite />

      <Header />

      {children}
    </div>
  )
}
