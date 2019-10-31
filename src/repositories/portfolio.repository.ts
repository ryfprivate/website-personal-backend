import {DefaultCrudRepository} from '@loopback/repository';
import {Portfolio, PortfolioRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PortfolioRepository extends DefaultCrudRepository<
  Portfolio,
  typeof Portfolio.prototype.id,
  PortfolioRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Portfolio, dataSource);
  }
}
