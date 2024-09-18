import { Injectable } from '@nestjs/common';
import { ClubEntity } from './club.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';



@Injectable()
export class ClubService {

  constructor(
    @InjectRepository(ClubEntity)
    private readonly clubRepository: Repository<ClubEntity>,
  ) {}

  async findAll(): Promise<ClubEntity[]> {
    return await this.clubRepository.find();
  }

  async findOne(id: string): Promise<ClubEntity> {
    const club: ClubEntity =
      await this.clubRepository.findOne({
        where: { id },
      });
    if (!club) {
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    return club;
  }

  async create(club: ClubEntity): Promise<ClubEntity> {
    return await this.clubRepository.save(club);
  }

  async update(
    id: string,
    club: ClubEntity,
  ): Promise<ClubEntity> {
  
    const logger = new Logger('ClubService'); 
    
    const persistedClub: ClubEntity =
      await this.clubRepository.findOne({ where: { id } });
    
    if (!persistedClub) {
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    this.clubRepository.merge(persistedClub, club);
  
    logger.log(persistedClub.id);
    logger.log(persistedClub.descripcion);
    logger.log(persistedClub.fechaFundacion);
    logger.log(persistedClub.imagen);
    logger.log(persistedClub.nombre);
    return await this.clubRepository.save(persistedClub);
  }
  

  async delete(id: string): Promise<void> {
    const club: ClubEntity =
      await this.clubRepository.findOne({ where: { id } });
    if (!club) {
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    await this.clubRepository.remove(club);
  }
}
