import {Entity, model, property} from '@loopback/repository';

@model()
export class Skills extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  logo?: string;

  @property({
    type: 'string',
  })
  desc?: string;


  constructor(data?: Partial<Skills>) {
    super(data);
  }
}

export interface SkillsRelations {
  // describe navigational properties here
}

export type SkillsWithRelations = Skills & SkillsRelations;
