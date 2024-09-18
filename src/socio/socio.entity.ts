import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable
  } from 'typeorm';
  import { ClubEntity } from '../club/club.entity';
  
  @Entity()
  export class SocioEntity {
    @PrimaryGeneratedColumn()
    id: string;
  
    @Column()
    nombreUsuario: string;
  
    @Column()
    correoElectronico: string;
  
    @Column()
    fechaNacimiento: Date;
  
    @ManyToMany(() => ClubEntity, (club) => club.socios)
    @JoinTable()
    clubs: ClubEntity[];
  }
  