import {DefaultCrudRepository} from '@loopback/repository';
import {Skills, SkillsRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SkillsRepository extends DefaultCrudRepository<
  Skills,
  typeof Skills.prototype.id,
  SkillsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Skills, dataSource);
  }
}
