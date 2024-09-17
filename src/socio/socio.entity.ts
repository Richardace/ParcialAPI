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
    id: number;
  
    @Column({ unique: true })
    nombreUsuario: string;
  
    @Column({ unique: true })
    correoElectronico: string;
  
    @Column()
    fechaNacimiento: Date;
  
    @ManyToMany(() => ClubEntity, (club) => club.socios)
    @JoinTable()
    clubs: ClubEntity[];
  }
  