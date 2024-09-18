import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { SocioDTO } from './socio.dto';
import { SocioService } from './socio.service';
import { SocioEntity } from './socio.entity';

@Controller('members')
@UseInterceptors(BusinessErrorsInterceptor)
export class SocioController {

    constructor(private readonly socioService: SocioService,
    ) {}

    @Get()
    async findAll() {
      return await this.socioService.findAll();
    }

    @Post()
    async create(@Body()  socioDTO: SocioDTO) {

      const socioEntity: SocioEntity = plainToInstance(SocioEntity, socioDTO);
      return await this.socioService.create(socioEntity);
    }

    @Get(':clubId')
    async findOne(@Param('clubId') clubId: string) {
      return await this.socioService.findOne(clubId);
    }

    @Put(':clubId')
    async update(@Param('clubId') clubId: string, @Body() socioDTO: SocioDTO) {

      const socioEntity: SocioEntity = plainToInstance(SocioEntity, socioDTO);
      return await this.socioService.update(clubId, socioEntity);
    }

    @Delete(':clubId')
    @HttpCode(204)
    async delete(@Param('clubId') clubId: string) {
      return await this.socioService.delete(clubId);
    }

}