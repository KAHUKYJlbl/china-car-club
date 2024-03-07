export enum APIRoute {
  Catalog = '/calc/manufacturers',
  Model = '/calc/series/:id',
  Spec = '',
  SpecImages = '/calc/specification/:id/images',
  Currency = '/exchange-rates',
  AuthHash = '/auth/generate-hash',
  AuthSms = '/auth/init',
  AuthConfirm = '/auth/confirm',
}
