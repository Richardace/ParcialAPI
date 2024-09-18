import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { ClubService } from './club.service';
import { ClubEntity } from './club.entity';
import { ClubDTO } from './club.dto';

@Controller('clubs')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClubController {

    constructor(private readonly clubService: ClubService,
    ) {}

    @Get()
    async findAll() {
      return await this.clubService.findAll();
    }

    @Post()
    async create(@Body()  clubDTO: ClubDTO) {

      const clubEntity: ClubEntity = plainToInstance(ClubEntity, clubDTO);
      return await this.clubService.create(clubEntity);
    }

    @Get(':clubId')
    async findOne(@Param('clubId') clubId: string) {
      return await this.clubService.findOne(clubId);
    }

    @Put(':clubId')
    async update(@Param('clubId') clubId: string, @Body() clubDTO: ClubDTO) {

      const clubEntity: ClubEntity = plainToInstance(ClubEntity, clubDTO);
      return await this.clubService.update(clubId, clubEntity);
    }

    @Delete(':clubId')
    @HttpCode(204)
    async delete(@Param('clubId') clubId: string) {
      return await this.clubService.delete(clubId);
    }

}