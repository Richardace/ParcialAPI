import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany
  } from 'typeorm';
  import { SocioEntity } from '../socio/socio.entity';
  
  @Entity()
  export class ClubEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;
  
    @Column()
    fechaFundacion: Date;
  
    @Column({ length: 100 })
    descripcion: string;
  
    @Column({ nullable: true })
    imagen: string;
  
    @ManyToMany(() => SocioEntity, (socio) => socio.clubs)
    socios: SocioEntity[];
  }
  