export enum APIRoute {
  Catalog = '/',
  Filters = '?',
  Models = '?manufacturerId=:mId',
  Specifications = '?manufacturerId=:mId&seriesId=:sId',
}
