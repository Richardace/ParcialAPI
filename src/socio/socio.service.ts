import { Injectable } from '@nestjs/common';
import { SocioEntity } from './socio.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SocioService {
  constructor(
    @InjectRepository(SocioEntity)
    private readonly socioRepository: Repository<SocioEntity>,
  ) {}

  async findAll(): Promise<SocioEntity[]> {
    return await this.socioRepository.find();
  }

  async findOne(id: string): Promise<SocioEntity> {
    const socio: SocioEntity =
      await this.socioRepository.findOne({
        where: { id },
      });
    if (!socio) {
      throw new BusinessLogicException(
        'The socio with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    return socio;
  }

  async create(socio: SocioEntity): Promise<SocioEntity> {
    return await this.socioRepository.save(socio);
  }

  async update(
    id: string,
    socio: SocioEntity,
  ): Promise<SocioEntity> {
  
    const persistedSocio: SocioEntity =
      await this.socioRepository.findOne({ where: { id } });
    
    if (!persistedSocio) {
      throw new BusinessLogicException(
        'The socio with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
  
    this.socioRepository.merge(persistedSocio, socio)
    return await this.socioRepository.save(persistedSocio);
  }
  

  async delete(id: string): Promise<void> {
    const socio: SocioEntity =
      await this.socioRepository.findOne({ where: { id } });
    if (!socio) {
      throw new BusinessLogicException(
        'The socio with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    await this.socioRepository.remove(socio);
  }
}
