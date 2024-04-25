export enum APIRoute {
  Spec = '',
  Catalog = '/calc/manufacturers',
  Model = '/calc/series/:id',
  SpecImages = '/calc/specification/:id/images',
  PromoGallery = '/calc/specification/promotional',
  Currency = '/exchange-rates',
  AuthHash = '/auth/generate-hash',
  AuthSms = '/auth/init',
  AuthConfirm = '/auth/confirm',
  AuthRefresh = '/auth/refresh',
  PostStatistics = '/statistics/car-calculation',
  PostOrder = '/statistics/car-order',
}
