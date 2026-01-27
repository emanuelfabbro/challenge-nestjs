import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombrePerfil: string;

    @Column({ nullable: true })
    codigo: string;
}