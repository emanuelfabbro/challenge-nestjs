import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column({ unique: true })
    email: string;

    @Column()
    edad: number;

    @OneToOne(() => Profile, { cascade: true, eager: true })
    @JoinColumn()
    profile: Profile;
}