import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from './model/entity/user.entity';
import { CreateUserDto } from './model/dto/create-user.dto';
import { UpdateUserDto } from './model/dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        });

        if (existingUser) {
            throw new BadRequestException('El correo electrónico ya está registrado.');
        }

        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
    }

    async findAll(term?: string): Promise<User[]> {
        if (term) {
            return await this.userRepository.find({
                where: [
                    { nombre: Like(`%${term}%`) },
                    { email: Like(`%${term}%`) },
                ],
                relations: ['profile'],
            });
        }

        return await this.userRepository.find({
            relations: ['profile'],
        });
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['profile'],
        });

        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.preload({
            id: id,
            ...updateUserDto,
        });

        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }

        try {
            return await this.userRepository.save(user);
        } catch (error) {
            throw new BadRequestException('Error al actualizar: Verifique los datos');
        }
    }

    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
    }
}