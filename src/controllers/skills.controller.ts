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
import {Skills} from '../models';
import {SkillsRepository} from '../repositories';

export class SkillsController {
  constructor(
    @repository(SkillsRepository)
    public skillsRepository : SkillsRepository,
  ) {}

  @post('/skills', {
    responses: {
      '200': {
        description: 'Skills model instance',
        content: {'application/json': {schema: getModelSchemaRef(Skills)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Skills, {
            title: 'NewSkills',
            exclude: ['id'],
          }),
        },
      },
    })
    skills: Omit<Skills, 'id'>,
  ): Promise<Skills> {
    return this.skillsRepository.create(skills);
  }

  @get('/skills/count', {
    responses: {
      '200': {
        description: 'Skills model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Skills)) where?: Where<Skills>,
  ): Promise<Count> {
    return this.skillsRepository.count(where);
  }

  @get('/skills', {
    responses: {
      '200': {
        description: 'Array of Skills model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Skills)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Skills)) filter?: Filter<Skills>,
  ): Promise<Skills[]> {
    return this.skillsRepository.find(filter);
  }

  @patch('/skills', {
    responses: {
      '200': {
        description: 'Skills PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Skills, {partial: true}),
        },
      },
    })
    skills: Skills,
    @param.query.object('where', getWhereSchemaFor(Skills)) where?: Where<Skills>,
  ): Promise<Count> {
    return this.skillsRepository.updateAll(skills, where);
  }

  @get('/skills/{id}', {
    responses: {
      '200': {
        description: 'Skills model instance',
        content: {'application/json': {schema: getModelSchemaRef(Skills)}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Skills> {
    return this.skillsRepository.findById(id);
  }

  @patch('/skills/{id}', {
    responses: {
      '204': {
        description: 'Skills PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Skills, {partial: true}),
        },
      },
    })
    skills: Skills,
  ): Promise<void> {
    await this.skillsRepository.updateById(id, skills);
  }

  @put('/skills/{id}', {
    responses: {
      '204': {
        description: 'Skills PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() skills: Skills,
  ): Promise<void> {
    await this.skillsRepository.replaceById(id, skills);
  }

  @del('/skills/{id}', {
    responses: {
      '204': {
        description: 'Skills DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.skillsRepository.deleteById(id);
  }
}
