import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { SocioEntity } from '../socio/socio.entity';
import { ClubEntity } from '../club/club.entity';
import { ClubService } from './club.service';

@Controller('clubs/:idClub/members')
export class ClubSocioController {
  constructor(private readonly clubService: ClubService) {}

  @Post(':idSocio')
  async addMemberToClub(@Param('idClub') idClub: string, @Param('idSocio') idSocio: string): Promise<void> {
    return await this.clubService.addMemberToClub(idClub, idSocio);
  }

  @Get()
  async findMembersFromClub(@Param('idClub') idClub: string): Promise<SocioEntity[]> {
    return await this.clubService.findMembersFromClub(idClub);
  }

  @Get(':idSocio')
  async findMemberFromClub(@Param('idClub') idClub: string, @Param('idSocio') idSocio: string): Promise<SocioEntity> {
    return await this.clubService.findMemberFromClub(idClub, idSocio);
  }

  @Put()
  async updateMembersFromClub(@Param('idClub') idClub: string, @Body() newSocios: string[]): Promise<ClubEntity> {
    return await this.clubService.updateMembersFromClub(idClub, newSocios);
  }

  @Delete(':idSocio')
  async deleteMemberFromClub(@Param('idClub') idClub: string, @Param('idSocio') idSocio: string): Promise<void> {
    return await this.clubService.deleteMemberFromClub(idClub, idSocio);
  }
}
