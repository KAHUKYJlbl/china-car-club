export enum APIRoute {
  Catalog = '/',
  Models = '?manufacturerId=:mId',
  Specifications = '?manufacturerId=:mId&seriesId=:sId',
}
