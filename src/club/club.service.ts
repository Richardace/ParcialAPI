import { Injectable } from '@nestjs/common';
import { ClubEntity } from './club.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { SocioEntity } from '../socio/socio.entity';



@Injectable()
export class ClubService {

  constructor(
    @InjectRepository(ClubEntity) private readonly clubRepository: Repository<ClubEntity>,
    @InjectRepository(SocioEntity) private readonly socioRepository: Repository<SocioEntity>,
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

    if (!this.isValidDescription(club.descripcion)) {
      throw new BusinessLogicException(
        'La descripción no puede tener más de 100 caracteres',
        BusinessError.PRECONDITION_FAILED,
      );
    }

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

  async addMemberToClub(idClub: string, idSocio: string): Promise<void> {
    const club: ClubEntity = await this.clubRepository.findOne({ where: { id: idClub }, relations: ['socios'] });
  
    if (!club) {
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
  
    const socio: SocioEntity = await this.socioRepository.findOne({ where: { id: idSocio } });
  
    if (!socio) {
      throw new BusinessLogicException(
        'The socio with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
  
    if (club.socios.some(existingSocio => existingSocio.id === socio.id)) {
      throw new BusinessLogicException(
        'The socio is already a member of the club',
        BusinessError.PRECONDITION_FAILED,
      );
    }
  
    club.socios.push(socio);
      await this.clubRepository.save(club);
  }

  async findMembersFromClub(idClub: string): Promise<SocioEntity[]> {
    const club: ClubEntity = await this.clubRepository.findOne({ where: { id: idClub }, relations: ['socios'] });
  
    if (!club) {
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
    return club.socios;
  }

  async findMemberFromClub(idClub: string, idSocio: string): Promise<SocioEntity> {
    const club: ClubEntity = await this.clubRepository.findOne({
      where: { id: idClub },
      relations: ['socios'],
    });
  
    if (!club) {
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
  
    const socio = club.socios.find(s => s.id == idSocio);
  
    if (!socio) {
      throw new BusinessLogicException(
        'The socio with the given id is not a member of the club',
        BusinessError.NOT_FOUND,
      );
    }
  
    return socio;
  }
  

  async updateMembersFromClub(idClub: string, newSocios: string[]): Promise<ClubEntity> {
    const club: ClubEntity = await this.clubRepository.findOne({ where: { id: idClub }, relations: ['socios'] });
  
    if (!club) {
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
  
    const socios = await this.socioRepository.findByIds(newSocios);
  
    if (socios.length !== newSocios.length) {
      throw new BusinessLogicException(
        'Some socios were not found',
        BusinessError.NOT_FOUND,
      );
    }
  
    club.socios = socios;
    return await this.clubRepository.save(club);
  }

  async deleteMemberFromClub(idClub: string, idSocio: string): Promise<void> {
    const club: ClubEntity = await this.clubRepository.findOne({ where: { id: idClub }, relations: ['socios'] });
  
    if (!club) {
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    }
  
    const socioIndex = club.socios.findIndex(s => s.id == idSocio);
  
    if (socioIndex === -1) {
      throw new BusinessLogicException(
        'The socio with the given id is not a member of the club',
        BusinessError.NOT_FOUND,
      );
    }
  
    club.socios.splice(socioIndex, 1);
    await this.clubRepository.save(club);
  }
  
  private isValidDescription(description: string): boolean {
    return description.length <= 100;
  }
  
}
