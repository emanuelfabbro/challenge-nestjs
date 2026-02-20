import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User)
        private readonly ormRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.ormRepository.create(createUserDto);
        return this.saveWithSpecificErrors(user);
    }

    async findAll(term?: string): Promise<User[]> {
        if (term) {
            return this.ormRepository.find({
                where: [{ nombre: Like(`%${term}%`) }, { email: Like(`%${term}%`) }],
                relations: ['profile'],
            });
        }
        return this.ormRepository.find({ relations: ['profile'] });
    }

    async findOne(id: string): Promise<User | null> {
        return this.ormRepository.findOne({ where: { id }, relations: ['profile'] });
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.ormRepository.preload({ id, ...updateUserDto });
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return this.saveWithSpecificErrors(user);
    }

    async remove(user: User): Promise<void> {
        await this.ormRepository.remove(user);
    }

    private async saveWithSpecificErrors(user: User): Promise<User> {
        try {
            return await this.ormRepository.save(user);
        } catch (error: any) {
            if (error.code === 'SQLITE_CONSTRAINT' || (error.message && error.message.includes('UNIQUE'))) {
                throw new ConflictException(`El email ${user.email} ya se encuentra registrado.`);
            }
            throw new InternalServerErrorException('Error interno al procesar los datos en la base de datos.');
        }
    }
}