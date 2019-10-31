import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Portfolio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  backgroundImg?: string;

  @property({
    type: 'string',
  })
  desc?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  tags?: string[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Portfolio>) {
    super(data);
  }
}

export interface PortfolioRelations {
  // describe navigational properties here
}

export type PortfolioWithRelations = Portfolio & PortfolioRelations;
