import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Portfolio} from '../models';
import {PortfolioRepository} from '../repositories';

export class PortfolioController {
  constructor(
    @repository(PortfolioRepository)
    public portfolioRepository : PortfolioRepository,
  ) {}

  @post('/portfolio', {
    responses: {
      '200': {
        description: 'Portfolio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Portfolio)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Portfolio, {
            title: 'NewPortfolio',
            exclude: ['id'],
          }),
        },
      },
    })
    portfolio: Omit<Portfolio, 'id'>,
  ): Promise<Portfolio> {
    return this.portfolioRepository.create(portfolio);
  }

  @get('/portfolio/count', {
    responses: {
      '200': {
        description: 'Portfolio model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Portfolio)) where?: Where<Portfolio>,
  ): Promise<Count> {
    return this.portfolioRepository.count(where);
  }

  @get('/portfolio', {
    responses: {
      '200': {
        description: 'Array of Portfolio model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Portfolio)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Portfolio)) filter?: Filter<Portfolio>,
  ): Promise<Portfolio[]> {
    return this.portfolioRepository.find(filter);
  }

  @patch('/portfolio', {
    responses: {
      '200': {
        description: 'Portfolio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Portfolio, {partial: true}),
        },
      },
    })
    portfolio: Portfolio,
    @param.query.object('where', getWhereSchemaFor(Portfolio)) where?: Where<Portfolio>,
  ): Promise<Count> {
    return this.portfolioRepository.updateAll(portfolio, where);
  }

  @get('/portfolio/{id}', {
    responses: {
      '200': {
        description: 'Portfolio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Portfolio)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Portfolio> {
    return this.portfolioRepository.findById(id);
  }

  @patch('/portfolio/{id}', {
    responses: {
      '204': {
        description: 'Portfolio PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Portfolio, {partial: true}),
        },
      },
    })
    portfolio: Portfolio,
  ): Promise<void> {
    await this.portfolioRepository.updateById(id, portfolio);
  }

  @put('/portfolio/{id}', {
    responses: {
      '204': {
        description: 'Portfolio PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() portfolio: Portfolio,
  ): Promise<void> {
    await this.portfolioRepository.replaceById(id, portfolio);
  }

  @del('/portfolio/{id}', {
    responses: {
      '204': {
        description: 'Portfolio DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.portfolioRepository.deleteById(id);
  }
}
