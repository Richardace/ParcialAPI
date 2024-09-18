import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubService } from './club.service';
import { ClubEntity } from './club.entity';
import { ClubController } from './club.controller';
import { SocioEntity } from 'src/socio/socio.entity';
import { ClubSocioController } from './club_socio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClubEntity]), TypeOrmModule.forFeature([SocioEntity])],
  providers: [ClubService],
  controllers: [ClubController, ClubSocioController]
})
export class ClubModule {}
